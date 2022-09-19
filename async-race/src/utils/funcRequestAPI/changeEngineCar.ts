import {
  DataMotion, FetchRequest, RequestEngineStatus, RequestMethod,
} from '../../types';
import { ENGINE_URL } from './api';

const getFetchRequest = (id: number, specifiedURL: string): FetchRequest => ({
  source: `${ENGINE_URL}?id=${id}&status=${specifiedURL}`,
  options: {
    method: RequestMethod.PATCH,
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8',
    },
  },
});

export const startEngine = async (id: number): Promise<DataMotion> => {
  const request = getFetchRequest(id, RequestEngineStatus.Start);
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
      return {};
    });
};

export const stopEngine = async (id: number): Promise<DataMotion> => {
  const request = getFetchRequest(id, RequestEngineStatus.Stop);
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
      return {};
    });
};

export const driveCar = async (id: number): Promise<{ success: boolean }> => {
  const request = getFetchRequest(id, RequestEngineStatus.Drive);
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
      return { success: false };
    });
};
