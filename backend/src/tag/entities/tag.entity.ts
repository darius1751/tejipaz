import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({ versionKey: false })
export class Tag {

    @Prop({ type: SchemaTypes.String, unique: true })
    public readonly name: string;

    @Prop({ type: SchemaTypes.String })
    public readonly color: string;

    @Prop({ type: SchemaTypes.Boolean, default: true })
    public readonly available: boolean;

}
export const TagSchema = SchemaFactory.createForClass(Tag);