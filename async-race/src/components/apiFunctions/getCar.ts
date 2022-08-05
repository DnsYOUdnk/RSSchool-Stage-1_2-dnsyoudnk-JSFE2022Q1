import { garage } from './api';
import { Car } from '../../types';

export const getCar = async (id: number): Promise<Car> => {
  const res = await fetch(`${garage}/${id}`);
  const dataCar = await res.json();
  return dataCar;
};
