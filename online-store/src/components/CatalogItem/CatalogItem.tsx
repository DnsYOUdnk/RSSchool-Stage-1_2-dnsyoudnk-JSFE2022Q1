import { FC, useContext } from "react";
import { Context } from "../../StoreContext";
import { IProduct } from "../../types";
import star from "./../../assets/svg/star.svg";

interface ICatalogItem {
  product: IProduct;
}

export const CatalogItem: FC<ICatalogItem> = function ({product}) {

  let {id, image, title, price, category, rating} = product;
  title = title.split(' ').slice(0,3).join(' ');

  const { addToCart, cart, setCart } = useContext(Context);
  
  let findIndex: number = cart!.findIndex(({id}:{id: number}):boolean => id === product.id );

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
              {rating ? rating.rate : 0} <img src={star} alt="star" />
            </span>
          </div>
          <div className="catalog__caption__count">Available in stock: {rating ? rating.count : 0 }</div>
        </div>
        <div className="catalog__caption__price">{price} $</div>
        <button id={String(id)} onClick={()=>{addToCart!(product, cart!, setCart!, findIndex)}} className="catalog__caption__btn" title="Add to cart">{findIndex !== -1 ? '-' : '+'}</button>
      </div>
    </li>
  );
};
