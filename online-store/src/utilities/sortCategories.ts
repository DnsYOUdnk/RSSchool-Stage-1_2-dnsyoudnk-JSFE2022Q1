import { arrCategories } from '../constants';
import { IFilterValue } from '../types';

export const sortCategories = (filterValue: IFilterValue): string[] => {
  return arrCategories.filter((value: string): boolean => {
    switch (value) {
      case "men's clothing": return filterValue.categoryMenclo;
      case "women's clothing": return filterValue.categoryWomenclo;
      case 'jewelery': return filterValue.categoryJuw;
      case 'electronics': return filterValue.categoryElec;
      default: return false;
    }
  });
};
