import { ASCENDING_MARK, DESCENDING_MARK, MARK_WINS } from '../../Constants';
import storeData from '../storeData/storeData';
import { renderWinners } from './renderWinners';
import { updateWinners } from './updateWinners';

export const setSortOrder = async (sort: string) => {
  if (sort === MARK_WINS) {
    storeData.sortByPos = storeData.sortByPos === ASCENDING_MARK ? DESCENDING_MARK : ASCENDING_MARK;
  } else {
    storeData.sortByTime = storeData.sortByTime === ASCENDING_MARK ? DESCENDING_MARK : ASCENDING_MARK;
  }
  storeData.order = sort;

  await updateWinners();
  (<HTMLDivElement>document.getElementById('winners-view')).innerHTML = renderWinners();
};
