import { CategoryIconType } from '../types/categoryIcon';

export interface CategoryUpdateInterface {
  name?: string;

  icon?: CategoryIconType;

  ownerId?: string;
}
