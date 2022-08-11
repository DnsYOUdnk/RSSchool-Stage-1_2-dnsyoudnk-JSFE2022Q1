import storeData from '../components/storeData/storeData';

export const raceAll = async (promises: Promise<{ success: boolean, id: number, time: number }>[], ids: number[]):
Promise<{ name?: string, color?: string, id?: number, time: number }> => {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.findIndex((i) => i === id);
    const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
    return raceAll(restPromises, restIds);
  }

  return { ...storeData.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
};
