import { getCars } from '../apiFunctions/getCars';
import { getWinners } from '../apiFunctions/getWinners';
import { IStoreData } from '../../types';

const { items: cars, count: carsCount } = await getCars(1);
const { items: winners, count: winnersCount } = await getWinners({
  page: 1,
  limit: 10,
  sort: '',
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
  sort: '',
  sortOrder: '',
} as IStoreData);
