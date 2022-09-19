import { DEFAULT_WINS_COUNT } from '../../constants';
import {
  FetchRequest, HTTPCodes, IWin, IWinner, RequestMethod,
} from '../../types';
import { WINNERS_URL } from './api';

const getFetchRequest = (requestMethod: string, id?: number): FetchRequest => ({
  source: `${WINNERS_URL}/${id || ''}`,
  options: {
    method: requestMethod,
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

export const getWinner = async (id: number): Promise<IWinner> => {
  const request = getFetchRequest(RequestMethod.GET, id);
  return fetch(request.source, request.options)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(Error(error.message));
    });
};

export const deleteWinner = async (id: number): Promise<void> => {
  const request = getFetchRequest(RequestMethod.DELETE, id);
  return fetch(request.source, request.options)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(Error(error.message));
    });
};

export const createWinner = async (body: IWinner): Promise<IWinner> => {
  const request = getFetchRequest(RequestMethod.POST);
  request.options.body = JSON.stringify(body);
  return fetch(request.source, request.options)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(Error(error.message));
    });
};

export const updateWinner = async (id: number, body: IWinner): Promise<IWinner> => {
  const request = getFetchRequest(RequestMethod.PUT, id);
  request.options.body = JSON.stringify(body);
  return fetch(request.source, request.options)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(Error(error.message));
    });
};

export const savingWinner = async (win: IWin): Promise<void> => {
  const request = getFetchRequest(RequestMethod.GET, win.id);
  try {
    const response = await fetch(request.source, request.options);
    if (response.status === HTTPCodes.Not_Found) {
      await createWinner({
        id: win.id,
        wins: DEFAULT_WINS_COUNT,
        time: win.time,
      });
    } else {
      const winner = await response.json();
      await updateWinner(win.id!, {
        id: win.id,
        wins: winner.wins + 1,
        time: win.time < winner.time ? win.time : winner.time,
      });
    }
  } catch (err) {
    throw new Error(err as string);
  }
};
