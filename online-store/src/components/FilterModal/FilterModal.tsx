import { useContext } from "react";
import { Context } from "../../StoreContext";
import { IFilterModal } from "../../types";
import { FilterChek } from "../FilterCheck/FilterCheck";
import RangeSlider from "../RangeSlider/RangeSlider";
import "./filterModal.css";

export const FilterModal = ({setShowFilterModal}: IFilterModal) => {

  const { filterValue, setFilterValue } = useContext(Context);

  const closeFilterModal = (): void => {
    setShowFilterModal(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const clickSortFilter = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if(filterValue) {
      filterValue.sort = event.currentTarget.value;
      setFilterValue!({...filterValue});
    }
  };

  const clickPopularFilter = (): void => {
    if(filterValue) {
      filterValue.checkPopular = !filterValue.checkPopular;
      setFilterValue!({...filterValue});
    }
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
            {filterValue!.categories.map(({id, name, checked}, index) => {
              return (
                <FilterChek id={id} name={name} checked={checked} key={index} />
              )
            })}
          </div>
          <div className="filter__value__popular">
            <label>
              Popular products <input type="checkbox" name="popular_product" defaultChecked={filterValue!.checkPopular} id="popular_product" onClick={() => clickPopularFilter()}/>
            </label>
          </div>
        </div>
        <div className="filter__buttons">
          <div className="filter__buttons_reset">
            <button className="btn__res">Reset filters</button>
          </div>
          <div className="filter__buttons_reset">
            <button className="btn__res btn__res-all">Reset all</button>
          </div>
        </div>
      </div>
    </div>
  );
};
