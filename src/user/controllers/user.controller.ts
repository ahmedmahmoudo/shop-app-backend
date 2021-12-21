import { AuthGuard } from './../guards/auth';
import { UserService } from '../services/user.service';
import { UserUpdateDto } from './../dtos/user-update';
import { UserCreateDto } from './../dtos/user-create';
import { UserFindOneDto } from './../dtos/user-find-one';
import { UserSearchDto } from './../dtos/user-search';
import { ApiResponse } from './../../global/types/apiResponse';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getAll(@Query() searchQuery: UserSearchDto): Promise<ApiResponse> {
    const userEntities = await this.userService.findAll(searchQuery);
    return {
      data: userEntities,
    };
  }

  @Get(':id')
  async getOne(@Param() { id }: UserFindOneDto): Promise<ApiResponse> {
    const userEntity = await this.userService.findById(id);
    return {
      data: userEntity,
    };
  }

  @Get(':id/categories')
  async getUserCategories(
    @Param() { id }: UserFindOneDto,
  ): Promise<ApiResponse> {
    const categories = await this.userService.getUserCategories(id);
    return {
      data: categories,
    };
  }

  @Post()
  async createNewUser(@Body() user: UserCreateDto): Promise<ApiResponse> {
    const userEntity = await this.userService.createUser(user);
    return {
      data: userEntity,
    };
  }

  @Put(':id/update')
  async updateUser(
    @Param() { id }: UserFindOneDto,
    @Body() userUpdate: UserUpdateDto,
  ): Promise<ApiResponse> {
    const userEntity = await this.userService.updateUser(id, userUpdate);
    return {
      data: userEntity,
    };
  }

  @Delete(':id/delete')
  async deleteUser(@Param() { id }: UserFindOneDto): Promise<ApiResponse> {
    await this.userService.deleteUser(id);
    return {
      message: 'User was removed successfully',
    };
  }
}
