import storeData from '../storeData/storeData';
// import { getCars } from '../apiFunctions/getCars';
// import { getCar } from '../apiFunctions/getCar';
// import { deleteCar } from '../apiFunctions/deleteCara';
// import { createCar } from '../apiFunctions/createCar';
// import { updateCar } from '../apiFunctions/updateCar';
// import { startEngine, stopEngine, driveCar } from '../apiFunctions/changeEngineCar';
// import { getWinners } from '../apiFunctions/getWinners';
// import { getWinner, deleteWinner, savingWinner } from '../apiFunctions/changeWinner';
import { ICar } from '../../types';
import { dataImage } from '../dataImage/dataImage';
import { getRandomImage } from '../../utils/getRandomImage';

// const selectedCar: ICar | null = null;

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
    <div class="finish__flag" id="flag-${id}"><img src="./finish.svg" alt="finish"></div>
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

export const render = async (): Promise<void> => {
  const homepage = `
    <div class="navigation">
      <button class="button garage-navigation-button primary" id="garage-navigation">To garage</button>
      <button class="button winners-navigation-button primary" id="winners-navigation">To winners</button>
    </div>
    <div id="garage-view">
      <div>
        <form class="form" id="create">
          <input class="input" id="create-name" name="name" type="text">
          <input class="color" id="create-color" name="color" type="color" value="#ffffff">
          <button class="button" type="submit">Create</button>
        </form>
        <form class="form" id="update">
          <input class="input" id="update-name" name="name" type="text" disabled>
          <input class="color" id="update-color" name="color" type="color" value="#ffffff" disabled>
          <button class="button" id="update-submit" type="submit">Update</button>
        </form>
      </div>
      <div class="race-controls">
        <button class="button race-button primary" id="race">Race</button>
        <button class="button reset-button primary" id="reset">Reset</button>
        <button class="button random-button" id="randomize">Generate cars</button>
      </div>
      <div id="garage">
        ${renderGarage()}
      </div>
      <div>
        <p class="message" id="message"></p>
      </div>
    </div>
    <div id="winners-view" style="display: none">
      ${renderWinners()}
    </div>
    <div class="pagination">
      <button class="button primary prev-button" disabled id="prev">Prev</button>
      <button class="button primary next-button" disabled id="next">Next</button>
    </div>
  `;
  const root = document.createElement('div');
  root.innerHTML = homepage;
  document.body.appendChild(root);
};
