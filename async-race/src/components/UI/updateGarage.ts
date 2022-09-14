import { QUANTITY_ELEM_GARAGE } from '../../Constants';
import { getCars } from '../apiFunctions/getCars';
import storeData from '../storeData/storeData';
import { changeBtnPagination } from './changeBtnPagination';

export const updateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(storeData.carsPage);
  storeData.cars = items;
  storeData.carsCount = count;
  changeBtnPagination(QUANTITY_ELEM_GARAGE);
};
