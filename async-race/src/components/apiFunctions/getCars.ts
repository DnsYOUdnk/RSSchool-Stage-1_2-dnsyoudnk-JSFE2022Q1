import { garage } from './api';
import { ICar } from '../../types';

export const getCars = async (page: number, limit = 7): Promise<{ items: ICar[], count: number }> => {
  const res = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const arrCars = await res.json();
  const totalCount = Number(res.headers.get('X-Total-Count'));

  return {
    items: arrCars,
    count: totalCount,
  };
};
