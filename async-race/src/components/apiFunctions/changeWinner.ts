import { IWin, IWinner } from '../../types';
import { winners } from './api';

export const getWinner = async (id: number): Promise<IWinner> => {
  try {
    const res = await fetch(`${winners}/${id}`);
    return await res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export const deleteWinner = async (id: number): Promise<void> => {
  try {
    const res = await fetch(`${winners}/${id}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export const createWinner = async (body: IWinner): Promise<IWinner> => {
  try {
    const res = await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export const updateWinner = async (id: number, body: IWinner): Promise<IWinner> => {
  try {
    const res = await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (err) {
    throw new Error(err as string);
  }
};

export const savingWinner = async (win: IWin): Promise<void> => {
  try {
    const statusWin = await (await fetch(`${winners}/${win.id}`)).status;
    if (statusWin === 404) {
      await createWinner({
        id: win.id,
        wins: 1,
        time: win.time,
      });
    } else {
      if (!win.id) return;
      const winner = await getWinner(win.id);
      await updateWinner(win.id, {
        id: win.id,
        wins: winner.wins + 1,
        time: win.time < winner.time ? win.time : winner.time,
      });
    }
  } catch (err) {
    throw new Error(err as string);
  }
};
