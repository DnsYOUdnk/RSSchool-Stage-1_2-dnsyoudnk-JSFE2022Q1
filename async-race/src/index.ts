import './style/style.css';
import { HomePage } from './components/HomePage';
import { updateGarage } from './utils/updateGarage';

HomePage();
await updateGarage();
