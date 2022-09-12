import { Dispatch, SetStateAction } from 'react';

export interface IProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
  count?: number;
}

export interface IContext {
  addToCart: FuncAddToCart;
  cart: IProduct[];
  setCart: SetCartState;
  filterValue: IFilterValue; 
  setFilterValue: Dispatch<SetStateAction<IFilterValue>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export type SetCartState = Dispatch<SetStateAction<IProduct[]>>;

export interface ICartState {
  cart: IProduct[];
  setCart: SetCartState;
}

export type FuncAddToCart =  (product: IProduct, cart:IProduct[], setCart:SetCartState, findProduct: IProduct) => void;

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
export interface ICatalogItem {
  product: IProduct;
}

export enum FilterTypes {
  Popular = 'popular',
  ViewBasket = 'viewBasket',
  MensClothe = "men's clothing",
  WomensClothe = "women's clothing",
  Jewelery = 'jewelery',
  Electronics = 'electronics',
}

export enum SliderMark {
  MoneyСurrency = '$',
  Piece = 'pc.',
}

export enum SortFilterTypes {
  ASC = 'A-Z',
  DESC = 'Z-A',
  MaxPrice = 'Max',
  MinPrice = 'Min',
}

export enum MoveElements {
  Previous = 'prev',
  Next = 'next',
}