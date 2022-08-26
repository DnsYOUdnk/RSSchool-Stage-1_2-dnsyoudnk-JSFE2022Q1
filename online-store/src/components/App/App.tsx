import { useState } from 'react';
import { Context } from '../../StoreContext/index';
import { addToCart, getCartData, getFiltersValue } from '../../utilities/index';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import './App.css';

export const App = () => {
  const cartData = getCartData();
  const filterData = getFiltersValue();
  const [cart, setCart] = useState(cartData);
  const [filterValue, setFilterValue] = useState(filterData);
  const [searchValue, setSearchValue] = useState<string>('');
  return (
    <Context.Provider value={{ addToCart, cart, setCart, filterValue, setFilterValue, searchValue, setSearchValue }}>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </Context.Provider>
  );
};
