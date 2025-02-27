import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsDate, IsEnum, IsInt } from 'class-validator';
import { TransactionType } from '../../enums/transaction-type.enum';

@InputType()
export class TransactionFilterInput {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  categoryId?: number;

  @Field(() => TransactionType, { nullable: true })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;
}