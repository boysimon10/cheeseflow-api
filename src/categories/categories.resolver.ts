import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Category)
@UseGuards(JwtAuthGuard)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query(() => [Category])
    
        categories(@Args('userId') userId: number) {
        return this.categoriesService.findAll(userId);
    }

    @Query(() => Category)
        category(@Args('id') id: number) {
        return this.categoriesService.findOne(id);
    }

    @Mutation(() => Category)
    createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @Args('userId') userId: number,
    ) {
        return this.categoriesService.create({
            ...createCategoryInput,
        userId,
        });
    }
}