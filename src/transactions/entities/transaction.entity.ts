import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { TransactionType } from 'src/enums/transaction-type.enum';

@ObjectType()
@Entity('transactions')
export class Transaction {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Float)
    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Field()
    @CreateDateColumn()
    date: Date;

    @Field()
    @Column({ length: 255 })
    description: string;

    @Field(() => TransactionType)
    @Column({
        type: 'enum',
        enum: TransactionType
    })
    type: TransactionType;

    @Field()
    @Column()
    categoryId: number;

    @Field()
    @Column()
    userId: number;

    @Field()
    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Field()
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.transactions)
    category: Category;

    @ManyToOne(() => User, user => user.transactions)
    user: User;
}