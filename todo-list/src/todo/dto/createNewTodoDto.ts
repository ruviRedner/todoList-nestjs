import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy milk', description: 'The title of the task' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
