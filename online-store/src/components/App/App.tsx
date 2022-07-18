import { useState } from "react";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { Context } from "../../StoreContext/index";
import { addToCart, getCartData } from "../../utilities/index";
import "./App.css";

function App() {
  const cartData = getCartData();
  const [cart, setCart] = useState(cartData);
  const [searchValue, setSearchValue] = useState('');

  return (
    <Context.Provider value={{addToCart, cart, setCart, searchValue, setSearchValue}}>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;
