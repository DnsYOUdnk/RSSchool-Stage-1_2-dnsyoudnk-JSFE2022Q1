import { getAnimation } from '../../utils/getAnimation';
import { getDistance } from '../../utils/getDistance';
import { driveCar, startEngine } from '../apiFunctions/changeEngineCar';
import storeData from '../storeData/storeData';

export const startDrive = async (id: number): Promise<{ success: boolean, id: number, time: number }> => {
  const startButton = document.getElementById(`start_engine-car-${id}`) as HTMLButtonElement;
  startButton.disabled = true;

  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);

  (<HTMLButtonElement>document.getElementById(`stop_engine-car-${id}`)).disabled = false;

  const car = document.getElementById(`car-${id}`) as HTMLDivElement;
  const flag = document.getElementById(`flag-${id}`) as HTMLDivElement;
  const htmlDistance = Math.floor(getDistance(car, flag));

  storeData.animation[id] = getAnimation((car), htmlDistance, time);

  const { success } = await driveCar(id);
  if (!success) window.cancelAnimationFrame(storeData.animation[id].id);

  return { success, id, time };
};
