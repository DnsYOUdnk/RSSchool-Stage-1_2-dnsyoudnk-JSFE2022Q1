import { StartDrive } from '../types';
import { getAnimation } from './getAnimation';
import { getDistance } from './getDistance';
import { driveCar, startEngine } from './funcRequestAPI/changeEngineCar';
import storeData from '../storeData/storeData';

export const startDrive = async (id: number): Promise<StartDrive> => {
  const startButton = document.getElementById(`start_engine-car-${id}`) as HTMLButtonElement;
  startButton.disabled = true;
  let time;
  try {
    const { velocity, distance } = await startEngine(id);
    if (velocity === 0 || (!distance && !velocity)) {
      throw new Error('Incorrect motion data was received');
    }
    time = Math.round(distance / velocity);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    startButton.disabled = false;
    time = 0;
    return { success: false, id, time };
  }

  (<HTMLButtonElement>document.getElementById(`stop_engine-car-${id}`)).disabled = false;

  const car = document.getElementById(`car-${id}`) as HTMLDivElement;
  const flag = document.getElementById(`flag-${id}`) as HTMLDivElement;
  const htmlDistance = Math.floor(getDistance(car, flag));

  storeData.animation[id] = getAnimation((car), htmlDistance, time);

  const { success } = await driveCar(id);
  if (!success) window.cancelAnimationFrame(storeData.animation[id].id);

  return { success, id, time };
};
