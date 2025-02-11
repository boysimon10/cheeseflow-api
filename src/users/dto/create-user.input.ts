import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

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
}