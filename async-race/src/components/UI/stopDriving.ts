import { stopEngine } from '../apiFunctions/changeEngineCar';
import storeData from '../storeData/storeData';

export const stopDriving = async (id: number) => {
  (<HTMLButtonElement>document.getElementById(`stop_engine-car-${id}`)).disabled = true;
  await stopEngine(id);
  (<HTMLButtonElement>document.getElementById(`start_engine-car-${id}`)).disabled = false;

  const car = document.getElementById(`car-${id}`);
  if (car) car.style.transform = 'translateX(0)';
  if (storeData.animation[id]) window.cancelAnimationFrame(storeData.animation[id].id);
};
