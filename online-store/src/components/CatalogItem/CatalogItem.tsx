import star from "./../../assets/svg/star.svg";

export const CatalogItem = function ({product}) {

  let {id, image, title, price, category, rating} = product;
  title = title.split(' ').slice(0,3).join(' ');

  return (
    <li className="catalog__item">
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
        <button className="catalog__caption__btn">+</button>
      </div>
    </li>
  );
};
