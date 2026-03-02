import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Product } from "src/product/entities/product.entity";

@Schema({ versionKey: false })
export class OrderItem {

    @Prop({ type: SchemaTypes.ObjectId, ref: Product.name })
    public readonly product: Product;

    @Prop({ type: SchemaTypes.Number })
    public readonly cant: number;

    @Prop({ type: SchemaTypes.Number })
    public readonly unitPrice: number;
}