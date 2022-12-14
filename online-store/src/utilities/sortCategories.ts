import { ARR_CATEGORIES } from '../constants';
import { FilterTypes, IFilterValue } from '../types';

export const sortCategories = (filterValue: IFilterValue): string[] => {
  return ARR_CATEGORIES.filter((value: string): boolean => {
    switch (value) {
      case FilterTypes.MensClothe: return filterValue.categoryMenclo;
      case FilterTypes.WomensClothe: return filterValue.categoryWomenclo;
      case FilterTypes.Jewelery: return filterValue.categoryJuw;
      case FilterTypes.Electronics: return filterValue.categoryElec;
      default: return false;
    }
  });
};
