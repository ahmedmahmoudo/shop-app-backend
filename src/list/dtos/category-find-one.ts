import { IsDefined, IsUUID } from 'class-validator';

export class CategoryFindOneDTO {
  @IsUUID()
  @IsDefined()
  id: string;
}
