import { useEffect, useRef, useState } from "react";
import { CatalogItem } from "../CatalogItem/CatalogItem";
import left from "./../../assets/svg/left.svg";
import right from "./../../assets/svg/right.svg";
import "./Catalog.css";

export const Catalog = function () {
  const ul = useRef<HTMLUListElement>(null);
  const [data, setData] = useState([]);

  const handlePrevNext = (direction: string) => {
    const li =
      null !== ul.current ? ([...ul.current.children] as HTMLLIElement[]) : [];
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

  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              setData([...json])
            })
  },[])

  return (
    <>
      <div className="main__nav">
        <div className="main__filter">
          <div className="main__filter__name">All products</div>
          <button className="main__filter__btn" title="Filters"></button>
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
      {data.length > 0 ? <ul ref={ul} className="catalog__items">
            {data.map((product ,index) => {
              return  <CatalogItem key={index} product={product}/>
            })}
           
          </ul> : <h3>Loading.....</h3> }
      </div>
    </>
  );
};
