import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import CustomerPageBackground from '../components/CustomerPageBackground';
import CustomerPageHeading from '../components/CustomerPageHeading';

// Full catalogue with search (this used to be the home page).
export default function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      api
        .get('/products', { params: { search } })
        .then((res) => setProducts(res.data))
        .finally(() => setLoading(false));
    }, 250); // small delay while typing
    return () => clearTimeout(t);
  }, [search]);

  return (
    <section className="customer-page shop-page page-theme-shop">
      <CustomerPageBackground word="SHOP" angle={-8} />
      <CustomerPageHeading
        word="SHOP"
        kicker="The JERUS collection"
        description="Explore the latest essentials and find the piece that feels like you."
        theme="shop"
      />

      <div className="toolbar shop-toolbar">
        <h2>All Shirts</h2>
        <label className="shop-search">
          <span className="visually-hidden">Search shirts</span>
          <input
            placeholder="Search shirts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {loading ? (
        <p className="page-message">Loading shirts...</p>
      ) : products.length === 0 ? (
        <p className="page-message">No shirts found.</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
