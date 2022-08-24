import React, { useContext } from 'react';
import { Context } from '../../StoreContext/index';

export const SearchInput = () =>{
  const { setSearchValue } = useContext(Context);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchValue) {
      setSearchValue(e.target.value);
    }
  };
    
  return (
    <input type='search' onChange={(e) => handleChange(e)} id='header__widget__value' autoComplete="off" placeholder='Search' autoFocus/>
  );
};