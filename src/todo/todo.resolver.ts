import { Query, Resolver, Int, Args, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.inputs';
import { UpdateTodoInput } from './dto/inputs/update-todo.inputs';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregation.types';

@Resolver(() => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ) { }


    @Query(() => [Todo], { name: 'todos' })
    findAll(
        @Args() status: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(status)
    }

    @Query(() => Todo, { name: 'todo' })
    findOne(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.findOne(id)
    }


    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ) {
        return this.todoService.createTodo(createTodoInput)
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) {
        return this.todoService.updateTodo(updateTodoInput)
    }

    @Mutation(() => Boolean, { name: 'removeTodo' })
    removeTodo(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.deleteTodo(id)
    }



    //Aggregations
    @Query(() => Int, { name: 'totalTodos' })
    totalTodos(): number {
        return this.todoService.totalTodos
    }

    @Query(() => Int, { name: 'completedTodos' })
    completedTodos(): number {
        return this.todoService.completedTodos
    }

    @Query(() => Int, { name: 'pendingTodos' })
    pendingTodos(): number {
        return this.todoService.pendingTodos
    }

    @Query(() => AggregationsType)
    aggregations(): AggregationsType {
        return {
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.totalTodos,
        }
    }
}
