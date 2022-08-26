import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../StoreContext';
import { SearchInput } from '../SearchInput/SearchInput';
import cartSVG from './../../assets/svg/cart.svg';
import './Header.css';

export const Header = function () {
  const { cart } = useContext(Context);

  const getCartCount = (): number | string => {
    if (!cart) return '';
    if (cart.length === 0) {
      return '';
    } else {
      return cart.reduce((sum, { count }) => sum + count!, 0);
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to='/'>Online Store</Link>
      </div>
      <div className="header__widget">
        <SearchInput/>
        <Link to="/" 
          className="header__cart">
          <img src={cartSVG} alt="cart"/>
          <span className="header__cart_count">
            {getCartCount()}
          </span>
        </Link>
      </div>
    </header>
  );
};
