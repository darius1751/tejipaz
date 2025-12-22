import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsMongoId, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";
import { CreateDiscountDto } from "./create-discount.dto";

export class CreateProductDto {

    @IsString()
    @MinLength(3)
    public readonly name: string;

    @IsString({ each: true })
    public readonly images: string[];

    @IsMongoId({ each: true })
    public readonly tags: String[];

    @IsMongoId({ each: true })
    public readonly categories: string[];

    @IsNumber()
    @Min(0)
    public readonly price: number;

    @Type(() => CreateDiscountDto)
    @IsOptional()
    public readonly discount?: CreateDiscountDto;

    @IsInt()
    @Min(0)
    public readonly stock: number;

    @IsString()
    public readonly description: string;

    @IsBoolean()
    public readonly available: boolean;
}
