import { getCarImage } from '../../utils/getCarImage';
import storeData from '../storeData/storeData';

export const renderWinners = () => `
<h1 class="winner__title">Winners (${storeData.winnersCount})</h1>
<h2 class="winner__sub_title">Page №${storeData.winnersPage}</h2>
<div class="table__wrap">
  <table class="table__winners" cellspasing="0" border="0" cellpadding="0">
    <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th class="table__winners-button button__win ${storeData.sortByPos}
      "id="sort-by-wins">Wins</th>
      <th class="table__winners-button button__time ${storeData.sortByTime}
      "id="sort-by-time">Best time(seconds)</th>
    </thead>
    <tbody>
      ${storeData.winners.map((winner, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${getCarImage(winner.car.color, winner.car.id as number)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</div>
`;
