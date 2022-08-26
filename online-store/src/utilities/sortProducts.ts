import { IProduct, SortFilterTypes } from '../types';

export const sortProducts = (products: IProduct[], sortBy: string) => {
  switch (sortBy) {
    case SortFilterTypes.MinPrice:
      return products.sort((a, b) => a.price - b.price);
    case SortFilterTypes.MaxPrice:
      return products.sort((a, b) => b.price - a.price);
    case SortFilterTypes.ASC:
      return products.sort((a, b) => a.title.split('')[0].charCodeAt(0) - b.title.split('')[0].charCodeAt(0));
    case SortFilterTypes.DESC:
      return products.sort((a, b) => b.title.split('')[0].charCodeAt(0) - a.title.split('')[0].charCodeAt(0));
    default: return products;
  }
};
