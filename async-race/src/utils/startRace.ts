import storeData from '../components/storeData/storeData';
import { raceAll } from './runRaceAll';

export const startRace = async (action: (id: number) => Promise<{ success: boolean, id: number, time: number }>):
Promise<{ name?: string, color?: string, id?: number, time: number }> => {
  const promises = storeData.cars.map(({ id }) => action(id as number));

  const winner = await raceAll(promises, storeData.cars.map(({ id }) => (id || 1)));

  return winner;
};
