import { ICar } from '../../types';
import { getCarImage } from '../../utils/getCarImage';

export const renderCar = ({ id, name, color }: ICar) => `
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
      ${getCarImage(color, id as number)}
    </div>
  </div>
  <div class="finish__flag" id="flag-${id}"><img src="./finish.svg" alt="finish"></div>
</div>
`;
