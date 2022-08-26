import { useContext, useEffect, useRef, useState } from 'react';
import { MIN_POPULAR_RATING } from '../../constants';
import { useGetProductsData } from '../../customHooks/useGetProductsData';
import { Context } from '../../StoreContext';
import { IProduct } from '../../types';
import { handlePrevNext } from '../../utilities/handlePrevNext';
import { sortCategories } from '../../utilities/sortCategories';
import { sortProducts } from '../../utilities/sortProducts';
import { CatalogItem } from '../CatalogItem/CatalogItem';
import { FilterModal } from '../FilterModal/FilterModal';
import { Loader } from '../Loader/Loader';
import { NotFoundData } from '../NotFoundData/NotFoundData';
import left from './../../assets/svg/left.svg';
import right from './../../assets/svg/right.svg';
import './Catalog.css';

export const Catalog = function () {
  const productList = useRef<HTMLUListElement>(null);
  const { searchValue, filterValue, cart } = useContext(Context);
  const data = useGetProductsData();
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<IProduct[]>([]);
  
  useEffect(() => {
    if (!filterValue) return;
    const sortData = sortProducts(data, filterValue.sort);

    const filterArr = sortData
      .filter(({ title }) => {
        return  title.toLowerCase().includes(searchValue?.toLowerCase() ?? '');
      })
      .filter(({ price }) => {
        return  Math.min(...filterValue.priceRange) <= price && Math.max(...filterValue.priceRange) > price;
      })
      .filter(({ rating }) => {
        const count = rating.count;
        return Math.min(...filterValue.countRange) <= count && Math.max(...filterValue.countRange) > count;
      })
      .filter(({ rating }) => {
        return filterValue.checkPopular ? rating.rate > MIN_POPULAR_RATING : true;
      })
      .filter(({ id }) => {
        const inBasket = !!(cart?.find((elem) => {
          return elem.id === id;
        }));
        return filterValue.checkBasket ? inBasket : true;
      })
      .filter(({ category }) => {
        const arrCategories = sortCategories(filterValue);
        return arrCategories.length > 0 ? arrCategories.includes(category) : true;
      });

    localStorage.setItem('filterValue', JSON.stringify(filterValue));
    setFilterData(filterArr);

  }, [filterValue, cart, data, searchValue]);

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  return (
    <>
      <div className="main__nav">
        <div className="main__filter">
          <div className="main__filter__name">All products</div>
          <button className="main__filter__btn" title="Filters" onClick={() => {openFilterModal();}}></button>
          {showFilterModal && <FilterModal setShowFilterModal={setShowFilterModal} />}
        </div>
        <div className="main__setting__btn">
          <button
            className="main__setting__btn-prev"
            title="previous product"
            onClick={() => handlePrevNext(productList, 'prev')}
          >
            <img src={left} alt="left" />
          </button>
          <button
            className="main__setting__btn-next"
            title="next product"
            onClick={() => handlePrevNext(productList, 'next')}
          >
            <img src={right} alt="right" />
          </button>
        </div>
      </div>
      <div className="catalog">
        {data.length > 0 ? (
          <ul ref={productList} className="catalog__items">
            {filterData.length > 0 ?
              filterData.map((product, index) => {
                return <CatalogItem key={index} product={product} />;
              }) : <NotFoundData />
            } 
          </ul>
        ) : <Loader />
        }
      </div>
    </>
  );
};
