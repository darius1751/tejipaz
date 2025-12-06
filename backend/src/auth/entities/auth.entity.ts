import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Role } from "src/role/entities/role.entity";

@Schema({ versionKey: false, timestamps: true })
export class Credential {
    @Prop({ type: SchemaTypes.String, unique: true, isRequired: true })
    public readonly username: string;

    @Prop({ type: SchemaTypes.String, unique: true, isRequired: true })
    public readonly password: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: Role.name })
    public readonly role: Role;
}
export const CredentialSchema = SchemaFactory.createForClass(Credential);