import { dataImage } from '../dataImage/dataImage';
import { getRandomImage } from './getRandomImage';

export const getCarImage = (color: string, id: number) => {
  const arrImages = dataImage(color);
  return getRandomImage(arrImages, id);
};
