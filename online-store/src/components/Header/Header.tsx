import { Link } from 'react-router-dom'

export const Header = function() {
  return (
  <header className="header">
    <div className="header__logo">
      <Link to='/'>Online Store</Link>
    </div>
    <div className="header__widget">
      Widget
    </div>
  </header>
)}