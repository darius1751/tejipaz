import { Type } from "class-transformer";
import { IsBoolean, IsBooleanString, IsInt, IsMongoId, IsNumber, IsNumberString, IsOptional, IsString, Min, MinLength } from "class-validator";
import { CreateDiscountDto } from "./create-discount.dto";

export class CreateProductDto {

    @IsString()
    @MinLength(3)
    public readonly name: string;

    @IsMongoId({ each: true })
    @IsOptional()
    public readonly tags?: string[];

    @IsMongoId({ each: true })
    @IsOptional()
    public readonly categories?: string[];

    @IsNumberString({no_symbols: true})
    // @Min(0)
    public readonly price: number;

    @Type(() => CreateDiscountDto)
    @IsOptional()
    public readonly discount?: CreateDiscountDto;

    @IsNumberString({no_symbols: true})
    // @Min(0)
    public readonly stock: number;

    @IsString()
    public readonly description: string;

    @IsBooleanString()
    public readonly available: boolean;
}
