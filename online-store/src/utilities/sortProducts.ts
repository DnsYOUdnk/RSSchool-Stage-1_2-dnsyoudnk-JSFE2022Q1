import { IProduct } from '../types';

export const sortProducts = (products: IProduct[], sortBy: string) => {
  switch (sortBy) {
    case 'Min': return products.sort((a, b) => a.price - b.price);
    case 'Max': return products.sort((a, b) => b.price - a.price);
    case 'A-Z': return products.sort((a, b) => a.title.split('')[0].charCodeAt(0) - b.title.split('')[0].charCodeAt(0));
    case 'Z-A': return products.sort((a, b) => b.title.split('')[0].charCodeAt(0) - a.title.split('')[0].charCodeAt(0));
    default: return products;
  }
};
