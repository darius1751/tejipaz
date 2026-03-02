import { IsNumber, IsString } from "class-validator";

export class TaxDto {
    
    @IsString()
    public readonly reason:string;
    
    @IsNumber()
    public readonly amount: number;
}