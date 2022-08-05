import { garage } from './api';

interface Cars {
  name: string,
  color: string,
  id: number
}

export const getCars = async (page: number, limit = 7): Promise<{ items: Cars[], count: number }> => {
  const res = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  const arrCars = await res.json();
  const totalCount = Number(res.headers.get('X-Total-Count'));

  return {
    items: arrCars,
    count: totalCount,
  };
};
