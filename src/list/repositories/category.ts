import { CategorySearchInterface } from '../interfaces/category-search';
import { CategoryEntity } from '../entities/category';
import {
  EntityRepository,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  async findAll(search: CategorySearchInterface): Promise<CategoryEntity[]> {
    const query = this.createQueryBuilder('category');
    if (search.ids) {
      query.where('category.id IN (:...ids)', { ids: search.ids });
    }
    if (search.name) {
      query.where('category.name LIKE "%:name%"', { name: search.name });
    }

    if (search.ownerId) {
      const q = 'category.ownerId = :ownerId';
      const params = {
        ownerId: search.ownerId,
      };
      if (search.ids || search.name) {
        query.andWhere(q, params);
      } else {
        query.where(q, params);
      }
    }

    return await query.getMany();
  }

  async findById(id: string): Promise<CategoryEntity> {
    return await this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
  }

  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<CategoryEntity> {
    const query = super.createQueryBuilder(alias, queryRunner);
    query.innerJoinAndSelect(
      `${alias}.owner`,
      'owner',
      `owner.id = ${alias}.ownerId`,
    );
    return query;
  }
}
