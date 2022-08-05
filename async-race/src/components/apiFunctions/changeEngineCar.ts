import { DataMotion } from '../../types';
import { engine } from './api';

export const startEngine = async (id: number): Promise<DataMotion> => {
  const res = await fetch(`${engine}?id=${id}&status=started`, {
    method: 'PATH',
  });
  return res.json();
};
