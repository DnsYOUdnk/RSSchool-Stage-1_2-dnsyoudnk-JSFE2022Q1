import storeData from '../../storeData/storeData';
import { getCar } from '../../utils/funcRequestAPI/getCar';
import { deleteCar } from '../../utils/funcRequestAPI/deleteCara';
import { createCar } from '../../utils/funcRequestAPI/createCar';
import { updateCar } from '../../utils/funcRequestAPI/updateCar';
import { deleteWinner, savingWinner } from '../../utils/funcRequestAPI/changeWinner';
import {
  ICar,
  IWin,
  Colors,
  NamePage,
} from '../../types';
import { generateRandomCars } from '../../utils/generateRandomCars';
import { startRace } from '../../utils/startRace';
import { Garage } from '../Garage';
import { renderWinners } from '../Winners';
import { updateGarage } from '../../utils/updateGarage';
import { updateWinners } from '../../utils/updateWinners';
import { startDrive } from '../../utils/startDrive';
import { stopDriving } from '../../utils/stopDriving';
import { setSortOrder } from '../../utils/setSortOrder';

let selectedCar: ICar | null = null;

export const listen = (): void => {
  document.body.addEventListener('click', async (event) => {
    const eventElement = event.target as HTMLElement;
    const garageView = document.getElementById('garage') as HTMLElement;
    const garageViewElement = document.getElementById('garage-view') as HTMLElement;
    const winnersViewElement = document.getElementById('winners-view') as HTMLElement;

    if (eventElement.classList.contains('start__engine-button')) {
      const id = Number.parseInt(eventElement.id.split('start_engine-car-')[1], 10);
      startDrive(id);
    }
    if (eventElement.classList.contains('stop__engine-button')) {
      const id = Number.parseInt(eventElement.id.split('stop_engine-car-')[1], 10);
      stopDriving(id);
    }
    if (eventElement.classList.contains('button-select')) {
      const cardId = Number.parseInt(eventElement.id.split('select_car-')[1], 10);
      selectedCar = await getCar(cardId);
      const updateName = document.getElementById('update-name') as HTMLInputElement;
      const updateColor = document.getElementById('update-color') as HTMLInputElement;
      updateName.value = selectedCar.name;
      updateColor.value = selectedCar.color;
      updateName.disabled = false;
      updateColor.disabled = false;
      (<HTMLButtonElement>document.getElementById('update-submit')).disabled = false;
    }
    if (eventElement.classList.contains('button-remove')) {
      const id = Number.parseInt(eventElement.id.split('remove_car-')[1], 10);
      await deleteCar(id);
      await deleteWinner(id);
      await updateGarage();
      garageView.innerHTML = Garage();
    }
    if (eventElement.classList.contains('random-button')) {
      (<HTMLButtonElement>eventElement).disabled = true;
      const cars = generateRandomCars();
      await Promise.all(cars.map(async (car) => createCar(car)));
      await updateGarage();
      garageView.innerHTML = Garage();
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
      storeData.cars.map(({ id }) => stopDriving(id!));
      const messageDiv = document.querySelector('.message');
      messageDiv?.classList.remove('visible');
      (<HTMLButtonElement>document.getElementById('race')).disabled = false;
    }
    if (eventElement.classList.contains('prev-button')) {
      switch (storeData.view) {
        case NamePage.Garage: {
          storeData.carsPage--;
          await updateGarage();
          garageView.innerHTML = Garage();
          break;
        }
        case NamePage.Winners: {
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
        case NamePage.Garage: {
          storeData.carsPage++;
          await updateGarage();
          garageView.innerHTML = Garage();
          break;
        }
        case NamePage.Winners: {
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
      storeData.view = NamePage.Garage;
      await updateGarage();
    }
    if (eventElement.classList.contains('winners-navigation-button')) {
      winnersViewElement.style.display = 'block';
      garageViewElement.style.display = 'none';
      await updateWinners();
      winnersViewElement.innerHTML = renderWinners();
      storeData.view = NamePage.Winners;
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
    (<HTMLElement>document.getElementById('garage')).innerHTML = Garage();
    (<HTMLInputElement>document.getElementById('create-name')).value = '';
    (<HTMLFormElement>event.target).disabled = true;
  });

  (<HTMLFormElement>document.getElementById(('update'))).addEventListener('submit', async (event) => {
    event.preventDefault();
    const car = {
      name: (<HTMLInputElement>document.getElementById('update-name')).value,
      color: (<HTMLInputElement>document.getElementById('update-color')).value,
    };
    if (selectedCar) await updateCar(selectedCar.id!, car);
    await updateGarage();
    (<HTMLElement>document.getElementById('garage')).innerHTML = Garage();
    const updateName = document.getElementById('update-name') as HTMLInputElement;
    const updateColor = document.getElementById('update-color') as HTMLInputElement;
    updateName.value = '';
    updateName.disabled = true;
    updateColor.value = Colors.White;
    updateColor.disabled = true;
    (<HTMLButtonElement>document.getElementById('update-submit')).disabled = true;
    selectedCar = null;
  });
};
