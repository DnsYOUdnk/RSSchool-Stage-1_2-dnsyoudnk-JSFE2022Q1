import { Garage } from './Garage';
import { renderWinners } from './Winners';

export const render = (): void => {
  const homepage = `
    <div class="navigation">
      <button class="button garage-navigation-button" id="garage-navigation">To garage</button>
      <button class="button winners-navigation-button" id="winners-navigation">To winners</button>
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
        <button class="button race-button" id="race">Race</button>
        <button class="button reset-button" id="reset">Reset</button>
        <button class="button random-button" id="randomize">Generate cars</button>
      </div>
      <div class="garage__components" id="garage">
        ${Garage()}
      </div>
      <div class="message">
        <p id="message_alert"></p>
      </div>
    </div>
    <div id="winners-view" style="display: none">
      ${renderWinners()}
    </div>
    <div class="pagination">
      <button class="button prev-button" disabled id="prev">Prev</button>
      <button class="button next-button" disabled id="next">Next</button>
    </div>
  `;
  const root = document.createElement('div');
  root.classList.add('homepage');
  root.innerHTML = homepage;
  document.body.appendChild(root);
};
