import { RefObject } from 'react';
import { getBreakPoint } from './getBreakPoint';

export const handlePrevNext = (productList: RefObject<HTMLUListElement>, direction: string) => {
  const productItem = productList.current !== null ? ([...productList.current.children] as HTMLLIElement[]) : [];
  const liFirst: HTMLLIElement = productItem[0];
  const liFirstWidth: number = liFirst.offsetWidth;
  const liFirstMR: number = parseInt(
    window.getComputedStyle(liFirst).marginRight,
  );
  const liFirstML: number = Math.abs(
    parseInt(window.getComputedStyle(liFirst).marginLeft),
  );
  const liFullWidth: number = liFirstWidth + liFirstMR;
  const breakPoint: number = getBreakPoint(liFullWidth, productItem, productList);
  let ml = 0;
  const DIRECTION_NEXT = 1;
  const DIRECTION_PREV = -1;

  //depending on the pressed button, we subtract or add an indent to move the products
  if (liFirstML < breakPoint + liFullWidth) {
    ml = liFirstML + (direction === 'next' ? DIRECTION_NEXT : DIRECTION_PREV) * liFullWidth;
  }

  liFirst.style.marginLeft = `-${ml}px`;
};