import './style/style.css';
import { listen } from './components/UI/uiBasic';
import { render } from './components/HomePage';
import { updateGarage } from './utils/updateGarage';

render();
await updateGarage();
listen();
