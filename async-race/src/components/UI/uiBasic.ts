import storeData from '../storeData/storeData';
import { getCars } from '../apiFunctions/getCars';
import { getCar } from '../apiFunctions/getCar';
import { deleteCar } from '../apiFunctions/deleteCara';
import { createCar } from '../apiFunctions/createCar';
import { updateCar } from '../apiFunctions/updateCar';
import { startEngine, stopEngine, driveCar } from '../apiFunctions/changeEngineCar';
import { getWinners } from '../apiFunctions/getWinners';
import { getWinner, deleteWinner, savingWinner } from '../apiFunctions/changeWinner';
import { ICar } from '../../types';
import { dataImage } from '../dataImage/dataImage';
import { getRandomImage } from '../../utils/getRandomImage';

const selectedCar: ICar | null = null;

const renderCarImage = (color: string) => {
  const arrImages = dataImage(color);
  return getRandomImage(arrImages);
};
