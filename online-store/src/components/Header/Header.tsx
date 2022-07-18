import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../StoreContext';
import cartSVG from './../../assets/svg/cart.svg'
import './Header.css'

export const Header = function() {
  const { cart } = useContext(Context);

  const getCartCount = () => {
    if(cart.length === 0) {
      return ''
    } else {
      return cart.length
    }
  }

  return (
  <header className="header">
    <div className="header__logo">
      <Link to='/'>Online Store</Link>
    </div>
    <div className="header__widget">
      <input type="text" id="header__widget__value" placeholder="Search"/>
      <Link to="/" className="header__cart"><img src={cartSVG} alt="cart"/><span className="header__cart_count">{getCartCount()}</span></Link>
    </div>
  </header>
)}