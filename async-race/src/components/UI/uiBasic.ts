import storeData from '../storeData/storeData';
import { getCars } from '../apiFunctions/getCars';
import { getCar } from '../apiFunctions/getCar';
import { deleteCar } from '../apiFunctions/deleteCara';
import { createCar } from '../apiFunctions/createCar';
import { updateCar } from '../apiFunctions/updateCar';
import { startEngine, stopEngine, driveCar } from '../apiFunctions/changeEngineCar';
import { getWinners } from '../apiFunctions/getWinners';
import { deleteWinner, savingWinner } from '../apiFunctions/changeWinner';
import { ICar } from '../../types';
import { dataImage } from '../dataImage/dataImage';
import {
  animation, generateRandomCars, getDistance, getRandomImage, race,
} from '../../utils/getRandomImage';

let selectedCar: ICar | null = null;

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
      <div class="form__data">
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
      <div class="garage__components" id="garage">
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
  root.classList.add('homepage');
  root.innerHTML = homepage;
  document.body.appendChild(root);
};

export const updateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(storeData.carsPage);
  storeData.cars = items;
  storeData.carsCount = count;

  if (storeData.carsPage * 7 < storeData.carsCount) {
    (<HTMLButtonElement>document.getElementById('next')).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById('next')).disabled = false;
  }
  if (storeData.carsPage > 1) {
    (<HTMLButtonElement>document.getElementById('prev')).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById('prev')).disabled = true;
  }
};

export const updateWinners = async (): Promise<void> => {
  const { items, count } = await getWinners({
    page: storeData.winnersPage,
    limit: 10,
    sort: storeData.sort,
    order: storeData.sortOrder,
  });

  storeData.winners = items;
  storeData.winnersCount = count;

  if (storeData.winnersPage * 10 < storeData.winnersCount) {
    (<HTMLButtonElement>document.getElementById('next')).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById('next')).disabled = true;
  }
  if (storeData.winnersPage > 1) {
    (<HTMLButtonElement>document.getElementById('prev')).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById('prev')).disabled = true;
  }
};

const startDrive = async (id: number): Promise<{ success: boolean, id: number, time: number }> => {
  const startButton = document.getElementById(`start_engine-car-${id}`);
  (<HTMLButtonElement>startButton).disabled = true;

  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);

  (<HTMLButtonElement>document.getElementById(`stop_engine-car-${id}`)).disabled = false;

  const car = document.getElementById(`car-${id}`);
  const flag = document.getElementById(`flag-${id}`);
  const htmlDistance = Math.floor(getDistance((<HTMLButtonElement>car), (<HTMLButtonElement>flag)));

  storeData.animation[id] = animation((<HTMLButtonElement>car), htmlDistance, time);

  const { success } = await driveCar(id);
  if (!success) window.cancelAnimationFrame(storeData.animation[id].id);

  return { success, id, time };
};

const stopDriving = async (id: number) => {
  const stopButton = document.getElementById(`stop_engine-car-${id}`);
  (<HTMLButtonElement>stopButton).disabled = true;
  await stopEngine(id);
  (<HTMLButtonElement>document.getElementById(`start_engine-car-${id}`)).disabled = false;

  const car = document.getElementById(`car-${id}`);
  if (car) car.style.transform = 'translateX(0)';
  if (storeData.animation[id]) window.cancelAnimationFrame(storeData.animation[id].id);
};

const setSortOrder = async (sort: string) => {
  storeData.sortOrder = storeData.sortOrder === 'asc' ? 'desc' : 'asc';
  storeData.sort = sort;

  await updateWinners();
  (<HTMLButtonElement>document.getElementById('winners-view')).innerHTML = renderWinners();
};

export const listen = (): void => {
  document.body.addEventListener('click', async (event) => {
    if ((<HTMLButtonElement>event.target).classList.contains('start__engine-button')) {
      const id = +(<HTMLButtonElement>event.target).id.split('start_engine-car-')[1];
      startDrive(id);
    }
    if ((<HTMLButtonElement>event.target).classList.contains('stop__engine-button')) {
      const id = +(<HTMLButtonElement>event.target).id.split('stop_engine-car-')[1];
      stopDriving(id);
    }
    if ((<HTMLButtonElement>event.target).classList.contains('button-select')) {
      selectedCar = await getCar(+(<HTMLButtonElement>event.target).id.split('select_car-')[1]);
      (<HTMLInputElement>document.getElementById('update-name')).value = selectedCar.name;
      (<HTMLInputElement>document.getElementById('update-color')).value = selectedCar.color;
      (<HTMLInputElement>document.getElementById('update-name')).disabled = false;
      (<HTMLInputElement>document.getElementById('update-color')).disabled = false;
      (<HTMLButtonElement>document.getElementById('update-submit')).disabled = false;
    }
    if ((<HTMLButtonElement>event.target).classList.contains('button-remove')) {
      const id = +(<HTMLButtonElement>event.target).id.split('remove_car-')[1];
      await deleteCar(id);
      await deleteWinner(id);
      await updateGarage();
      (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage();
    }
    if ((<HTMLButtonElement>event.target).classList.contains('random-button')) {
      (<HTMLButtonElement>event.target).disabled = true;
      const cars = generateRandomCars();
      await Promise.all(cars.map(async (el) => createCar(el)));
      await updateGarage();
      (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage();
      (<HTMLButtonElement>event.target).disabled = false;
    }

    if ((<HTMLButtonElement>event.target).classList.contains('race-button')) {
      (<HTMLButtonElement>event.target).disabled = true;
      const winner = await race(startDrive);
      await savingWinner(winner as { name: string, color: string, id: number, time: number });
      const message = document.getElementById('message');
      (<HTMLElement>message).innerHTML = `${winner.name} won (${winner.time}s)!`;
      (<HTMLElement>message).classList.toggle('visible', true);
      (<HTMLButtonElement>document.getElementById('reset')).disabled = false;
    }
    if ((<HTMLButtonElement>event.target).classList.contains('reset-button')) {
      (<HTMLButtonElement>event.target).disabled = true;
      storeData.cars.map(({ id }) => stopDriving(id as number));
      const message = document.getElementById('message');
      message?.classList.toggle('visible', false);
      (<HTMLButtonElement>document.getElementById('race')).disabled = false;
    }
    if ((<HTMLButtonElement>event.target).classList.contains('prev-button')) {
      switch (storeData.view) {
        case 'garage': {
          storeData.carsPage--;
          await updateGarage();
          (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage();
          break;
        }
        case 'winners': {
          storeData.winnersPage--;
          await updateWinners();
          (<HTMLElement>document.getElementById('winners-view')).innerHTML = renderWinners();
          break;
        }
        default:
      }
    }
    if ((<HTMLButtonElement>event.target).classList.contains('next-button')) {
      switch (storeData.view) {
        case 'garage': {
          storeData.carsPage++;
          await updateGarage();
          (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage();
          break;
        }
        case 'winners': {
          storeData.winnersPage++;
          await updateWinners();
          (<HTMLElement>document.getElementById('winners-view')).innerHTML = renderWinners();
          break;
        }
        default:
      }
    }
    if ((<HTMLButtonElement>event.target).classList.contains('garage-menu-button')) {
      (<HTMLElement>document.getElementById('garage-view')).style.display = 'block';
      (<HTMLElement>document.getElementById('winners-view')).style.display = 'none';
      storeData.view = 'garage';
    }
    if ((<HTMLButtonElement>event.target).classList.contains('winners-menu-button')) {
      (<HTMLElement>document.getElementById('winners-view')).style.display = 'block';
      (<HTMLElement>document.getElementById('garage-view')).style.display = 'none';
      await updateWinners();
      (<HTMLElement>document.getElementById('winners-view')).innerHTML = renderWinners();
      storeData.view = 'winners';
    }
    if ((<HTMLElement>event.target).classList.contains('table-wins')) {
      setSortOrder('wins');
    }
    if ((<HTMLElement>event.target).classList.contains('table-time')) {
      setSortOrder('time');
    }
  });

  (<HTMLFormElement>document.getElementById(('create'))).addEventListener('submit', async (event) => {
    event.preventDefault();
    const car = {
      name: (<HTMLInputElement>document.getElementById('create-name')).value,
      color: (<HTMLInputElement>document.getElementById('create-color')).value,
    };
    await createCar(car);
    await updateGarage();
    (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage();
    (<HTMLInputElement>document.getElementById('create-name')).value = '';
    (<HTMLFormElement>event.target).disabled = true;
  });

  (<HTMLFormElement>document.getElementById(('update'))).addEventListener('submit', async (event) => {
    event.preventDefault();
    const car = {
      name: (<HTMLInputElement>document.getElementById('update-name')).value,
      color: (<HTMLInputElement>document.getElementById('update-color')).value,
    };
    if (selectedCar) await updateCar(selectedCar.id as number, car);
    await updateGarage();
    (<HTMLElement>document.getElementById('garage')).innerHTML = renderGarage();
    (<HTMLInputElement>document.getElementById('update-name')).value = '';
    (<HTMLInputElement>document.getElementById('update-name')).disabled = true;
    (<HTMLInputElement>document.getElementById('update-color')).disabled = true;
    (<HTMLButtonElement>document.getElementById('update-submit')).disabled = true;
    (<HTMLInputElement>document.getElementById('update-color')).value = '#ffffff';
    selectedCar = null;
  });
};
