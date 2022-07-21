import { IFilterValue } from "../types";

export const defaultFilterValue: IFilterValue = {
  sort: "A-Z",
  priceRange: [0, 1000],
  countRange: [0, 700],
  checkPopular: false,
  checkBasket: false,
  categories: [
    { id: 1, name: "Men's clothing", checked: false },
    { id: 2, name: "Women's clothing", checked: false },
    { id: 3, name: "Jewelery", checked: false },
    { id: 4, name: "Electronics", checked: false },
  ],
};
