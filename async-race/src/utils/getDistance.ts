import { getPositionAtCenter } from './getPositionCenter';

export const getDistance = (a: HTMLElement, b: HTMLElement): number => {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.sqrt((aPosition.x - bPosition.x) ** 2 + (aPosition.y - bPosition.y) ** 2);
};
