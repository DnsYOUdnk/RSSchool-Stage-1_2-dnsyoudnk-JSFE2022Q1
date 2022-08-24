import { useContext } from 'react';
import { defaultFilterValue } from '../../defaultFilterData';
import { Context } from '../../StoreContext';
import { IFilterModal } from '../../types';
import RangeSlider from '../RangeSlider/RangeSlider';
import './filterModal.css';

export const FilterModal = ({ setShowFilterModal }: IFilterModal) => {

  const { filterValue, setFilterValue } = useContext(Context);

  const closeFilterModal = (): void => {
    setShowFilterModal(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const clickSortFilter = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (filterValue) {
      filterValue.sort = event.currentTarget.value;
      setFilterValue!({ ...filterValue });
    }
  };

  const clickAddFilter = (filterType: string): void => {
    if (filterValue) {
      switch (filterType) {
        case 'popular' : 
          filterValue.checkPopular = !filterValue.checkPopular;
          break;
        case 'viewBasket' : 
          filterValue.checkBasket = !filterValue.checkBasket;
          break;
        case 'mens clothing' : 
          filterValue.categoryMenclo = !filterValue.categoryMenclo;
          break;
        case 'womens clothing' : 
          filterValue.categoryWomenclo = !filterValue.categoryWomenclo;
          break;
        case 'jewelery' : 
          filterValue.categoryJuw = !filterValue.categoryJuw;
          break;
        case 'electronics' : 
          filterValue.categoryElec = !filterValue.categoryElec;
          break;
        default: 
          break;
      }
      setFilterValue!({ ...filterValue });
    }
  };

  const resetFilter = ():void => {
    if (filterValue) {
      defaultFilterValue.sort = filterValue.sort;
      localStorage.setItem('filterValue', JSON.stringify(defaultFilterValue));
      setFilterValue!({ ...defaultFilterValue });
    }
    setShowFilterModal(false);
  };

  const demolitionFilter = (): void => {
    const newData = defaultFilterValue;
    localStorage.clear();
    window.location.reload();
    setFilterValue!({ ...newData });
  };

  return (
    <div className="filter__modal" onClick={() => { closeFilterModal(); }}>
      <div className="filter__modal__body" onClick={(e) => handleClick(e)}>
        <h3 className="filter__modal__title">Sorting panel</h3>
        <div className="filter__sort">
          <span>Choose the type of sorting</span>
          <select name="sort-element" value={filterValue ? filterValue.sort : 'A-Z'} className="sort_element" onChange={(e) => clickSortFilter(e)}>
            <option value="A-Z">By name, from A to Z</option>
            <option value="Z-A">By name, from Z to A</option>
            <option value="Max">By price, from max to min</option>
            <option value="Min">By price, from min to max</option>
          </select>
        </div>
        <div className="filter__range__items">
          <div className="filter__range__item">
            <span>Price range:</span>
            <RangeSlider maxValue={1000} valueRange={filterValue ? filterValue.priceRange : [0, 1000]} markRange={'$'}/>
          </div>
          <div className="filter__range__item">
            <span>Count range:</span>
            <RangeSlider maxValue={700} valueRange={filterValue ? filterValue.countRange : [0, 700]} markRange={'pc.'}/>
          </div>
        </div>
        <div className="filter__value">
          <div className="filter__value__categories">
            <div className="filter__value__item">
              <label>
                Men's clothing
                <input type="checkbox" 
                  defaultChecked={filterValue!.categoryMenclo} 
                  name={'mens_product'} 
                  id="mens_product" 
                  onClick={() => clickAddFilter('mens clothing')} />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Women's clothing
                <input type="checkbox" 
                  defaultChecked={filterValue!.categoryWomenclo} 
                  name={'womens_product'} 
                  id="womens_product" 
                  onClick={() => clickAddFilter('womens clothing')} />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Jewelery
                <input type="checkbox" 
                  defaultChecked={filterValue!.categoryJuw} 
                  name={'jewelery_product'} 
                  id="jewelery_product" 
                  onClick={() => clickAddFilter('jewelery')} />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Electronics
                <input type="checkbox" 
                  defaultChecked={filterValue!.categoryElec} 
                  name={'electronics_product'} 
                  id="electronics_product" 
                  onClick={() => clickAddFilter('electronics')} />
              </label>
            </div>
          </div>
          <div className="filter__value__popular">
            <label>
              Popular products <input type="checkbox" name="popular_product" defaultChecked={filterValue!.checkPopular} id="popular_product" onClick={() => clickAddFilter('popular')}/>
            </label>
          </div>
          <div className="filter__value__popular">
            <label>
              Products in the basket <input type="checkbox" name="basket_product" defaultChecked={filterValue!.checkBasket} id="basket_product" onClick={() => clickAddFilter('viewBasket')}/>
            </label>
          </div>
        </div>
        <div className="filter__buttons">
          <div className="filter__buttons_reset">
            <button className="btn__res" onClick={() => resetFilter()}>Reset filters</button>
          </div>
          <div className="filter__buttons_reset">
            <button className="btn__res btn__res-all" onClick={() => demolitionFilter()}>Reset all</button>
          </div>
        </div>
      </div>
    </div>
  );
};
