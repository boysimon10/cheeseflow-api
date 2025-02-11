import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from '../users/dto/login-user.input';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => LoginResponse)
    async login(@Args('loginInput') loginInput: LoginUserInput) {
        const user = await this.authService.validateUser(
            loginInput.email,
            loginInput.password,
    );

    if (!user) {
        throw new UnauthorizedException();
    }

        return this.authService.login(user);
    }
}