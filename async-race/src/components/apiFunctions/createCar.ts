import { garage } from './api';
import { ICar } from '../../types';

export const createCar = async (body: ICar): Promise<ICar> => {
  const res = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
