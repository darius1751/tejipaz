import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Credential } from "src/auth/entities/auth.entity";

@Schema({ versionKey: false, timestamps: true })
export class User {

    @Prop({ type: SchemaTypes.String })
    public readonly name: string;

    @Prop({ type: SchemaTypes.String, unique: true })
    public readonly email: string;

    @Prop({ type: SchemaTypes.String, })
    public readonly countryCode: string;

    @Prop({ type: SchemaTypes.String, })
    public readonly phone: string;

    @Prop({ type: SchemaTypes.String })
    public readonly country: string;

    @Prop({ type: SchemaTypes.String })
    public readonly city: string;

    @Prop({ type: SchemaTypes.String })
    public readonly address: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: Credential.name })
    public readonly credential: Credential;

}
export const UserSchema = SchemaFactory.createForClass(User);