import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Todo {
    @Prop()
    title:string;

    @Prop()
    done:boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);