import { ParamWinners, IWinners } from '../../types';
import { winners } from './api';
import { getCar } from './getCar';

export const getWinners = async ({
  page, limit = 10, sortByTime, sortByPos, order,
}: ParamWinners): Promise<{ items: IWinners[], count: number }> => {
  const sortOrderByTime = sortByTime ? `&_sort=time&_order=${sortByTime}` : '';
  const sortOrderByPos = sortByPos ? `&_sort=wins&_order=${sortByPos}` : '';
  const sort = order === 'wins' ? sortOrderByPos : sortOrderByTime;
  const res = await fetch(`${winners}?_page=${page}&_limit=${limit}${sort}`);
  const arrWinners = await res.json();
  const totalCount = Number(res.headers.get('X-Total-Count'));
  const items = await Promise.all(arrWinners.map(async (winner: { id: number }) => (
    { ...winner, car: await getCar(winner.id) }
  )));

  return {
    items,
    count: totalCount,
  };
};
