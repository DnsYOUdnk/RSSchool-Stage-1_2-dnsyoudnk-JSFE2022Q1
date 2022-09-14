import { garage } from './api';
import { ICar } from '../../types';

export const getCar = async (id: number): Promise<ICar> => {
  try {
    const res = await fetch(`${garage}/${id}`);
    const dataCar = await res.json();
    return dataCar;
  } catch (err) {
    throw new Error(err as string);
  }
};
