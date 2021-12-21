import { CategoryRepository } from '../../list/repositories/category';
import { UserUpdateInterface } from '../interfaces/user-update';
import { UserCreateInterface } from '../interfaces/user-create';
import { UserSearchInterface } from '../interfaces/user-search';
import { UserEntity } from '../entities/user';
import { UserRepository } from '../repositories/user';

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CategoryEntity } from 'src/list/entities/category';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findById(id);
    if (user) {
      delete user.password;
      return user;
    }
    throw new NotFoundException(`User with id ${id} was not found`);
  }

  async findAll(search: UserSearchInterface): Promise<UserEntity[]> {
    return this.userRepository.findAll(search);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findUserByEmail(email);
  }

  async createUser(user: UserCreateInterface): Promise<UserEntity> {
    const password = await bcrypt.hash(user.password, 10);
    const userEntity = this.userRepository.create({ ...user, password });
    const createdEntity = await this.userRepository.save(userEntity);
    if (createdEntity) {
      return createdEntity;
    }

    throw new InternalServerErrorException();
  }

  async updateUser(
    id: string,
    user: UserUpdateInterface,
  ): Promise<UserEntity | undefined> {
    const userEntity = await this.findById(id);
    if (userEntity) {
      const password = user.password
        ? await bcrypt.hash(user.password, 10)
        : userEntity.password;
      const updated = await this.userRepository.update(userEntity, {
        ...user,
        password,
      });
      if (updated.affected > 0) {
        return userEntity;
      }
    }

    throw new NotFoundException(`User with id ${id} was not found`);
  }

  async deleteUser(id: string): Promise<boolean> {
    const userEntity = await this.findById(id);
    if (userEntity) {
      return (await this.userRepository.delete(userEntity)).affected > 0;
    }

    throw new NotFoundException(`User with id ${id} was not found`);
  }

  async getUserCategories(id: string): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.findAll({ ownerId: id });

    //Removing ownerId since its not needed;
    return categories.map((category) => {
      delete category.owner;
      delete category.ownerId;
      return category;
    });
  }
}
