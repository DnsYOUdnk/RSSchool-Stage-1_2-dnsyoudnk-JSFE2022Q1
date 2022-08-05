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
  limit: number
  sort: string,
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
  animation: null,
  view: string,
  sort: string | null,
  sortOrder: string | null
}
