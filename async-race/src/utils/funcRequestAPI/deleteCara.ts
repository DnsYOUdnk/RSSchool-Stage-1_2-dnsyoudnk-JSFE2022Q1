import { GARAGE_URL } from './api';

export const deleteCar = async (id: number): Promise<void> => {
  try {
    const res = await fetch(`${GARAGE_URL}/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};
