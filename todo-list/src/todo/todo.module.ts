import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {TodoSchema,Todo } from '../schemas/todoScema';
import { TodoController } from './todo.controller';
import { TodoService } from '../todo/todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
