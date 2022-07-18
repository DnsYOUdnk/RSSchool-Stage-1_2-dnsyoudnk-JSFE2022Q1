import { useContext } from "react";
import { Context } from "../../StoreContext";
import star from "./../../assets/svg/star.svg";

export const CatalogItem = function ({product}) {

  let {id, image, title, price, category, rating} = product;
  title = title.split(' ').slice(0,3).join(' ');

  
  const { addToCart, cart, setCart } = useContext(Context);
  
  let findIndex = cart.findIndex(({id}) => id === product.id );

  return (
    <li className={findIndex !== -1 ? "catalog__item active" : "catalog__item"}>
      <div className="catalog__item__img">
        <img src={image} alt="umg" />
      </div>
      <div className="catalog__caption">
        <div className="catalog__caption__name">{title}</div>
        <div className="catalog__caption__subname">{category}</div>
        <div className="catalog__caption__intellegence">
          <div className="catalog__caption__rating">
            Rating reviews:
            <span>
              {rating.rate} <img src={star} alt="star" />
            </span>
          </div>
          <div className="catalog__caption__count">Available in stock: {rating.count}</div>
        </div>
        <div className="catalog__caption__price">{price} $</div>
        <button id={id} onClick={()=>{addToCart(product, cart, setCart, findIndex)}} className="catalog__caption__btn" title="Add to cart">{findIndex !== -1 ? '-' : '+'}</button>
      </div>
    </li>
  );
};
