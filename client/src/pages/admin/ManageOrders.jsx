import { useEffect, useState } from 'react';
import api, { peso } from '../../api/axios';

const STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => api.get('/orders').then((res) => setOrders(res.data));
  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    load();
  };

  if (!orders.length) return <p>No orders yet.</p>;

  return (
    <table>
      <thead>
        <tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o._id}>
            <td>#{o._id.slice(-6).toUpperCase()}</td>
            <td>{o.user?.name}<div className="muted">{o.user?.email}</div></td>
            <td>{o.items.map((i) => `${i.name} (${i.size}) ×${i.quantity}`).join(', ')}</td>
            <td>{peso(o.total)}</td>
            <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            <td>
              <select value={o.status} onChange={(e) => setStatus(o._id, e.target.value)}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
