import { AuthGuard } from './../../user/guards/auth';
import { CategoryCreateDto } from './../dtos/category-create';
import { CategoryService } from './../services/category';
import { CategoryUpdateDto } from './../dtos/category-update';
import { ApiResponse } from './../../global/types/apiResponse';
import { CategorySearchDto } from './../dtos/category-search';
import { CategoryFindOneDTO } from '../dtos/category-find-one';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  async getAll(@Query() searchQuery: CategorySearchDto): Promise<ApiResponse> {
    const categoryEntities = await this.categoryService.findAll(searchQuery);
    return {
      data: categoryEntities,
    };
  }

  @Get(':id')
  async getOne(@Param() { id }: CategoryFindOneDTO): Promise<ApiResponse> {
    const categoryEntity = await this.categoryService.findById(id);
    return {
      data: categoryEntity,
    };
  }

  @Post()
  async createNewCategory(
    @Body() category: CategoryCreateDto,
  ): Promise<ApiResponse> {
    const categoryEntity = await this.categoryService.createCategory(category);
    return {
      data: categoryEntity,
    };
  }

  @Put(':id/update')
  async updateCategory(
    @Param() { id }: CategoryFindOneDTO,
    @Body() categoryUpdate: CategoryUpdateDto,
  ): Promise<ApiResponse> {
    const categoryEntity = await this.categoryService.updateCategory(
      id,
      categoryUpdate,
    );
    return {
      data: categoryEntity,
    };
  }

  @Delete(':id/delete')
  async deleteCategory(
    @Param() { id }: CategoryFindOneDTO,
  ): Promise<ApiResponse> {
    await this.categoryService.deleteCategory(id);
    return {
      message: 'Category was removed successfully',
    };
  }
}
