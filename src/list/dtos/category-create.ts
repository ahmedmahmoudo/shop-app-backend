import { CategoryIconType } from './../types/categoryIcon';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  icon: CategoryIconType;

  @IsUUID()
  @IsDefined()
  ownerId: string;
}
