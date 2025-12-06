import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Employee } from "src/employee/entities/employee.entity";
import { Role } from "src/role/entities/role.entity";

export const logResults = ["success", "failed"];

@Schema({ versionKey: false, timestamps: true })
export class Log {

    @Prop({ type: SchemaTypes.ObjectId, ref: Employee.name })
    public readonly employee: Employee;

    @Prop({ type: SchemaTypes.ObjectId, ref: Role.name })
    public readonly role: Role;

    @Prop({ type: SchemaTypes.String })
    public readonly detail: string;

    @Prop({ type: SchemaTypes.String, enum: logResults, default: "success" })
    public readonly result: string;
}
export const LogSchema = SchemaFactory.createForClass(Log);