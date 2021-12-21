import { IsDefined, IsEmail, IsString, IsOptional } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsDefined()
  lastName: string;

  @IsString()
  @IsDefined()
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
