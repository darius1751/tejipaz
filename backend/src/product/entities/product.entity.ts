import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { Tag } from "src/tag/entities/tag.entity";
import { Discount } from "./discount.schema";

@Schema({ versionKey: false, timestamps: true })
export class Product {

    @Prop({ type: SchemaTypes.String, unique: true })
    public readonly name: string;

    @Prop({ type: [SchemaTypes.String] })
    public readonly images: string[];

    @Prop({ type: SchemaTypes.String })
    public readonly slug: string;

    @Prop({ type: [SchemaTypes.ObjectId], ref: Tag.name })
    public readonly tags: Tag[];

    @Prop({ type: [SchemaTypes.ObjectId], ref: Category.name })
    public readonly categories: Category[];

    @Prop({ type: SchemaTypes.Number })
    public readonly price: number;

    @Prop({ type: Discount, isRequired: false, default: null })
    public readonly discount?: Discount;

    @Prop({ type: SchemaTypes.Number })
    public readonly stock: number;

    @Prop({ type: SchemaTypes.String })
    public readonly description: string;

    @Prop({ type: SchemaTypes.Boolean, default: true })
    public readonly available: boolean;

}

export const ProductSchema = SchemaFactory.createForClass(Product);