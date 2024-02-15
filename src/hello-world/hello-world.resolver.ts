import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, {
        description: 'Hola Mundo es el return',
        name: 'helloWorld'
    }) //aqui se define que graphql sea string
    helloWorld(): string {
        return 'Hola Mundo'
    }


    @Query(() => Float, {
        name: 'randomNumber'
    })
    getRandomNumber(): number {
        return Math.random() * 100
    }

    @Query(() => Int, {
        name: 'randomFromZeroTo',
        description: 'From 0 to args To'
    })
    getRandomFromZeroTo(
        @Args('to', { 
            type: () => Int, 
            nullable: true 
        }) to: number
    ): number {
        return Math.round(Math.random() * to)
    }
}
