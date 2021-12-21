import { CategoryService } from './services/category';
import { CategoryRepository } from './repositories/category';
import { CategoryEntity } from './entities/category';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryRepository])],
  providers: [CategoryController, CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService, TypeOrmModule],
})
export class ListModule {}
