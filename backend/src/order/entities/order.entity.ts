import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderItem } from "./order-item.schema";
import { SchemaTypes } from "mongoose";
import { Payment } from "src/payment/entities/payment.entity";
import { Tax } from "./tax.schema";

export const orderStatus = ["progress", "delivered"];

@Schema({ versionKey: false, timestamps: true })
export class Order {

    @Prop({ type: SchemaTypes.String, enum: orderStatus, default: "progress" })
    public readonly status: string;

    @Prop({ type: SchemaTypes.String })
    public readonly country: string;

    @Prop({ type: SchemaTypes.String })
    public readonly city: string;

    @Prop({ type: SchemaTypes.String })
    public readonly countryCode: string;

    @Prop({ type: SchemaTypes.String })
    public readonly phone: string;

    @Prop({ type: SchemaTypes.String })
    public readonly address: string;

    @Prop({ type: SchemaTypes.String })
    public readonly description?: string;

    @Prop({ type: [OrderItem] })
    public readonly items: OrderItem[];

    @Prop({ type: SchemaTypes.ObjectId, ref: Payment.name })
    public readonly payment: Payment;

    @Prop({ type: [Tax] })
    public readonly taxes: Tax[];

}
export const OrderSchema = SchemaFactory.createForClass(Order);