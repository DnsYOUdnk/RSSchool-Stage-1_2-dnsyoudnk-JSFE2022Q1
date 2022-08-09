import { garage } from './api';
import { ICar } from '../../types';
import { getRandomName } from '../../utils/getRandomImage';

export const createCar = async (body: ICar): Promise<ICar> => {
  if (body.name === '') body.name = getRandomName();
  const res = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
