import { IWin, StartDrive } from '../types/index';
import storeData from '../components/storeData/storeData';

export const raceAll = async (promises: Promise<StartDrive>[], ids: number[]):
Promise<IWin> => {
  try {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
      const failedIndex = ids.indexOf(id);
      const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
      const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
      return await raceAll(restPromises, restIds);
    }

    const winnerCar = storeData.cars.find((car) => car.id === id);
    const winnerTime = Number.parseFloat((time / 1000).toFixed(2));
    return { ...winnerCar, time: winnerTime };
  } catch (err) {
    throw new Error(err as string);
  }
};
