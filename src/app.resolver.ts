import { Query, Resolver } from '@nestjs/graphql';

@Resolver('App') 
export class AppResolver {
  @Query(() => String, { name: 'hello' }) 
  hello(): string {
    return 'Hello World!';
  }
}