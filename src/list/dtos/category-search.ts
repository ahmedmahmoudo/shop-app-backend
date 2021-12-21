import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CategorySearchDto {
  @IsArray()
  @Type(() => String)
  @IsUUID('4', { each: true })
  @IsOptional()
  @Transform(({ value }) => (value as string).split(','))
  ids?: string[];

  @IsString()
  @IsOptional()
  name?: string;
}
