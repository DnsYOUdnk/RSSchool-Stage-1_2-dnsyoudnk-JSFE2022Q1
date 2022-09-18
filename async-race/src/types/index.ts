export interface ICar {
  name: string,
  color: string,
  id?: number,
}

export interface DataMotion {
  velocity: number,
  distance: number,
}

export interface ParamWinners {
  page: number,
  limit: number,
  sortByTime: string,
  sortByPos: string,
  order: string,
}

export interface IWinners {
  id: number,
  wins: number,
  time: number,
  car: ICar,
}

export interface IWinner {
  id?: number,
  wins: number,
  time: number,
}

export interface IStoreData {
  carsPage: number,
  cars: ICar[],
  carsCount: number,
  winnersPage: number,
  winners: IWinners[],
  winnersCount: number,
  animation: Record<string, Record<string, number>>,
  view: string,
  sortByTime: string,
  sortByPos: string,
  order: string,
}

export interface IWin {
  name?: string,
  color?: string,
  id?: number,
  time: number
}

export type StartDrive = {
  success: boolean,
  id: number,
  time: number
};

export enum NamePage {
  Winners = 'winners',
  Garage = 'garage',
}

export enum Colors {
  White = '#ffffff',
}

export type FetchRequest = {
  source: string,
  options: IOptions
};

export interface IOptions {
  method: string;
  body?: string;
  headers: {
    'Content-Type': string;
  }
}

export enum RequestEngineStatus {
  Start = 'started',
  Stop = 'stopped',
  Drive = 'drive',
}

export enum HTTPCodes {
  Unauthorized = 401,
  Not_Found = 404,
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
