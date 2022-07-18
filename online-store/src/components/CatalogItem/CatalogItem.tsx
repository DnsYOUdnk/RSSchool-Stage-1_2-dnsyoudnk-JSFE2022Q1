import { useContext } from "react";
import { Context } from "../../StoreContext";
import star from "./../../assets/svg/star.svg";

export const CatalogItem = function ({product}) {

  let {id, image, title, price, category, rating} = product;
  title = title.split(' ').slice(0,3).join(' ');

  
  const { addToCart, cart, setCart } = useContext(Context);

  return (
    <li className={product.cart ? "catalog__item" : "catalog__item active"}>
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
        <button id={id} onClick={()=>{addToCart(product, cart, setCart)}} className="catalog__caption__btn" title="Add to cart">{product.cart ? '-' : '+'}</button>
      </div>
    </li>
  );
};
