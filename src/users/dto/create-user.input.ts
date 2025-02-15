import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { CurrencyType } from 'src/enums/currency-type.enum';

@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field({ nullable: true })
    phone?: string;

    @Field()
    @MinLength(6)
    password: string;

    @Field(() => CurrencyType)
    @IsOptional()
    @IsEnum(CurrencyType)
    currency: CurrencyType = CurrencyType.XOF;
}