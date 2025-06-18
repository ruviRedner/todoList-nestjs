import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schemas/todoScema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(title: string): Promise<Todo> {
    const newTodo = new this.todoModel({ title, done: false });
    return newTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {

     if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new NotFoundException(`Invalid ID format`);
  }
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.todoModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return { deleted: true };
  }
}
