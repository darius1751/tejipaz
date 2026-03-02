import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
    @IsBoolean()
    @IsOptional()
    public readonly available?: boolean;
}
