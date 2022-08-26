import { FC, useContext } from 'react';

import { Context } from '../../StoreContext';
import { ICatalogItem } from '../../types';
import { THREE_WORDS_TITLE } from '../../constants';
import { removeFromCart } from '../../utilities';
import star from './../../assets/svg/star.svg';

export const CatalogItem: FC<ICatalogItem> = function ({ product }) {
  const shortTitle =   product.title.split(' ').slice(0, THREE_WORDS_TITLE).join(' ');
  product.title = shortTitle;

  const { id, image, title, price, category, rating } = product;

  const { addToCart, cart, setCart } = useContext(Context);

  const findProduct = cart?.find((elem):boolean => elem.id === id);

  return (
    <li className={findProduct ? 'catalog__item active' : 'catalog__item'}>
      <div className="catalog__item__img">
        <img src={image} alt={title} />
      </div>
      <div className="catalog__caption">
        <div className="catalog__caption__title">{title}</div>
        <div className="catalog__caption__subtitle">{category}</div>
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
        {findProduct && 
          <button 
            id={String(id) + 'del'} 
            onClick={()=>{removeFromCart!(cart!, setCart!, findProduct);}} 
            className="catalog__caption__btn catalog__caption__btn-del" 
            title="Remove from cart">
              -
          </button> 
        }
        <button 
          id={String(id)} 
          onClick={()=>{addToCart!(product, cart!, setCart!, findProduct!);}} 
          className="catalog__caption__btn" title="Add to cart">+</button>
      </div>
    </li>
  );
};
