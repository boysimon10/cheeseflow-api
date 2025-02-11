import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    findAll(userId: number): Promise<Category[]> {
        return this.categoryRepository.find({
        where: { userId },
    });
    }

    findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOneOrFail({ where: { id } });
    }

    create(data: Partial<Category>): Promise<Category> {
        const category = this.categoryRepository.create(data);
        return this.categoryRepository.save(category);
    }
}