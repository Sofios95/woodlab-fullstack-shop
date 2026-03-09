import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import './Header.css'; // Το συνδέουμε απευθείας εδώ

function Header() {
  const { cartItems = [] } = useCart() || {}; 
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header-container">
      <div className="header-content"> {/* Προσθήκη wrapper για καλύτερο έλεγχο */}
        <Link to="/" className="logo-link">
          <img 
            src="https://woodlab.gr/wp-content/uploads/2022/06/circle-and-logo.png" 
            className="logo-img" 
            alt="Woodlab Logo" 
          /> 
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/aboutus">About</Link>
          <Link to="/cart" className="cart-icon">
            <span className="emoji">🛒</span>
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;