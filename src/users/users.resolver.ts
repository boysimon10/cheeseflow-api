import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.type';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.usersService.create(createUserInput);
    }

/*     @Query(() => [User], { name: 'users' })
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.usersService.findAll();
    } */

/*     @Query(() => User, { name: 'user' })
    @UseGuards(JwtAuthGuard)
    findOne(@Args('id') id: number) {
        return this.usersService.findOne(id);
    } */

    @Query(() => User, { name: 'profile' })
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user: JwtUser) {
        return this.usersService.findOne(user.userId);
    }
}