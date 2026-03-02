import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Payment } from "src/payment/entities/payment.entity";

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Repayment {
    @Prop({ type: Types.ObjectId, ref: Payment.name, required: true })
    public readonly payment: Payment;
}
export const RepaymentSchema = SchemaFactory.createForClass(Repayment);