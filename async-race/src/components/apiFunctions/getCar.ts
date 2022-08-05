import { garage } from './api';
import { ICar } from '../../types';

export const getCar = async (id: number): Promise<ICar> => {
  const res = await fetch(`${garage}/${id}`);
  const dataCar = await res.json();
  return dataCar;
};
