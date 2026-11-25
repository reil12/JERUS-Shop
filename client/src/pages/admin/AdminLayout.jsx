import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <div className="tabs">
        <NavLink end to="/admin">Sales Dashboard</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
      </div>
      <Outlet />
    </div>
  );
}
