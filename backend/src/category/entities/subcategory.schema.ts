import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({ versionKey: false })
export class SubcategorySchema {

    @Prop({ type: SchemaTypes.String, unique: true })
    public readonly name: string;
}
