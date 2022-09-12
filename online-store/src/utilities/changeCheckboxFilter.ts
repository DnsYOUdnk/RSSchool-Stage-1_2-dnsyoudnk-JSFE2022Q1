import { Dispatch, SetStateAction } from 'react';
import { FilterTypes, IFilterValue } from '../types';

export const changeCheckboxFilter = (
  filterType: string,
  filterValue: IFilterValue,
  setFilterValue: Dispatch<SetStateAction<IFilterValue>>): void => {

  if (filterValue) {
    switch (filterType) {
      case FilterTypes.Popular : 
        filterValue.checkPopular = !filterValue.checkPopular;
        break;
      case FilterTypes.ViewBasket : 
        filterValue.checkBasket = !filterValue.checkBasket;
        break;
      case FilterTypes.MensClothe : 
        filterValue.categoryMenclo = !filterValue.categoryMenclo;
        break;
      case FilterTypes.WomensClothe : 
        filterValue.categoryWomenclo = !filterValue.categoryWomenclo;
        break;
      case FilterTypes.Jewelery : 
        filterValue.categoryJuw = !filterValue.categoryJuw;
        break;
      case FilterTypes.Electronics : 
        filterValue.categoryElec = !filterValue.categoryElec;
        break;
      default: 
        break;
    }
    setFilterValue!({ ...filterValue });
  }
};
