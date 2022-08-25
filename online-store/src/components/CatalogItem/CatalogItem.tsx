import { FC, useContext } from 'react';
import { Context } from '../../StoreContext';
import { IProduct } from '../../types';
import { removeFromCart } from '../../utilities';
import star from './../../assets/svg/star.svg';

interface ICatalogItem {
  product: IProduct;
}

export const CatalogItem: FC<ICatalogItem> = function ({ product }) {

  const { id, image, title, price, category, rating } = product;
  const shortTitle = title.split(' ').slice(0, 3).join(' ');

  const { addToCart, cart, setCart } = useContext(Context);
  
  const findIndex: number = cart!.findIndex((elem):boolean => elem.id === id );

  return (
    <li className={findIndex !== -1 ? 'catalog__item active' : 'catalog__item'}>
      <div className="catalog__item__img">
        <img src={image} alt="umg" />
      </div>
      <div className="catalog__caption">
        <div className="catalog__caption__name">{shortTitle}</div>
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
        {findIndex !== -1 ? 
          <button 
            id={String(id) + 'del'} 
            onClick={()=>{removeFromCart!(cart!, setCart!, findIndex);}} 
            className="catalog__caption__btn catalog__caption__btn-del" 
            title="Remove from cart">-</button> 
          : ''}
        <button 
          id={String(id)} 
          onClick={()=>{addToCart!(product, cart!, setCart!, findIndex);}} 
          className="catalog__caption__btn" title="Add to cart">+</button>
      </div>
    </li>
  );
};
