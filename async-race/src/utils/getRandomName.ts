import { CarBrand, namesModels } from '../dataNameCars/dataNameCars';

export const getRandomName = () => {
  const brand = CarBrand[Math.floor(Math.random() * CarBrand.length)];
  const models = namesModels[Math.floor(Math.random() * namesModels.length)];
  return `${brand} ${models}`;
};
