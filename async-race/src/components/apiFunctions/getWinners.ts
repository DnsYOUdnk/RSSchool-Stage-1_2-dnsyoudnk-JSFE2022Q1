import { ParamWinners, IWinners, IWinner } from '../../types';
import { winners } from './api';
import { getCar } from './getCar';

export const getWinners = async ({
  page, limit = 10, sort, order,
}: ParamWinners): Promise<{ items: IWinners[], count: number }> => {
  const sortOrder = sort && order ? `&_sort=${sort}&_order=${order}` : '';
  const res = await fetch(`${winners}?_page=${page}&_limit=${limit}${sortOrder}`);
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

export const getWinner = async (id: number): Promise<IWinner> => {
  const res = await fetch(`${winners}/${id}`);
  return res.json();
};
