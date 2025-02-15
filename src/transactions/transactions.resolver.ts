import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/Transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CategoriesService } from '../categories/categories.service';

@Resolver(() => Transaction)
@UseGuards(JwtAuthGuard)
export class TransactionsResolver {
    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly categoriesService: CategoriesService,
    ) {}

    @Query(() => [Transaction])
    transactions(@CurrentUser() user: any) {
        return this.transactionsService.findAll(user.userId);
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
}