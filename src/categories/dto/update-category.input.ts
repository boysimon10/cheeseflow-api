import { InputType, Field } from '@nestjs/graphql';
import { IsOptional ,IsString, IsEnum, IsHexColor, IsNotEmpty, Length } from 'class-validator';
import { TransactionType } from 'src/enums/transaction-type.enum';

@InputType()
export class UpdateCategoryInput {
  @Field()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @Field(() => TransactionType)
  @IsOptional()
  @IsEnum(TransactionType)
  type: TransactionType;

  @Field()
  @IsOptional()
  @IsString()
  @Length(1, 8)
  emoji: string;
}