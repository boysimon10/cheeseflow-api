import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) {}
    
    findAll(userId: number): Promise<Transaction[]> {
        return this.transactionRepository.find({
            where: { userId },
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
}