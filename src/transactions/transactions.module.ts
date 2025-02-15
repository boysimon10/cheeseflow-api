import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CategoriesModule],
  providers: [TransactionsService, TransactionsResolver],
  exports: [TransactionsService],
})
export class TransactionsModule {}