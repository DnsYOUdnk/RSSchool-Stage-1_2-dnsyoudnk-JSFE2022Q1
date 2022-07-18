import left from "./../../assets/svg/left.svg";
import right from "./../../assets/svg/right.svg";
import star from "./../../assets/svg/star.svg";
import './Catalog.css';

export const Catalog = function() {
    return (
    <>
      <div className="main__nav">
        <div className="main__filter">
          <div className="main__filter__name">All products</div>
          <button className="main__filter__btn" title="Filters"></button>
        </div>
        <div className="main__setting__btn">
          <button className="main__setting__btn-prev" ><img src={left} alt="left"/></button>
          <button className="main__setting__btn-next" ><img src={right} alt="right"/></button>
        </div>
      </div> 
      <div className="catalog">
        <ul className="catalog__items">
          <li className="catalog__item">
                <div className="catalog__item__img"><img src="https://via.placeholder.com/150" alt="umg"/></div>
                <div className="catalog__caption">
                  <div className="catalog__caption__name">title</div>
                  <div className="catalog__caption__subname">category</div>
                  <div className="catalog__caption__intellegence">
                    <div className="catalog__caption__rating">Rating reviews: <span>1 <img src={star} alt="star" /></span></div>
                    <div className="catalog__caption__count">Available in stock: 12</div>
                  </div>
                  <div className="catalog__caption__price">10 $</div>
                  <button className="catalog__caption__btn">+</button>
                </div>
          </li>
          <li className="catalog__item">
                <div className="catalog__item__img"><img src="https://via.placeholder.com/150" alt="umg"/></div>
                <div className="catalog__caption">
                  <div className="catalog__caption__name">title</div>
                  <div className="catalog__caption__subname">category</div>
                  <div className="catalog__caption__intellegence">
                    <div className="catalog__caption__rating">Rating reviews: <span>1 <img src={star} alt="star" /></span></div>
                    <div className="catalog__caption__count">Available in stock: 12</div>
                  </div>
                  <div className="catalog__caption__price">10 $</div>
                  <button className="catalog__caption__btn">+</button>
                </div>
          </li>
          <li className="catalog__item">
                <div className="catalog__item__img"><img src="https://via.placeholder.com/150" alt="umg"/></div>
                <div className="catalog__caption">
                  <div className="catalog__caption__name">title</div>
                  <div className="catalog__caption__subname">category</div>
                  <div className="catalog__caption__intellegence">
                    <div className="catalog__caption__rating">Rating reviews: <span>1 <img src={star} alt="star" /></span></div>
                    <div className="catalog__caption__count">Available in stock: 12</div>
                  </div>
                  <div className="catalog__caption__price">10 $</div>
                  <button className="catalog__caption__btn">+</button>
                </div>
          </li>
          <li className="catalog__item">
                <div className="catalog__item__img"><img src="https://via.placeholder.com/150" alt="umg"/></div>
                <div className="catalog__caption">
                  <div className="catalog__caption__name">title</div>
                  <div className="catalog__caption__subname">category</div>
                  <div className="catalog__caption__intellegence">
                    <div className="catalog__caption__rating">Rating reviews: <span>1 <img src={star} alt="star" /></span></div>
                    <div className="catalog__caption__count">Available in stock: 12</div>
                  </div>
                  <div className="catalog__caption__price">10 $</div>
                  <button className="catalog__caption__btn">+</button>
                </div>
          </li>
          <li className="catalog__item">
                <div className="catalog__item__img"><img src="https://via.placeholder.com/150" alt="umg"/></div>
                <div className="catalog__caption">
                  <div className="catalog__caption__name">title</div>
                  <div className="catalog__caption__subname">category</div>
                  <div className="catalog__caption__intellegence">
                    <div className="catalog__caption__rating">Rating reviews: <span>1 <img src={star} alt="star" /></span></div>
                    <div className="catalog__caption__count">Available in stock: 12</div>
                  </div>
                  <div className="catalog__caption__price">10 $</div>
                  <button className="catalog__caption__btn">+</button>
                </div>
          </li>
        </ul>
      </div>
    </>
    )
}