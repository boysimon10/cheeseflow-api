import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Category)
@UseGuards(JwtAuthGuard)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query(() => [Category])
    categories(@CurrentUser() user: any) {
        return this.categoriesService.findAll(user.userId);
    }

    @Query(() => Category)
    async category(@Args('id') id: number, @CurrentUser() user: any) {
        const category = await this.categoriesService.findOne(id);
        if (category.userId !== user.userId) {
            throw new Error('Not authorized to access this category');
        }
        return category;
    }

    @Mutation(() => Category)
    createCategory(
        @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
        @CurrentUser() user: any,
    ) {
        return this.categoriesService.create({
            ...createCategoryInput,
            userId: user.userId,
        });
    }

    @Mutation(() => Category)
    async updateCategory(
        @Args('id') id: number,
        @Args('updateCategoryInput') updateCategoryInput: CreateCategoryInput,
        @CurrentUser() user: any,
    ) {
        const category = await this.categoriesService.findOne(id);
        if (!category) {
            throw new Error('Category not found');
        }

        if (category.userId!== user.userId) {
            throw new Error('Not authorized to update this category');
        }

        return this.categoriesService.update(id, updateCategoryInput);
    }

    @Mutation(() => Category)
    async removeCategory(@Args('id') id: number, @CurrentUser() user: any) {
        const category = await this.categoriesService.findOne(id);
        if (!category) {
            throw new Error('Category not found');
        }

        if (category.userId!== user.userId) {
            throw new Error('Not authorized to delete this category');
        }

        return this.categoriesService.remove(id);
    }
}