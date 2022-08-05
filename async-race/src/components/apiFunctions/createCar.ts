import { garage } from './api';
import { Car } from '../../types';

export const createCar = async (body: Car): Promise<Car> => {
  const res = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
