import { CategoryIconType } from '../types/categoryIcon';

export interface CategoryCreateInterface {
  name: string;

  icon: CategoryIconType;

  ownerId: string;
}
