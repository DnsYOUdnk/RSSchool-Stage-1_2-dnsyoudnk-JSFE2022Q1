import { defaultFilterValue } from '../defaultFilterData';
import { IProduct, SetCartState } from '../types';

export const getCartData = (): IProduct[] => {
  const value = localStorage.getItem('cart');
  return value && typeof value === 'string'
    ? JSON.parse(value)
    : [];
};

export const addToCart = (product: IProduct, cart:IProduct[], setCart:SetCartState, findIndex: number): void => {

  const quantityProduct: number = cart.reduce((sum, { count }) => sum + count!, 0);

  if (quantityProduct >= 20) {
    alert('Sorry, all slots are full');
  } else if (findIndex !== -1) {
    cart[findIndex].count!++;
  } else {
    product.count = 1;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  setCart([...cart]);
};

export const removeFromCart = ( cart:IProduct[], setCart:SetCartState, findIndex: number): void => {
  let changeCart = cart;
  if (changeCart[findIndex].count !== 1) {
    changeCart[findIndex].count!--;
  } else {
    changeCart = cart.filter((_: IProduct, id: number) => id !== findIndex);
  }

  localStorage.setItem('cart', JSON.stringify(changeCart));
  setCart([...changeCart]);
};

export const getFiltersValue = () => {
  const filterValue = localStorage.getItem('filterValue');
  return filterValue && typeof filterValue === 'string'
    ? JSON.parse(filterValue)
    : { ...defaultFilterValue };
};
