import storeData from '../storeData/storeData';
import { Car } from './Car';

export const Garage = () => `
<h1>Garage (${storeData.carsCount})</h1>
<h2>Page №${storeData.carsPage}</h2>
<ul class="garage__items">
  ${storeData.cars.map((car) => `
    <li class="garage__item">
      ${Car(car)}
    </li>
  `).join('')}
</ul>
`;
