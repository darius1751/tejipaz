import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {
    
    @IsString()
    public readonly method: string;
    
    @IsNumber()
    public readonly mount: number;

    @IsMongoId()
    public readonly userId: string;

}
