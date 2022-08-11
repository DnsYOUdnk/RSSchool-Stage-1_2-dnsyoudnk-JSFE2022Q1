export const getPositionAtCenter = (element: HTMLElement) => {
  // eslint-disable-next-line object-curly-newline
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};
