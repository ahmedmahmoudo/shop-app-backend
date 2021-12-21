import { UserCreateDto } from '../dtos/user-create';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse } from 'src/global/types/apiResponse';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<ApiResponse> {
    return {
      data: {
        token: this.authService.loginJwt(req.user),
      },
    };
  }

  async register(@Body() userInfo: UserCreateDto): Promise<ApiResponse> {
    const user = await this.authService.registerUser(userInfo);
    return {
      message: 'User register successfully',
      data: user,
    };
  }
}
