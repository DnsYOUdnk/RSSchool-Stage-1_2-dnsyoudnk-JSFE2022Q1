export const getRandomImage = (arr: string[]) => {
  const index = Math.floor(Math.random() * 8);
  return arr.find((_, id) => id === index);
};
