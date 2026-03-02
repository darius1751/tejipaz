import { IsObject, IsPhoneNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from 'class-transformer'
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
export class CreateUserDto {

    @IsString()
    @MinLength(3)
    public readonly name: string;

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

    @IsObject()
    @ValidateNested()
    @Type(() => CreateAuthDto)
    public readonly credential: CreateAuthDto;
}
