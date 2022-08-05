import { garage } from './api';

export const deleteCar = async (id: number): Promise<void> => {
  const res = await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
