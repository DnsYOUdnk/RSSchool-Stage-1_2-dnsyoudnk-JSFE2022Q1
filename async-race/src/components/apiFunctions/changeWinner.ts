import { IWinner } from '../../types';
import { winners } from './api';

export const getWinner = async (id: number): Promise<IWinner> => {
  const res = await fetch(`${winners}/${id}`);
  return res.json();
};

export const deleteWinner = async (id: number): Promise<void> => {
  const res = await fetch(`${winners}/${id}`, { method: 'DELETE' });
  return res.json();
};

export const createWinner = async (body: IWinner): Promise<IWinner> => {
  const res = await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
