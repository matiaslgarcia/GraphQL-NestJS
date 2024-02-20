import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.inputs';
import { UpdateTodoInput } from './dto/inputs/update-todo.inputs';
import { StatusArgs } from './dto/args/status.args';
import { Args } from '@nestjs/graphql';

@Injectable()
export class TodoService {


    private todos: Todo[] = [
        {
            id: 1,
            description: 'Piedra del Alma',
            done: false
        },
        {
            id: 2,
            description: 'Piedra del Espacio',
            done: false
        },
        {
            id: 3,
            description: 'Piedra del Poder',
            done: true
        },
        {
            id: 4,
            description: 'Piedra del Tiempo',
            done: true
        }
    ]

    get totalTodos(){
        return this.todos.length
    }

    get completedTodos(){
        const complete = this.todos.filter( todo => todo.done === true).length
        return complete
    }

    get pendingTodos(){
        const pending = this.todos.filter( todo => todo.done === false).length
        return pending
    }

    findAll({ status }: StatusArgs): Todo[] {

        if (status !== undefined) return this.todos.filter(todo => todo.done === status)
        return this.todos
    }

    findOne(id: number): Todo {

        const todo = this.todos.find(todo => todo.id === id)
        if (!todo) throw new NotFoundException(`Todo with id ${id} not found`)

        return todo
    }

    createTodo(createTodoInput: CreateTodoInput): Todo {

        const todo = new Todo()
        todo.description = createTodoInput.description
        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1


        this.todos.push(todo)

        return todo;



    }

    updateTodo({ id, description, done }: UpdateTodoInput): Todo {


        const todoUpdate = this.findOne(id);

        if (description) todoUpdate.description = description
        if (done !== undefined) todoUpdate.done = done;

        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return todoUpdate
            }

            return todo
        })

        return todoUpdate
    }



    deleteTodo(id: number): Boolean {
        const todo = this.findOne(id)
        this.todos = this.todos.filter(todo => todo.id !== id)
        return true
    }
}
