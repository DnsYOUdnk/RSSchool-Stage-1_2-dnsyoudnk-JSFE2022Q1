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

const renderCar = ({ id, name, color }: ICar) => `
  <div class="car__buttons">
    <button class="button button-select" id="select_car-${id}">Select</button>
    <button class="button button-remove" id="remove_car-${id}">Remove</button>
    <span class="car__title-name">${name}</span>
  </div>
  <div class="track">
    <div class="track__launch-pad">
      <div class="car__control-panel">
        <button class="icon start__engine-button" id="start_engine-car-${id}">Start</button>
        <button class="icon stop__engine-button" id="stop_engine-car-${id}" disabled>Stop</button>
      </div>
      <div class="car__item" id="car-${id}">
        ${renderCarImage(color)}
      </div>
    </div>
    <div class="finish__flag" id="flag-${id}"><img src="../../assets/svg/finish.svg" alt="finish"></div>
  </div>
`;
