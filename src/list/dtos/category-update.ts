import { CategoryIconType } from './../types/categoryIcon';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CategoryUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  icon?: CategoryIconType;

  @IsUUID()
  @IsOptional()
  ownerId?: string;
}
