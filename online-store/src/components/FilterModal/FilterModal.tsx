import { MouseEvent, useContext } from 'react';
import { Context } from '../../StoreContext';
import { IFilterModal } from '../../types';
import { defaultFilterValue } from '../../defaultFilterData';
import RangeSlider from '../RangeSlider/RangeSlider';
import './filterModal.css';
import { clickAddFilter } from '../../utilities/changeCheckboxFilter';

export const FilterModal = ({ setShowFilterModal }: IFilterModal) => {
  const { filterValue, setFilterValue } = useContext(Context);

  const closeFilterModal = (e: MouseEvent): void => {
    const eventTarget = e.target as HTMLDivElement;
    if (eventTarget.classList.contains('filter__modal')) setShowFilterModal(false);
  };

  const clickSortFilter = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (filterValue) {
      filterValue.sort = event.currentTarget.value;
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
    <div className="filter__modal" onClick={(e) => closeFilterModal(e) }>
      <div className="filter__modal__body">
        <h3 className="filter__modal__title">Sorting panel</h3>
        <div className="filter__sort">
          <span>Choose the type of sorting</span>
          <select 
            name="sort-element" 
            value={filterValue ? filterValue.sort : 'A-Z'} 
            className="sort_element" 
            onChange={(e) => clickSortFilter(e)}>
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
                Men&apos;s clothing
                <input type="checkbox" 
                  defaultChecked={filterValue!.categoryMenclo} 
                  name={'mens_product'} 
                  id="mens_product" 
                  onClick={() => clickAddFilter("men's clothing", filterValue!, setFilterValue!)} />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Women&apos;s clothing
                <input type="checkbox" 
                  defaultChecked={filterValue!.categoryWomenclo} 
                  name={'womens_product'} 
                  id="womens_product" 
                  onClick={() => clickAddFilter("women's clothing", filterValue!, setFilterValue!)} />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Jewelery
                <input type="checkbox" 
                  defaultChecked={filterValue!.categoryJuw} 
                  name={'jewelery_product'} 
                  id="jewelery_product" 
                  onClick={() => clickAddFilter('jewelery', filterValue!, setFilterValue!)} />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Electronics
                <input type="checkbox" 
                  defaultChecked={filterValue!.categoryElec} 
                  name={'electronics_product'} 
                  id="electronics_product" 
                  onClick={() => clickAddFilter('electronics', filterValue!, setFilterValue!)} />
              </label>
            </div>
          </div>
          <div className="filter__value__popular">
            <label>
              Popular products
              <input type="checkbox"
                name="popular_product"
                defaultChecked={filterValue!.checkPopular}
                id="popular_product"
                onClick={() => clickAddFilter('popular', filterValue!, setFilterValue!)}/>
            </label>
          </div>
          <div className="filter__value__popular">
            <label>
              Products in the basket
              <input 
                type="checkbox"
                name="basket_product"
                defaultChecked={filterValue!.checkBasket}
                id="basket_product"
                onClick={() => clickAddFilter('viewBasket', filterValue!, setFilterValue!)}/>
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
