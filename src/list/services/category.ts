import { CategoryEntity } from './../entities/category';
import { CategoryUpdateInterface } from './../interfaces/category-update';
import { CategoryCreateInterface } from './../interfaces/category-create';
import { CategorySearchInterface } from './../interfaces/category-search';
import { CategoryRepository } from './../repositories/category';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findById(id: string): Promise<CategoryEntity | undefined> {
    const category = this.categoryRepository.findById(id);
    if (category) {
      return category;
    }
    throw new NotFoundException(`Category with id ${id} was not found`);
  }

  async findAll(search: CategorySearchInterface): Promise<CategoryEntity[]> {
    return this.categoryRepository.findAll(search);
  }

  async createCategory(
    category: CategoryCreateInterface,
  ): Promise<CategoryEntity> {
    const categoryEntity = this.categoryRepository.create(category);
    const categoryCreated = await this.categoryRepository.save(categoryEntity);
    if (categoryCreated) {
      return categoryCreated;
    }

    throw new InternalServerErrorException();
  }

  async updateCategory(
    id: string,
    category: CategoryUpdateInterface,
  ): Promise<CategoryEntity | undefined> {
    const categoryEntity = await this.findById(id);
    if (categoryEntity) {
      const updated = await this.categoryRepository.update(
        categoryEntity,
        category,
      );
      if (updated.affected > 0) {
        return categoryEntity;
      }
    }
    throw new NotFoundException(`Category with id ${id} was not found`);
  }

  async deleteCategory(id: string): Promise<boolean> {
    const CategoryEntity = await this.findById(id);
    if (CategoryEntity) {
      return (
        (await this.categoryRepository.delete(CategoryEntity)).affected > 0
      );
    }

    throw new NotFoundException(`Category with id ${id} was not found`);
  }
}
