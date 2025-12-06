import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { User } from "src/user/entities/user.entity";

export const paymentStatus = ["pending", "reject", "approved"];

@Schema({ versionKey: false, timestamps: true })
export class Payment {

    @Prop({ type: SchemaTypes.Number, })
    public readonly mount: number;

    @Prop({ type: SchemaTypes.String })
    public readonly payment_commitment: string;

    @Prop({ type: SchemaTypes.String, enum: paymentStatus })
    public readonly status: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    public readonly user: User;

    @Prop({ type: SchemaTypes.String, unique: true })
    public readonly transactionId: string;

}
export const PaymentSchema = SchemaFactory.createForClass(Payment);