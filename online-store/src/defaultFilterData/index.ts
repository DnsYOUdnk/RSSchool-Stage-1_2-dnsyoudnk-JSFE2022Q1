import { IFilterValue } from "../types";

export const defaultFilterValue: IFilterValue = {
  sort: "A-Z",
  priceRange: [0, 1000],
  countRange: [0, 700],
  checkPopular: false,
  checkBasket: false,
  categoryMenclo: false,
  categoryWomenclo: false,
  categoryJuw: false,
  categoryElec: false
};
