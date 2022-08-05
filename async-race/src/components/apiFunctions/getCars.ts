import { garage } from './api';
import { Car } from '../../types';

export const getCars = async (page: number, limit = 7): Promise<{ items: Car[], count: number }> => {
  const res = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const arrCars = await res.json();
  const totalCount = Number(res.headers.get('X-Total-Count'));

  return {
    items: arrCars,
    count: totalCount,
  };
};
