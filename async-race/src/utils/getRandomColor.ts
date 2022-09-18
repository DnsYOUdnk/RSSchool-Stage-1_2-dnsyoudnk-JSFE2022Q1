import { LENGTH_COLOR, LETTERS } from '../Constants';

export const getRandomColor = () => {
  let color = '#';
  for (let i = 0; i < LENGTH_COLOR; i++) {
    color += LETTERS[Math.floor(Math.random() * 16)];
  }
  return color;
};
