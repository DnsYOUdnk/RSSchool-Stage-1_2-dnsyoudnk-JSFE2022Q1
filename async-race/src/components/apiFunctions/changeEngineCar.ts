import { DataMotion } from '../../types';
import { engine } from './api';

export const startEngine = async (id: number): Promise<DataMotion> => {
  const res = await fetch(`${engine}?id=${id}&status=started`, {
    method: 'PATH',
  });
  return res.json();
};

export const stopEngine = async (id: number): Promise<DataMotion> => {
  const res = await fetch(`${engine}?id=${id}&status=stopped`, {
    method: 'PATH',
  });
  return res.json();
};
