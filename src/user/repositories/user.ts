import { UserSearchInterface } from '../interfaces/user-search';
import { UserEntity } from '../entities/user';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findAll(search: UserSearchInterface): Promise<UserEntity[]> {
    const query = this.createQueryBuilder('user');
    if (search.ids) {
      query.where('user.id IN (:...ids)', { ids: search.ids });
    }
    if (search.email) {
      query.where('user.email LIKE "%:email%"', { email: search.email });
    }

    return await query.getMany();
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const query = this.createQueryBuilder('user');
    query.where('user.email = :email', { email });
    return query.getOne();
  }

  //Not needed currently

  //   createQueryBuilder(
  //     alias?: string,
  //     queryRunner?: QueryRunner,
  //   ): SelectQueryBuilder<UserEntity> {
  //     const query = super.createQueryBuilder(alias, queryRunner);
  //     query.leftJoinAndSelect(
  //       `${alias}.categories`,
  //       'categories',
  //       `categories.ownerId = ${alias}.id`,
  //     );

  //     return query;
  //   }
}
