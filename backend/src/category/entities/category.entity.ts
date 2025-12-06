import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({ versionKey: false })
export class Category {

    @Prop({ type: SchemaTypes.String, unique: true })
    public readonly name: string;

}
export const CategorySchema = SchemaFactory.createForClass(Category);