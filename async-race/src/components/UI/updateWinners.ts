import { getWinners } from '../apiFunctions/getWinners';
import storeData from '../storeData/storeData';
import { changeBtnPagination } from './changeBtnPagination';

export const updateWinners = async (): Promise<void> => {
  const { items, count } = await getWinners({
    page: storeData.winnersPage,
    limit: 10,
    sortByTime: storeData.sortByTime,
    sortByPos: storeData.sortByPos,
    order: storeData.order,
  });
  storeData.winners = items;
  storeData.winnersCount = count;
  const quantityElemWinners = 10;
  changeBtnPagination(quantityElemWinners);
};
