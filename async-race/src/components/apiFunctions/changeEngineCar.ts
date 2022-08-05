import { DataMotion } from '../../types';
import { engine } from './api';

export const startEngine = async (id: number): Promise<DataMotion> => {
  const res = await fetch(`${engine}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  return res.json();
};

export const stopEngine = async (id: number): Promise<DataMotion> => {
  const res = await fetch(`${engine}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  return res.json();
};

export const driveCar = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  const { status } = res;
  return status === 200 ? { ...(await res.json()) } : { success: false };
};
