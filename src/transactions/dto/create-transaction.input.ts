import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType } from 'src/enums/transaction-type.enum';

@InputType()
export class CreateTransactionInput {
    @Field(() => Float)
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    amount: number;

    @Field({ nullable: true })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date?: Date;

    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;

    @Field(() => TransactionType)
    @IsNotEmpty()
    @IsEnum(TransactionType)
    type: TransactionType;

    @Field(() => Int)
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    categoryId: number;
}
