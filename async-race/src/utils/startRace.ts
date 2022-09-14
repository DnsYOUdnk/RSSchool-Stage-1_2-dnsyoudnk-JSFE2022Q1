import storeData from '../components/storeData/storeData';
import { IWin, StartDrive } from '../types';
import { raceAll } from './runRaceAll';

export const startRace = async (action: (id: number) => Promise<StartDrive>):
Promise<IWin> => {
  try {
    const promises = storeData.cars.map(({ id }) => action(id as number));
    const winner = await raceAll(promises, storeData.cars.map(({ id }) => (id || 1)));

    return winner;
  } catch (err) {
    throw new Error(err as string);
  }
};
