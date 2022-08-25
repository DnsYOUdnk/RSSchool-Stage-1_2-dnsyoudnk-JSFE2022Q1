import { RefObject } from 'react';

export const getBreakPoint = (fullWidth: number, productItem:  HTMLLIElement[],
  productList: RefObject<HTMLUListElement>): number => {
  return fullWidth * productItem.length - (productList.current !== null ? productList.current.offsetWidth : 0);
};
