import { IsMongoId, IsNumber } from "class-validator";

export class OrderItemDto {
    @IsMongoId()
    public readonly productId: string;

    @IsNumber()
    public readonly cant: number;

}