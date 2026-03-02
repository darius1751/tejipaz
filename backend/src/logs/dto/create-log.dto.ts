import { IsMongoId, IsString } from "class-validator";

export class CreateLogDto {

    @IsMongoId()
    public readonly userId: string;

    @IsString()
    public readonly detail: string;
}
