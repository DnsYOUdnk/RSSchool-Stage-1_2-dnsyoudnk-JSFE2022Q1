import { useContext } from "react";
import { Context } from "../../StoreContext";
import { IFilterChek } from "../../types";

export const FilterChek = ({ id, name, checked }: IFilterChek) => {

  const { filterValue, setFilterValue } = useContext(Context);

  const clickCategoriesFilter = (): void => {
    if(!filterValue) return;
    let newArr = filterValue!.categories.map((category) => {
        if(category.id === id) {
          category.checked = !category.checked
        }
        return category
      });

      filterValue!.categories = newArr;
      
      setFilterValue!({...filterValue});
  };

  return (
    <div className="filter__value__item">
      <label>
        {name}
        <input type="checkbox" defaultChecked={checked} name={"product" + id} onClick={() => clickCategoriesFilter()} />
      </label>
    </div>
  );
};
