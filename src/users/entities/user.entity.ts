import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('users')
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;  
    
    @Field()
    @Column({ length: 100 }) 
    name: string;
    
    @Field()
    @Column({ unique: true, length: 255 })
    email: string;
    
    @Field({ nullable: true }) 
    @Column({ nullable: true, length: 20 })
    phone: string;
    
    @Column({select: false, length: 255 })
    password: string;
    
    @Field()
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Field()
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    // Ajouter les relations
    // @OneToMany(() => Transaction, transaction => transaction.user)
    // transactions: Transaction[];

    // @OneToMany(() => Category, category => category.user)
    // categories: Category[];
}