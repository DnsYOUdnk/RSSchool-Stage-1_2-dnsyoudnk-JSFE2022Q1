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

const renderGarage = () => `
  <h1>Garage (${storeData.carsCount})</h1>
  <h2>Page №${storeData.carsPage}</h2>
  <ul class="garage__items">
    ${storeData.cars.map((car) => `
      <li class="garage__item">${renderCar(car)}</li>
    `).join('')}
  </ul>
`;

const renderWinners = () => `
  <h1>Winners (${storeData.winnersCount})</h1>
  <h2>Page №${storeData.winnersPage}</h2>
  <table class="table__winners" cellspasing="0" border="0" cellpadding="0">
    <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th class="table__winners-button ${storeData.sort === 'wins' ? storeData.sortOrder : ''}
      "id="sort-by-wins">Wins</th>
      <th class="table__winners-button ${storeData.sort === 'time' ? storeData.sortOrder : ''}
      "id="sort-by-time">Best time(seconds)</th>
    </thead>
    <tbody>
      ${storeData.winners.map((winner, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${renderCarImage(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;
