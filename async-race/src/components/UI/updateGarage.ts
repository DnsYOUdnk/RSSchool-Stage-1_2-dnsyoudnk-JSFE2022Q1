import { QUANTITY_ELEM_GARAGE } from '../../Constants';
import { getCars } from '../apiFunctions/getCars';
import storeData from '../storeData/storeData';
import { changeBtnPagination } from './changeBtnPagination';

export const updateGarage = async (): Promise<void> => {
  try {
    const { items, count } = await getCars(storeData.carsPage);
    if (items === undefined && count === undefined) {
      throw new Error('Incorrect motion data was received');
    }
    storeData.cars = items;
    storeData.carsCount = count;
    changeBtnPagination(QUANTITY_ELEM_GARAGE);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};
