import { IsHexColor, IsString, MinLength } from "class-validator";

export class CreateTagDto {
    @IsString()
    @MinLength(3)
    public readonly name: string;

    @IsHexColor()
    public readonly color: string;
}
