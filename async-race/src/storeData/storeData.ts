import { getCars } from '../utils/funcRequestAPI/getCars';
import { getWinners } from '../utils/funcRequestAPI/getWinners';
import { IStoreData } from '../types';

const { items: cars, count: carsCount } = await getCars(1);
const { items: winners, count: winnersCount } = await getWinners({
  page: 1,
  limit: 10,
  sortByTime: '',
  sortByPos: '',
  order: '',
});

export default ({
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  animation: {},
  view: 'garage',
  sortByTime: '',
  sortByPos: '',
  order: '',
} as IStoreData);
