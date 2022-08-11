import storeData from '../storeData/storeData';
import { renderWinners } from './renderWinners';
import { updateWinners } from './updateWinners';

export const setSortOrder = async (sort: string) => {
  if (sort === 'wins') {
    storeData.sortByPos = storeData.sortByPos === 'asc' ? 'desc' : 'asc';
    storeData.order = sort;
  } else {
    storeData.sortByTime = storeData.sortByTime === 'asc' ? 'desc' : 'asc';
    storeData.order = sort;
  }

  await updateWinners();
  (<HTMLDivElement>document.getElementById('winners-view')).innerHTML = renderWinners();
};
