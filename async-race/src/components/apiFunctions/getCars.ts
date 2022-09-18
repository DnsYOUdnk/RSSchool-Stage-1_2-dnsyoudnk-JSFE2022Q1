import { GARAGE_URL } from './api';
import { ICar } from '../../types';

export const getCars = async (page: number, limit = 7): Promise<{ items: ICar[], count: number }> => {
  try {
    const res = await fetch(`${GARAGE_URL}?_page=${page}&_limit=${limit}`);
    const cars = await res.json();
    const totalCount = Number.parseInt(res.headers.get('X-Total-Count')!, 10);

    return {
      items: cars,
      count: totalCount,
    };
  } catch (err) {
    throw new Error(err as string);
  }
};
