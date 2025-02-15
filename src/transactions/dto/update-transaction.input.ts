import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType } from 'src/enums/transaction-type.enum';

@InputType()
export class UpdateTransactionInput {
    @Field(() => Float, { nullable: true })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    amount?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Field(() => TransactionType, { nullable: true })
    @IsOptional()
    @IsEnum(TransactionType)
    type?: TransactionType;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    categoryId?: number;
}
