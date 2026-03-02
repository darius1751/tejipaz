import { SchemaTypes } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Tax {

    @Prop({ type: SchemaTypes.String })
    public readonly reason: string;

    @Prop({ type: SchemaTypes.Number })
    public readonly amount: number;
}
