import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({ versionKey: false })
export class Role {
    @Prop({ type: SchemaTypes.String })
    public readonly name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);