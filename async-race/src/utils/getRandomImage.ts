export const getRandomImage = (arr: string[], id: number) => {
  const maxLengthArr = 7;
  const index = id % maxLengthArr;
  return arr[index];
};
