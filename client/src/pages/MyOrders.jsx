import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { peso } from '../api/axios';
import CustomerPageBackground from '../components/CustomerPageBackground';
import CustomerPageHeading from '../components/CustomerPageHeading';

export default function MyOrders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api.get('/orders/mine').then((res) => setOrders(res.data));
  }, []);

  return (
    <section className="customer-page order-page page-theme-track">
      <CustomerPageBackground word="TRACK" angle={-6} />
      <CustomerPageHeading
        word="TRACK"
        kicker="Order tracking"
        description="Keep an eye on every order from checkout to delivery."
        theme="track"
      />
      {!orders ? (
        <p className="page-message">Loading your orders...</p>
      ) : !orders.length ? (
        <div className="empty-orders">
          <h2>No orders yet</h2>
          <p className="muted">Your next favorite is waiting to be found.</p>
          <Link className="btn" to="/shop">Explore the shop</Link>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((o) => (
            <article className="card pad order-card" key={o._id}>
              <div className="between order-card-heading">
                <div>
                  <span className="page-kicker">Order</span>
                  <strong>#{o._id.slice(-6).toUpperCase()}</strong>
                </div>
                <span className={`status ${o.status}`}>{o.status}</span>
              </div>
              <div className="muted">{new Date(o.createdAt).toLocaleString()}</div>
              <ul>
                {o.items.map((i, idx) => (
                  <li key={idx}>{i.name} ({i.size}) × {i.quantity} — {peso(i.price * i.quantity)}</li>
                ))}
              </ul>
              <div className="order-total"><strong>Total: {peso(o.total)}</strong></div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
