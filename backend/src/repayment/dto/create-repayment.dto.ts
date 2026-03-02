import { IsMongoId } from "class-validator";

export class CreateRepaymentDto {
    @IsMongoId()
    public readonly paymentId: string;
}
