export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  const lengthColor = 6;
  for (let i = 0; i < lengthColor; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
