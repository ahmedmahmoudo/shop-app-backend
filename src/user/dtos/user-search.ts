import { Transform, Type } from 'class-transformer';
import { IsOptional, IsEmail, IsArray, IsUUID } from 'class-validator';

export class UserSearchDto {
  @IsArray()
  @Type(() => String)
  @IsUUID('4', { each: true })
  @IsOptional()
  @Transform(({ value }) => (value as string).split(','))
  ids?: string[];

  @IsEmail()
  @IsOptional()
  email?: string;
}
