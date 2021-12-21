import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from '../dtos/user-create';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyUser(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.userService.findByEmail(email);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (passwordValid) {
      delete user.password;
      return user;
    }
    return undefined;
  }

  loginJwt(user: UserEntity): string {
    return this.jwtService.sign(user);
  }

  async registerUser(user: UserCreateDto): Promise<UserEntity> {
    return this.userService.createUser(user);
  }
}
