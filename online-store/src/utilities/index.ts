import { IProduct, setCartState } from "../types";

export const getCartData = (): IProduct[] => {
  const value = localStorage.getItem("cart");
  return value && typeof value === "string"
    ? JSON.parse(value)
    : [];
};

export const addToCart = (product: IProduct, cart:IProduct[], setCart:setCartState, findIndex: number): void => {

  if (findIndex !== -1) {
    cart = cart.filter((_: IProduct, id: number) => id !== findIndex);
  } else if (cart.length < 20) {
    cart.push(product);
  } else {
    alert("Sorry, all slots are full");
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  setCart([...cart]);
}
