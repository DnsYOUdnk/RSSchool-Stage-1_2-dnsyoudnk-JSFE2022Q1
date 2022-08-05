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

export const updateWinner = async (id: number, body: IWinner): Promise<IWinner> => {
  const res = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const savingWinner = async ({ id, time }: { id: number, time: number }): Promise<void> => {
  const statusWin = await (await fetch(`${winners}/${id}}`)).status;
  if (statusWin === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
