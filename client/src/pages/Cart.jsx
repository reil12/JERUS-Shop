import { Link } from 'react-router-dom';
import { imageSrc, peso } from '../api/axios';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, total, updateItem, removeItem } = useCart();

  if (!items.length) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn">Browse shirts</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <div className="list">
        {items.map((i) => (
          <div className="row" key={i._id}>
            <img src={imageSrc(i.product.image)} alt={i.product.name} className="thumb" />
            <div className="grow">
              <strong>{i.product.name}</strong>
              <div className="muted">Size {i.size} · {peso(i.product.price)}</div>
            </div>
            <div className="qty">
              <button onClick={() => updateItem(i._id, i.quantity - 1)}>−</button>
              <span>{i.quantity}</span>
              <button onClick={() => updateItem(i._id, i.quantity + 1)}>+</button>
            </div>
            <strong>{peso(i.product.price * i.quantity)}</strong>
            <button className="link-btn danger" onClick={() => removeItem(i._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="summary">
        <h3>Total: {peso(total)}</h3>
        <Link to="/checkout" className="btn">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
