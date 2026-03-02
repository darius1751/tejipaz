import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { SubcategorySchema } from "./subcategory.schema";

@Schema({ versionKey: false })
export class Category {

    @Prop({ type: SchemaTypes.String, unique: true })
    public readonly name: string;

    @Prop({ type: [SubcategorySchema] })
    public readonly subcategories: SubcategorySchema[]

}
export const CategorySchema = SchemaFactory.createForClass(Category);