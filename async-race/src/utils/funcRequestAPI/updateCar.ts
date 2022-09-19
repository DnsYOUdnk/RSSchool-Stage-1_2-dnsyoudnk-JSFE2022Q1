import { ICar } from '../../types';
import { GARAGE_URL } from './api';

export const updateCar = async (id: number, body: ICar): Promise<ICar> => {
  try {
    const res = await fetch(`${GARAGE_URL}/${id}`, {
      method: 'PUT',
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
