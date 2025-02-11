import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserInput: CreateUserInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
        const user = this.usersRepository.create({
            ...createUserInput,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneOrFail({ where: { id } });
    }

    findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ 
            where: { email },
            select: ['id', 'email', 'password'] // Important pour login
        });
    }
}