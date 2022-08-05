export interface Car {
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
  car: Car,
}
