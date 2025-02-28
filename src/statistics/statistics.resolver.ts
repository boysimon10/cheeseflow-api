import { Resolver, Query, Args } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { CategoryExpense, MonthlyData } from './dto/statistics.types';
import { Float } from '@nestjs/graphql';

@Resolver()
@UseGuards(JwtAuthGuard)
export class StatisticsResolver {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Query(() => Float)
    async monthlyExpenses(@CurrentUser() user: any) {
        return this.statisticsService.getMonthlyExpenses(user.userId);
    }

    @Query(() => Float)
    async monthlyIncomes(@CurrentUser() user: any) {
        return this.statisticsService.getMonthlyIncomes(user.userId);
    }

    @Query(() => Float)
    async balance(@CurrentUser() user: any) {
        return this.statisticsService.getBalance(user.userId);
    }

    @Query(() => [CategoryExpense])
    async expensesByCategory(@CurrentUser() user: any) {
        return this.statisticsService.getExpensesByCategory(user.userId);
    }

    @Query(() => [MonthlyData])
    async monthlyHistory(@CurrentUser() user: any) {
        return this.statisticsService.getMonthlyHistory(user.userId);
    }
}