import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
