import './style/style.css';
import { listen } from './components/UI/uiBasic';
import { render } from './components/UI/renderPage';
import { updateGarage } from './components/UI/updateGarage';

render();
await updateGarage();
listen();
