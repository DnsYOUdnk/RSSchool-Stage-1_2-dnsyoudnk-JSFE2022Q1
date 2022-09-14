import { QUANTITY_ELEM_GARAGE } from '../Constants';

export const getRandomImage = (arr: string[], id: number) => {
  const maxLengthArr = QUANTITY_ELEM_GARAGE;
  const index = id % maxLengthArr;
  return arr[index];
};
