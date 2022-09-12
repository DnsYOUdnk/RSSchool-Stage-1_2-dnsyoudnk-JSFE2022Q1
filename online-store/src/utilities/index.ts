import { IProduct, SetCartState } from '../types';
import { defaultFilterValue } from '../defaultFilterData';

export const getCartData = (): IProduct[] => {
  const value = localStorage.getItem('cart');
  return value && typeof value === 'string'
    ? JSON.parse(value)
    : [];
};

export const addToCart = (product: IProduct, cart:IProduct[], setCart:SetCartState, findProduct: IProduct): void => {

  const quantityProduct: number = cart.reduce((sum, { count }) => sum + count!, 0);

  if (quantityProduct >= 20) {
    alert('Sorry, all slots are full');
  } else if (findProduct) {
    findProduct.count!++;
  } else {
    product.count = 1;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  setCart([...cart]);
};

export const removeFromCart = ( cart:IProduct[], setCart:SetCartState, findProduct: IProduct): void => {
  let changeCart = cart;
  if (findProduct.count !== 1) {
    findProduct.count!--;
  } else {
    changeCart = cart.filter(({ id }) => id !== findProduct.id);
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
