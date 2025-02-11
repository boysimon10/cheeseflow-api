import { registerEnumType } from '@nestjs/graphql';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
});