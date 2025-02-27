import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionsService, TransactionFilterOptions } from './transactions.service';
import { Transaction } from './entities/Transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CategoriesService } from '../categories/categories.service';
import { TransactionFilterInput } from '../transactions/dto/transaction-filter.input';

@Resolver(() => Transaction)
@UseGuards(JwtAuthGuard)
export class TransactionsResolver {
    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly categoriesService: CategoriesService,
    ) {}

    @Query(() => [Transaction])
    transactions(
        @CurrentUser() user: any,
        @Args('filters', { nullable: true }) filters?: TransactionFilterInput
    ) {
        return this.transactionsService.findAll(user.userId, filters);
    }

    @Query(() => Transaction)
    async transaction(@Args('id') id: number, @CurrentUser() user: any) {
        const transaction = await this.transactionsService.findOne(id);
        if (transaction.userId !== user.userId) {
            throw new ForbiddenException('Not authorized to access this transaction');
        }
        return transaction;
    }

    @Mutation(() => Transaction)
    async createTransaction(
        @Args('createTransactionInput') createTransactionInput: CreateTransactionInput,
        @CurrentUser() user: any,
    ) {
        const category = await this.categoriesService.findOne(createTransactionInput.categoryId);
        
        if (!category) {
            throw new Error('Category not found');
        }

        if (category.userId !== user.userId) {
            throw new ForbiddenException('Not authorized to use this category');
        }
        
        return this.transactionsService.create({
            ...createTransactionInput,
            userId: user.userId,
        });
    }

    @Mutation(() => Transaction)
    async updateTransaction(
        @Args('id') id: number,
        @Args('createTransactionInput') createTransactionInput: CreateTransactionInput,
        @CurrentUser() user: any,
    ) {
        const transaction = await this.transactionsService.findOne(id);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        if (transaction.userId!== user.userId) {
            throw new ForbiddenException('Not authorized to update this transaction');
        }

        return this.transactionsService.update(id, createTransactionInput);
    }
    
    @Mutation(() => Transaction)
    async deleteTransaction(@Args('id') id: number, @CurrentUser() user: any) {
        const transaction = await this.transactionsService.findOne(id);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        if (transaction.userId!== user.userId) {
            throw new ForbiddenException('Not authorized to delete this transaction');
        }

        await this.transactionsService.remove(id);
        return transaction;
    }
}