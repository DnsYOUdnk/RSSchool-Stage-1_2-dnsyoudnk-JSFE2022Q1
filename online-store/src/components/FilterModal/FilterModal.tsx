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
          <select name="sort-element" id="sort_element">
            <option value="A-Z">By name, from A to Z</option>
            <option value="Z-A">By name, from Z to A</option>
            <option value="Max">By price, from max to min</option>
            <option value="Min">By price, from min to max</option>
          </select>
        </div>
        <div className="filter__range__items">
          <div className="filter__range__item">
            <label htmlFor="range_price">Price range</label>
            <div>
            <RangeSlider valueRange={1000}/>
            </div>
          </div>
          <div className="filter__range__item">
            <label htmlFor="range_count">Count range</label>
            <RangeSlider valueRange={700}/>
          </div>
        </div>
        <div className="filter__value">
          <label>
            <input
              type="radio"
              defaultChecked={filterValue === "default" ? true : false}
              onClick={() => {
                clickFilter("default");
              }}
              name="filter"
            />
            По умолчанию
          </label>
          <label>
            <input
              type="radio"
              defaultChecked={filterValue === "abs" ? true : false}
              onClick={() => {
                clickFilter("abs");
              }}
              name="filter"
            />
            По Возрастанию
          </label>
          <label>
            <input
              type="radio"
              defaultChecked={filterValue === "desc" ? true : false}
              onClick={() => {
                clickFilter("desc");
              }}
              name="filter"
            />
            По Убыванию
          </label>
        </div>
      </div>
    </div>
  );
};
