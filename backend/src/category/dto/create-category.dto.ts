import { IsString, MinLength } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @MinLength(3)
    public readonly name: string;
}
