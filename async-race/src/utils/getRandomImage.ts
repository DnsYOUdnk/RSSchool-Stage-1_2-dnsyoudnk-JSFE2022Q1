import { QUANTITY_ELEM_GARAGE } from '../Constants';

export const getRandomImage = (arr: string[], id: number) => {
  const index = id % QUANTITY_ELEM_GARAGE;
  return arr[index];
};
