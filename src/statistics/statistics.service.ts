import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Category } from '../categories/entities/category.entity';
import { TransactionType } from '../enums/transaction-type.enum';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async getMonthlyExpenses(userId: number): Promise<number> {
        const result = await this.transactionRepository
            .createQueryBuilder('transaction')
            .where('transaction.userId = :userId', { userId })
            .andWhere('transaction.type = :type', { type: TransactionType.EXPENSE })
            .andWhere('EXTRACT(MONTH FROM transaction.date) = EXTRACT(MONTH FROM CURRENT_DATE)')
            .andWhere('EXTRACT(YEAR FROM transaction.date) = EXTRACT(YEAR FROM CURRENT_DATE)')
            .select('COALESCE(SUM(transaction.amount), 0)', 'total')
            .getRawOne();

        return result.total || 0;
    }

    async getMonthlyIncomes(userId: number): Promise<number> {
        const result = await this.transactionRepository
            .createQueryBuilder('transaction')
            .where('transaction.userId = :userId', { userId })
            .andWhere('transaction.type = :type', { type: TransactionType.INCOME })
            .andWhere('EXTRACT(MONTH FROM transaction.date) = EXTRACT(MONTH FROM CURRENT_DATE)')
            .andWhere('EXTRACT(YEAR FROM transaction.date) = EXTRACT(YEAR FROM CURRENT_DATE)')
            .select('COALESCE(SUM(transaction.amount), 0)', 'total')
            .getRawOne();

        return result.total || 0;
    }

    async getBalance(userId: number): Promise<number> {
        const result = await this.transactionRepository
            .createQueryBuilder('transaction')
            .where('transaction.userId = :userId', { userId })
            .select(`
                COALESCE(SUM(CASE 
                    WHEN transaction.type = '${TransactionType.INCOME}' THEN transaction.amount 
                    ELSE -transaction.amount 
                END), 0)`, 'balance')
            .getRawOne();

        return result.balance || 0;
    }

    async getExpensesByCategory(userId: number) {
        return this.transactionRepository
            .createQueryBuilder('transaction')
            .innerJoinAndSelect('transaction.category', 'category')
            .where('transaction.userId = :userId', { userId })
            .andWhere('transaction.type = :type', { type: TransactionType.EXPENSE })
            .andWhere('EXTRACT(MONTH FROM transaction.date) = EXTRACT(MONTH FROM CURRENT_DATE)')
            .andWhere('EXTRACT(YEAR FROM transaction.date) = EXTRACT(YEAR FROM CURRENT_DATE)')
            .select([
                'CAST(category.id AS INTEGER) as "categoryId"',
                'category.name as "categoryName"',
                'COALESCE(SUM(transaction.amount), 0) as "amount"'
            ])
            .groupBy('category.id')
            .addGroupBy('category.name')
            .getRawMany();
    }

    async getMonthlyHistory(userId: number) {
        return this.transactionRepository
            .createQueryBuilder('transaction')
            .where('transaction.userId = :userId', { userId })
            .andWhere('transaction.date >= CURRENT_DATE - INTERVAL \'12 months\'')
            .select([
                'TO_CHAR(transaction.date, \'YYYY-MM\') as month',
                `COALESCE(SUM(CASE WHEN transaction.type = '${TransactionType.EXPENSE}' THEN transaction.amount ELSE 0 END), 0) as expenses`,
                `COALESCE(SUM(CASE WHEN transaction.type = '${TransactionType.INCOME}' THEN transaction.amount ELSE 0 END), 0) as incomes`,
                `COALESCE(SUM(CASE 
                    WHEN transaction.type = '${TransactionType.INCOME}' THEN transaction.amount 
                    ELSE -transaction.amount 
                END), 0) as balance`
            ])
            .groupBy('month')
            .orderBy('month', 'DESC')
            .getRawMany();
    }

    async getCurrentMonthHistory(userId: number) {
        const result = await this.transactionRepository
            .createQueryBuilder('transaction')
            .where('transaction.userId = :userId', { userId })
            .andWhere('EXTRACT(MONTH FROM transaction.date) = EXTRACT(MONTH FROM CURRENT_DATE)')
            .andWhere('EXTRACT(YEAR FROM transaction.date) = EXTRACT(YEAR FROM CURRENT_DATE)')
            .select([
                'TO_CHAR(CURRENT_DATE, \'YYYY-MM\') as month',
                `COALESCE(SUM(CASE WHEN transaction.type = '${TransactionType.EXPENSE}' THEN transaction.amount ELSE 0 END), 0) as expenses`,
                `COALESCE(SUM(CASE WHEN transaction.type = '${TransactionType.INCOME}' THEN transaction.amount ELSE 0 END), 0) as incomes`,
                `COALESCE(SUM(CASE
                    WHEN transaction.type = '${TransactionType.INCOME}' THEN transaction.amount
                    ELSE -transaction.amount
                END), 0) as balance`
            ])
            .getRawOne();

        if (!result) {
            const currentDate = new Date();
            const month = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
            return {
                month,
                expenses: 0,
                incomes: 0,
                balance: 0
            };
        }
        
        return result;
    }
}