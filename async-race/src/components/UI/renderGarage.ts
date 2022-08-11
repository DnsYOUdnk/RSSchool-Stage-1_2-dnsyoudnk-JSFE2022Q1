import storeData from '../storeData/storeData';
import { renderCar } from './renderCar';

export const renderGarage = () => `
<h1>Garage (${storeData.carsCount})</h1>
<h2>Page №${storeData.carsPage}</h2>
<ul class="garage__items">
  ${storeData.cars.map((car) => `
    <li class="garage__item">
      ${renderCar(car)}
    </li>
  `).join('')}
</ul>
`;
