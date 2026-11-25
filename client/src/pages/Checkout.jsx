import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { peso } from '../api/axios';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, total, refresh } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const placeOrder = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api.post('/orders', { shippingAddress: address });
      await refresh();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setBusy(false);
    }
  };

  if (!items.length) return <p>Your cart is empty.</p>;

  return (
    <form className="form" onSubmit={placeOrder}>
      <h2>Checkout</h2>
      <ul>
        {items.map((i) => (
          <li key={i._id}>
            {i.product.name} ({i.size}) × {i.quantity} — {peso(i.product.price * i.quantity)}
          </li>
        ))}
      </ul>
      <h3>Total: {peso(total)}</h3>

      <label>Shipping address</label>
      <textarea
        required
        rows="3"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="House no., street, barangay, city"
      />
      <p className="muted">Payment is simulated (Cash on Delivery). Plug a real gateway in a later sprint.</p>
      {error && <p className="error">{error}</p>}
      <button className="btn" disabled={busy}>{busy ? 'Placing order...' : 'Place Order'}</button>
    </form>
  );
}
