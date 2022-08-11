import { getRandomColor } from './getRandomColor';
import { getRandomName } from './getRandomName';

export const generateRandomCars = (count = 100): { name: string, color:string }[] => new Array(count).fill(1)
  .map(() => ({ name: getRandomName(), color: getRandomColor() }));
