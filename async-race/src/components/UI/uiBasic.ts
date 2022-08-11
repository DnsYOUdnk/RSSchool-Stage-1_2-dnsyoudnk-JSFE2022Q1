import storeData from '../storeData/storeData';
import { getCar } from '../apiFunctions/getCar';
import { deleteCar } from '../apiFunctions/deleteCara';
import { createCar } from '../apiFunctions/createCar';
import { updateCar } from '../apiFunctions/updateCar';
import { deleteWinner, savingWinner } from '../apiFunctions/changeWinner';
import { ICar, IWin } from '../../types';
import { generateRandomCars } from '../../utils/generateRandomCars';
import { startRace } from '../../utils/startRace';
import { renderGarage } from './renderGarage';
import { renderWinners } from './renderWinners';
import { updateGarage } from './updateGarage';
import { updateWinners } from './updateWinners';
import { startDrive } from './startDrive';
import { stopDriving } from './stopDriving';
import { setSortOrder } from './setSortOrder';

let selectedCar: ICar | null = null;

export const listen = (): void => {
  document.body.addEventListener('click', async (event) => {
    const eventElement = event.target as HTMLElement;
    const garageView = document.getElementById('garage') as HTMLElement;
    const garageViewElement = document.getElementById('garage-view') as HTMLElement;
    const winnersViewElement = document.getElementById('winners-view') as HTMLElement;

    if (eventElement.classList.contains('start__engine-button')) {
      const id = +eventElement.id.split('start_engine-car-')[1];
      startDrive(id);
    }
    if (eventElement.classList.contains('stop__engine-button')) {
      const id = +eventElement.id.split('stop_engine-car-')[1];
      stopDriving(id);
    }
    if (eventElement.classList.contains('button-select')) {
      selectedCar = await getCar(+eventElement.id.split('select_car-')[1]);
      const updateName = document.getElementById('update-name') as HTMLInputElement;
      const updateColor = document.getElementById('update-color') as HTMLInputElement;
      updateName.value = selectedCar.name;
      updateColor.value = selectedCar.color;
      updateName.disabled = false;
      updateColor.disabled = false;
      (<HTMLButtonElement>document.getElementById('update-submit')).disabled = false;
    }
    if (eventElement.classList.contains('button-remove')) {
      const id = +eventElement.id.split('remove_car-')[1];
      await deleteCar(id);
      await deleteWinner(id);
      await updateGarage();
      garageView.innerHTML = renderGarage();
    }
    if (eventElement.classList.contains('random-button')) {
      (<HTMLButtonElement>eventElement).disabled = true;
      const cars = generateRandomCars();
      await Promise.all(cars.map(async (el) => createCar(el)));
      await updateGarage();
      garageView.innerHTML = renderGarage();
      (<HTMLButtonElement>eventElement).disabled = false;
    }
    if (eventElement.classList.contains('race-button')) {
      (<HTMLButtonElement>eventElement).disabled = true;
      const winner = await startRace(startDrive);
      await savingWinner(winner as IWin);
      const messageDiv = document.querySelector('.message') as HTMLElement;
      const message = document.getElementById('message_alert') as HTMLElement;
      message.innerHTML = `${winner.name} winner (${winner.time}s)!`;
      messageDiv.classList.add('visible');
      (<HTMLButtonElement>document.getElementById('reset')).disabled = false;
    }
    if (eventElement.classList.contains('reset-button')) {
      (<HTMLButtonElement>eventElement).disabled = true;
      storeData.cars.map(({ id }) => stopDriving(id as number));
      const messageDiv = document.querySelector('.message');
      messageDiv?.classList.remove('visible');
      (<HTMLButtonElement>document.getElementById('race')).disabled = false;
    }
    if (eventElement.classList.contains('prev-button')) {
      switch (storeData.view) {
        case 'garage': {
          storeData.carsPage--;
          await updateGarage();
          garageView.innerHTML = renderGarage();
          break;
        }
        case 'winners': {
          storeData.winnersPage--;
          await updateWinners();
          winnersViewElement.innerHTML = renderWinners();
          break;
        }
        default:
      }
    }
    if (eventElement.classList.contains('next-button')) {
      switch (storeData.view) {
        case 'garage': {
          storeData.carsPage++;
          await updateGarage();
          garageView.innerHTML = renderGarage();
          break;
        }
        case 'winners': {
          storeData.winnersPage++;
          await updateWinners();
          winnersViewElement.innerHTML = renderWinners();
          break;
        }
        default:
      }
    }
    if (eventElement.classList.contains('garage-navigation-button')) {
      garageViewElement.style.display = 'block';
      winnersViewElement.style.display = 'none';
      storeData.view = 'garage';
      await updateGarage();
    }
    if (eventElement.classList.contains('winners-navigation-button')) {
      winnersViewElement.style.display = 'block';
      garageViewElement.style.display = 'none';
      await updateWinners();
      winnersViewElement.innerHTML = renderWinners();
      storeData.view = 'winners';
    }
    if (eventElement.classList.contains('button__win')) {
      setSortOrder('wins');
    }
    if (eventElement.classList.contains('button__time')) {
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
    const updateName = document.getElementById('update-name') as HTMLInputElement;
    const updateColor = document.getElementById('update-color') as HTMLInputElement;
    updateName.value = '';
    updateName.disabled = true;
    updateColor.value = '#ffffff';
    updateColor.disabled = true;
    (<HTMLButtonElement>document.getElementById('update-submit')).disabled = true;
    selectedCar = null;
  });
};
