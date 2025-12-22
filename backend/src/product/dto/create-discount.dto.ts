import { IsEnum, IsNumber, IsString, Min } from "class-validator";
import { DiscountTypes } from "../entities/discount.schema";

export class CreateDiscountDto {

    @IsEnum(DiscountTypes)
    public readonly type: string;

    @IsNumber()
    @Min(0)
    public readonly value: number;
}