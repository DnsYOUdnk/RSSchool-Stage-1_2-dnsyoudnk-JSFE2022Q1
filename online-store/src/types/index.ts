import { Dispatch, SetStateAction } from "react";

export interface IProduct {
  category: string;
  description?: string;
  id: number;
  image?: string;
  price: number;
  rating?: { rate: number; count: number };
  title: string;
  count?: number;
}

export interface IContext {
    addToCart: funcAddToCart;
    cart: IProduct[];
    setCart: setCartState;
    filterValue: IFilterValue; 
    setFilterValue: Dispatch<SetStateAction<IFilterValue>>;
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export type setCartState = Dispatch<SetStateAction<IProduct[]>>;

export interface ICartState {
  cart: IProduct[];
  setCart: setCartState;
}

export type funcAddToCart =  (product: IProduct, cart:IProduct[], setCart:setCartState, findIndex: number) => void;

export interface IFilterModal {
  setShowFilterModal: Dispatch<SetStateAction<boolean>>;
}

export interface IFilterValue {
  sort: string;
  priceRange: number[];
  countRange: number[];
  checkPopular: boolean;
  checkBasket: boolean;
  categoryMenclo: boolean;
  categoryWomenclo: boolean;
  categoryJuw: boolean;
  categoryElec: boolean;
}
