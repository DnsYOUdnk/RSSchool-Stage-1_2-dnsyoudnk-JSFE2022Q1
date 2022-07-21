import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../StoreContext";
import { IProduct } from "../../types";
import { CatalogItem } from "../CatalogItem/CatalogItem";
import { FilterModal } from "../FilterModal/FilterModal";
import { NotFoundData } from "../NotFoundData/NotFoundData";
import left from "./../../assets/svg/left.svg";
import right from "./../../assets/svg/right.svg";
import "./Catalog.css";

export const Catalog = function () {
  const ul = useRef<HTMLUListElement>(null);
  const { searchValue, filterValue, cart } = useContext(Context);

  const [data, setData] = useState<IProduct[]>([]);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<IProduct[]>([]);

  const handlePrevNext = (direction: string) => {
    const li = null !== ul.current ? ([...ul.current.children] as HTMLLIElement[]) : [];
    const liFirst: HTMLLIElement = li[0];
    const liFirstWidth: number = liFirst.offsetWidth;
    const liFirstMR: number = parseInt(
      window.getComputedStyle(liFirst).marginRight
    );
    const liFirstML: number = Math.abs(
      parseInt(window.getComputedStyle(liFirst).marginLeft)
    );
    const liFullWidth: number = liFirstWidth + liFirstMR;
    const breakPoint: number =
      liFullWidth * li.length -
      (null !== ul.current ? ul.current.offsetWidth : 0);

    let ml: number = 0;

    if (liFirstML < breakPoint + liFullWidth) {
      ml = liFirstML + (direction === "next" ? 1 : -1) * liFullWidth;
    }

    liFirst.style.marginLeft = `-${ml}px`;
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json: IProduct[]): void => {
        setData([...json]);
        setFilterData([...json]);
      });
  }, []);
  
  useEffect(() => {
    if(!filterValue) return;
    let sortData = data;

    if(filterValue.sort === 'Min'){
      sortData = sortData.sort((a,b)=>{
        return a.price - b.price
      })
    } else if (filterValue.sort === 'Max') {
      sortData = data.sort((a,b)=>{
        return b.price - a.price
      })
    } else if (filterValue.sort === 'A-Z'){
      sortData = data.sort((a,b)=>{
        return a.title.split('')[0].charCodeAt(0) - b.title.split('')[0].charCodeAt(0)
      })
    } else if (filterValue.sort === 'Z-A'){
      sortData = data.sort((a,b)=>{
        return b.title.split('')[0].charCodeAt(0) - a.title.split('')[0].charCodeAt(0)
      })
    }
    setData(sortData)

    let arrCategories: string[] = ["men's clothing", "women's clothing", "jewelery", "electronics"]
    arrCategories = arrCategories.filter((value: string):boolean => {
      if(value === "men's clothing") {
        return filterValue.categoryMenclo
      } else if (value === "women's clothing") {
        return filterValue.categoryWomenclo
      } else if (value === "jewelery") {
        return filterValue.categoryJuw
      } else if (value === "electronics") {
        return filterValue.categoryElec
      } else {
        return false
      }
    })

    let filterArr = data.filter(({ title }) => {
       return  title.split(' ').slice(0,3).join(' ').toLowerCase().includes(searchValue!.toLowerCase())
      })
      .filter(({ price }) => {
        return  filterValue.priceRange[0] <= price && filterValue.priceRange[1] > price
       })
      .filter(({ rating }) => {
        const count = rating!.count;
        return filterValue.countRange[0] <= count && filterValue.countRange[1] > count
      })
      .filter(({ rating }) => {
        return filterValue.checkPopular ? rating!.rate > 4 : true;
      })
      .filter((product) => {
        const index = cart!.findIndex((elem) => {
          return elem.title === product.title
        })
        return filterValue.checkBasket ? index !== -1 : true;
      })
      .filter(({ category }) => {
        if(arrCategories.length > 0) {
          return arrCategories.includes(category);
        }
        return true
      })

    localStorage.setItem("filterValue", JSON.stringify(filterValue));
    setFilterData(filterArr)

  }, [ filterValue, cart, data, searchValue])

  const openFilterModal = () => {
    setShowFilterModal(true)
  }

  return (
    <>
      <div className="main__nav">
        <div className="main__filter">
          <div className="main__filter__name">All products</div>
          <button className="main__filter__btn" title="Filters" onClick={() => {openFilterModal()}}></button>
          {showFilterModal && <FilterModal setShowFilterModal={setShowFilterModal} />}
        </div>
        <div className="main__setting__btn">
          <button
            className="main__setting__btn-prev"
            title="previous product"
            onClick={() => handlePrevNext("prev")}
          >
            <img src={left} alt="left" />
          </button>
          <button
            className="main__setting__btn-next"
            title="next product"
            onClick={() => handlePrevNext("next")}
          >
            <img src={right} alt="right" />
          </button>
        </div>
      </div>
      <div className="catalog">
        {data.length > 0 ? (
          <ul ref={ul} className="catalog__items">
            {filterData.length > 0 ?
              filterData.map((product, index) => {
                return <CatalogItem key={index} product={product} />;
              }) : <NotFoundData />
              } 
          </ul>
        ) : (
          <h3>Loading.....</h3>
        )}
      </div>
    </>
  );
};
