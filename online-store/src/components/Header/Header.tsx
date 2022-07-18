import { Link } from 'react-router-dom';
import cart from './../../assets/svg/cart.svg'
import './Header.css'

export const Header = function() {
  return (
  <header className="header">
    <div className="header__logo">
      <Link to='/'>Online Store</Link>
    </div>
    <div className="header__widget">
      <input type='text'id='header__widget__value' placeholder='Search'/>
      <Link to='/'><img src={cart} alt="cart"/></Link>
    </div>
  </header>
)}