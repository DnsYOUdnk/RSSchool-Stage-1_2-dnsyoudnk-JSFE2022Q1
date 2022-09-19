import { MARK_WINS, QUANTITY_ELEM_WINNERS } from '../../constants';
import { ParamWinners, IWinners } from '../../types';
import { WINNERS_URL } from './api';
import { getCar } from './getCar';

export const getWinners = async ({
  page, limit = QUANTITY_ELEM_WINNERS, sortByTime, sortByPos, order,
}: ParamWinners): Promise<{ items: IWinners[], count: number }> => {
  try {
    const requestSortOrderByTime = sortByTime ? `&_sort=time&_order=${sortByTime}` : '';
    const requestSortOrderByPos = sortByPos ? `&_sort=wins&_order=${sortByPos}` : '';
    const sort = order === MARK_WINS ? requestSortOrderByPos : requestSortOrderByTime;
    const res = await fetch(`${WINNERS_URL}?_page=${page}&_limit=${limit}${sort}`);
    const winners = await res.json();
    const totalCount = Number.parseInt(res.headers.get('X-Total-Count')!, 10);
    const items = await Promise.all(winners.map(async (winner: { id: number }) => (
      { ...winner, car: await getCar(winner.id) }
    )));

    return {
      items,
      count: totalCount,
    };
  } catch (err) {
    throw new Error(err as string);
  }
};
