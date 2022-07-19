import { Dispatch, SetStateAction } from "react";

export interface IProduct {
  category: string;
  description?: string;
  id: number;
  image?: string;
  price: number;
  rating?: { rate: number; count: number };
  title: string;
}

export interface IContext {
    addToCart: funcAddToCart;
    cart: IProduct[];
    setCart: setCartState;
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export type setCartState = Dispatch<SetStateAction<IProduct[]>>;

export interface ICartState {
  cart: IProduct[];
  setCart: setCartState;
}

export type funcAddToCart =  (product: IProduct, cart:IProduct[], setCart:setCartState, findIndex: number) => void;