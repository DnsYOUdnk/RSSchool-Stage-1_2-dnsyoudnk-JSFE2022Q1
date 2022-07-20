import { IFilterModal } from "../../types";
import RangeSlider from "../RangeSlider/RangeSlider";
import "./filterModal.css";

export const FilterModal = ({
  setShowFilterModal,
  setFilterValue,
  filterValue,
}: IFilterModal) => {
  const closeFilterModal = (): void => {
    setShowFilterModal(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const clickFilter = (value: string): void => {
    setFilterValue(value);
    console.log(value)
  };

  return (
    <div
      className="filter__modal"
      onClick={() => {
        closeFilterModal();
      }}
    >
      <div className="filter__modal__body" onClick={(e) => handleClick(e)}>
        <h3>Sorting panel</h3>
        <div className="filter__sort">
          <select name="sort-element" id="sort_element" >
            <option value="A-Z">By name, from A to Z</option>
            <option value="Z-A">By name, from Z to A</option>
            <option value="Max">By price, from max to min</option>
            <option value="Min">By price, from min to max</option>
          </select>
        </div>
        <div className="filter__range__items">
          <div className="filter__range__item">
            <label htmlFor="range_price">Price range</label>
            <RangeSlider valueRange={1000} markRange={'$'}/>
          </div>
          <div className="filter__range__item">
            <label htmlFor="range_count">Count range</label>
            <RangeSlider valueRange={700} markRange={'pieces'}/>
          </div>
        </div>
        <div className="filter__value">
          <div className="filter__value__categories">
            <div className="filter__value__item">
              <label>
                Clothes <input type="checkbox" name="clothes_product" id="clothes_product" />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Men's Clothes <input type="checkbox" name="men_product" id="men_product" />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Women's Clothes <input type="checkbox" name="women_product" id="women_product" />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Accessories <input type="checkbox" name="accessories_product" id="accessories_product" />
              </label>
            </div>
            <div className="filter__value__item">
              <label>
                Electronics <input type="checkbox" name="electronics_product" id="electronics_product" />
              </label>
            </div>
          </div>
          <div className="filter__value__popular">
            <label>
              Popular products <input type="checkbox" name="popular_product" id="popular_product" />
            </label>
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
    </div>
  );
};
