import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { User } from "src/user/entities/user.entity";

export const logResults = ["success", "failed"];

@Schema({ versionKey: false, timestamps: true })
export class Log {

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public readonly user: User;

    @Prop({ type: SchemaTypes.String, enum: ['admin', 'user'] })
    public readonly role: string;

    @Prop({ type: SchemaTypes.String })
    public readonly detail: string;

    @Prop({ type: SchemaTypes.String, enum: logResults, default: "success" })
    public readonly result: string;
}
export const LogSchema = SchemaFactory.createForClass(Log);