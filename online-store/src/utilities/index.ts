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

export const getFiltersValue = () => {
  const defaultFilterValue = {
    sort: "A-Z",
    priceRange: [0, 1000],
    countRange: [0, 700],
    checkPopular: false,
    checkBasket: false,
    categories: [
      {id: 1,name: "Men's clothing", checked: false}, 
      {id: 2,name: "Women's clothing", checked: false}, 
      {id: 3,name: "Jewelery", checked: false}, 
      {id: 4,name: "Electronics", checked: false}
    ]
  }
  const filterValue = localStorage.getItem("filterValue");
  return filterValue && typeof filterValue === "string"
    ? JSON.parse(filterValue)
    : defaultFilterValue;
}
