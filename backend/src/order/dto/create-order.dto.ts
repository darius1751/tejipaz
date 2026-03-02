import { IsArray, IsEnum, IsOptional, IsPhoneNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { OrderItem } from "../entities/order-item.schema";
import { Type } from "class-transformer";
import { OrderItemDto } from "./order-item.dto";
import { TaxDto } from "./tax.dto";

export class CreateOrderDto {

    @IsEnum(["progress", "delivered"])
    public readonly status: string;

    @IsPhoneNumber()
    public readonly phone: string;

    @IsString()
    @MinLength(3)
    public readonly country: string;

    @IsString()
    @MinLength(3)
    public readonly city: string;

    @IsString()
    @MinLength(3)
    public readonly address: string;


    @IsString()
    public readonly countryCode: string;

    @IsString()
    @IsOptional()
    public readonly description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    public readonly items: OrderItemDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TaxDto)
    public readonly taxes: TaxDto[];
}
