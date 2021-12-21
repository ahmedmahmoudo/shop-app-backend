import { IsDefined, IsUUID } from 'class-validator';

export class UserFindOneDto {
  @IsUUID()
  @IsDefined()
  id: string;
}
