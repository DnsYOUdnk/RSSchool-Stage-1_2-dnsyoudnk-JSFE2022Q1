import './style/style.css';
import { listen, render, updateGarage } from './components/UI/uiBasic';

render();
await updateGarage();
listen();
