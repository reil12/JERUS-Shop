import { useEffect, useState } from 'react';
import api, { peso } from '../../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/stats').then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading sales...</p>;

  const max = Math.max(...stats.last7Days.map((d) => d.revenue), 1);

  return (
    <div className="admin-dashboard">
      <div className="stats">
        <div className="card pad"><span className="muted">Total Sales</span><h3>{peso(stats.totalRevenue)}</h3></div>
        <div className="card pad"><span className="muted">Orders</span><h3>{stats.totalOrders}</h3></div>
        <div className="card pad"><span className="muted">Products</span><h3>{stats.totalProducts}</h3></div>
        <div className="card pad"><span className="muted">Customers</span><h3>{stats.totalCustomers}</h3></div>
      </div>

      <div className="card pad">
        <h3>Sales — last 7 days</h3>
        <div className="bars">
          {stats.last7Days.map((d) => (
            <div key={d.date} className="bar-col" title={`${d.date}: ${peso(d.revenue)} (${d.orders} orders)`}>
              <span className="bar-val">{d.revenue ? peso(d.revenue) : ''}</span>
              <div className="bar" style={{ height: `${(d.revenue / max) * 100}%` }} />
              <span className="bar-label">{d.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card pad">
        <h3>Best sellers</h3>
        {stats.topProducts.length === 0 ? (
          <p className="muted">No sales yet.</p>
        ) : (
          <table>
            <thead><tr><th>Shirt</th><th>Units sold</th><th>Revenue</th></tr></thead>
            <tbody>
              {stats.topProducts.map((p) => (
                <tr key={p._id}><td>{p._id}</td><td>{p.unitsSold}</td><td>{peso(p.revenue)}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
