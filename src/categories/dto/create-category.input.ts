import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEnum, IsHexColor, IsNotEmpty, Length } from 'class-validator';
import { TransactionType } from 'src/enums/transaction-type.enum';

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => TransactionType)
  @IsEnum(TransactionType)
  type: TransactionType;

  @Field()
  @IsString()
  @Length(1, 8)
  emoji: string;
}