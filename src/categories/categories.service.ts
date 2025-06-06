import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
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

    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async create(data: Partial<Category>): Promise<Category> {
        const existingCategory = await this.categoryRepository.findOne({
            where: {
                    name: data.name,
                    userId: data.userId
                    }
            });

            if (existingCategory) {
                throw new ConflictException(`A category with name "${data.name}" already exists for this user`);
            }
        const category = this.categoryRepository.create(data);
        return this.categoryRepository.save(category);
    }

    async update(id: number, data: Partial<Category>): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        this.categoryRepository.merge(category, data);
        return this.categoryRepository.save(category);
    }

    async hasTransactions(id: number): Promise<boolean> {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['transactions']
        });
        
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        
        return category.transactions && category.transactions.length > 0;
    }

    async remove(id: number): Promise<void> {
        const hasTransactions = await this.hasTransactions(id);
        
        if (hasTransactions) {
            throw new BadRequestException('Cannot delete category that has transactions linked to it');
        }
        
        await this.categoryRepository.delete(id);
    }
}