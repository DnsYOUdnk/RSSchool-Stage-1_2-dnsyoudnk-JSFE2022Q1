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
