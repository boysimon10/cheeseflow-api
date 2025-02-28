import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class CategoryExpense {
    @Field()
    categoryId: number;

    @Field()
    categoryName: string;

    @Field(() => Float)
    amount: number;
}

@ObjectType()
export class MonthlyData {
    @Field()
    month: string;

    @Field(() => Float)
    expenses: number;

    @Field(() => Float)
    incomes: number;

    @Field(() => Float)
    balance: number;
}