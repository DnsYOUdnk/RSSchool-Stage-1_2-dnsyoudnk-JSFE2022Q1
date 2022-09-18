import { GARAGE_URL } from './api';
import { ICar } from '../../types';
import { getRandomName } from '../../utils/getRandomName';

export const createCar = async (body: ICar): Promise<ICar> => {
  try {
    if (body.name === '') body.name = getRandomName();
    const res = await fetch(GARAGE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};
