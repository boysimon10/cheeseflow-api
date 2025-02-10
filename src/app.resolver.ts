import { Query, Resolver } from '@nestjs/graphql';

@Resolver('App') // Ajoutez un nom ici
export class AppResolver {
  @Query(() => String, { name: 'hello' }) // Ajoutez un name explicite
  hello(): string {
    return 'Hello World!';
  }
}