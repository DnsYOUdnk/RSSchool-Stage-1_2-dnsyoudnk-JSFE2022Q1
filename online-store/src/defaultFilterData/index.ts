import { IFilterValue, SortFilterTypes } from '../types';
import { MAX_PRICE_VALUE, MIN_QUANTITY_VALUE, MAX_QUANTITY_VALUE, MIN_PRICE_VALUE } from './../constants/index';

export const defaultFilterValue: IFilterValue = {
  sort: SortFilterTypes.ASC,
  priceRange: [MIN_PRICE_VALUE, MAX_PRICE_VALUE],
  countRange: [MIN_QUANTITY_VALUE, MAX_QUANTITY_VALUE],
  checkPopular: false,
  checkBasket: false,
  categoryMenclo: false,
  categoryWomenclo: false,
  categoryJuw: false,
  categoryElec: false,
};
