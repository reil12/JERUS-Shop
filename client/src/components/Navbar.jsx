import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const icon = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const SearchIcon = () => (
  <svg {...icon}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
);
const UserIcon = () => (
  <svg {...icon}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
);
const BagIcon = () => (
  <svg {...icon}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>
);

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">JERUS</Link>

        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/how-to-order">How To Order</NavLink>
          <NavLink to="/orders">Track My Order</NavLink>
          <NavLink to="/size-chart">Size Chart</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        </nav>

        <div className="nav-icons">
          <Link to="/shop" className="icon-btn" aria-label="Search shirts"><SearchIcon /></Link>
          {user ? (
            <button className="link-btn" onClick={handleLogout}>Logout ({user.name.split(' ')[0]})</button>
          ) : (
            <Link to="/login" className="icon-btn" aria-label="Login"><UserIcon /></Link>
          )}
          {user?.role !== 'admin' && (
            <Link to="/cart" className="icon-btn cart-link" aria-label="Cart">
              <BagIcon />
              {count > 0 && <b className="badge">{count}</b>}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
