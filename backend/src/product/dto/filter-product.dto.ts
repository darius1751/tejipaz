import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class FilterProductDto {

    @IsString()
    @IsOptional()
    public readonly name?: string;

    @IsString({ each: true })
    public readonly tags: string[];

    @IsString({ each: true })
    public readonly categories: string[];

    @IsNumber()
    @IsPositive()
    public readonly page: number;

    @IsNumber()
    @IsPositive()
    public readonly take: number = 10;
}