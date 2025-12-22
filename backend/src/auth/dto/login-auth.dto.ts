import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginAuthDto {
    @IsEmail()
    public readonly email: string;

    @IsStrongPassword()
    public readonly password: string;
}