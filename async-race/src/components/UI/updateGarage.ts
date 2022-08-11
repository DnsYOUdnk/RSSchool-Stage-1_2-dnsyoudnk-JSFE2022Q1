import { getCars } from '../apiFunctions/getCars';
import storeData from '../storeData/storeData';
import { changeBtnPagination } from './changeBtnPagination';

export const updateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(storeData.carsPage);
  storeData.cars = items;
  storeData.carsCount = count;
  const quantityElemGarage = 7;
  changeBtnPagination(quantityElemGarage);
};
