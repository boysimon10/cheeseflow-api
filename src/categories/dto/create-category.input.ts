import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEnum, IsHexColor, IsNotEmpty } from 'class-validator';
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
  @IsHexColor()
  color: string;
}