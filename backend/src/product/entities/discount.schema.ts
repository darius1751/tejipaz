import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

export const DiscountTypes = ["percentage", "value"];

@Schema({ versionKey: false })
export class Discount {
    @Prop({ type: SchemaTypes.String, enum: DiscountTypes })
    public readonly type: string;

    @Prop({ type: SchemaTypes.Number })
    public readonly value: number;
}
