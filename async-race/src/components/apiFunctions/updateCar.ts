import { Car } from '../../types';
import { garage } from './api';

export const updateCar = async (id: number, body: Car): Promise<Car> => {
  const res = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
