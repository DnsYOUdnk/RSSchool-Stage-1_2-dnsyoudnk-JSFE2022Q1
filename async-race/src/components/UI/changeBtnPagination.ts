import storeData from '../storeData/storeData';

export const changeBtnPagination = (option: number): void => {
  const btnPrev = document.getElementById('prev') as HTMLButtonElement;
  const btnNext = document.getElementById('next') as HTMLButtonElement;
  const quantityElemGarage = 7;
  if (option === quantityElemGarage) {
    btnNext.disabled = !(storeData.carsPage * option < storeData.carsCount);
    btnPrev.disabled = !(storeData.carsPage > 1);
  } else {
    btnNext.disabled = !(storeData.winnersPage * option < storeData.winnersCount);
    btnPrev.disabled = !(storeData.winnersPage > 1);
  }
};
