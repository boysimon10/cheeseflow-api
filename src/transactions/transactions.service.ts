import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionType } from '../enums/transaction-type.enum';

export interface TransactionFilterOptions {
    startDate?: Date;
    endDate?: Date;
    categoryId?: number;
    type?: TransactionType;
    limit?: number;
    offset?: number;
}

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) {}
    
    findAll(userId: number, filters?: TransactionFilterOptions): Promise<Transaction[]> {
        const where: FindOptionsWhere<Transaction> = { userId };
        
        // Appliquer les filtres si fournis
        if (filters) {
            // Filtre par date
            if (filters.startDate && filters.endDate) {
                where.date = Between(filters.startDate, filters.endDate);
            } else if (filters.startDate) {
                where.date = Between(filters.startDate, new Date());
            } else if (filters.endDate) {
                // Utiliser une date ancienne comme début par défaut
                where.date = Between(new Date('1970-01-01'), filters.endDate);
            }
            
            // Filtre par catégorie
            if (filters.categoryId) {
                where.categoryId = filters.categoryId;
            }
            
            // Filtre par type
            if (filters.type) {
                where.type = filters.type;
            }
        }
        
        return this.transactionRepository.find({
            where,
            order: { date: 'DESC' }, // Trier par date décroissante par défaut
            take: filters?.limit,
            skip: filters?.offset
        });
    }

    async findOne(id: number): Promise<Transaction> {
        const transaction = await this.transactionRepository.findOne({ where: { id } });
        if (!transaction) {
            throw new NotFoundException(`Transaction with ID ${id} not found`);
        }
        return transaction;
    }

    async create(data: Partial<Transaction>): Promise<Transaction>{
        const transaction = this.transactionRepository.create(data);
        return this.transactionRepository.save(transaction);
    }

    async update(id: number, data: Partial<Transaction>): Promise<Transaction> {
        const transaction = await this.findOne(id);
        Object.assign(transaction, data);
        return this.transactionRepository.save(transaction);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.transactionRepository.delete(id);
    }
}