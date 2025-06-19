import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '../schemas/todoScema';
import { CreateTodoDto } from './dto/createNewTodoDto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  
  @Post()
  create(@Body() newTodo: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(newTodo);
  }

 
  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  
  @Delete(':id')
  delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.todoService.delete(id);
  }
}
