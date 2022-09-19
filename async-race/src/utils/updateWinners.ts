import { QUANTITY_ELEM_WINNERS } from '../constants';
import { getWinners } from './funcRequestAPI/getWinners';
import storeData from '../storeData/storeData';
import { changeBtnPagination } from './changeBtnPagination';

export const updateWinners = async (): Promise<void> => {
  try {
    const { items, count } = await getWinners({
      page: storeData.winnersPage,
      limit: 10,
      sortByTime: storeData.sortByTime,
      sortByPos: storeData.sortByPos,
      order: storeData.order,
    });
    if (items === undefined && count === undefined) {
      throw new Error('Incorrect motion data was received');
    }
    storeData.winners = items;
    storeData.winnersCount = count;
    changeBtnPagination(QUANTITY_ELEM_WINNERS);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};
