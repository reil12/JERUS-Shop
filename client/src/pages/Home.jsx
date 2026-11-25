import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

// Landing page: hero slider + newest shirts + a few reasons to buy.
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api
      .get('/products')
      .then((res) => setProducts(res.data.slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return (
    <>
      <Hero />

      <section className="section">
        <div className="section-head">
          <h2>New Arrivals</h2>
          <Link to="/shop" className="btn">View all shirts</Link>
        </div>
        {!loaded ? (
          <p className="muted">Loading shirts...</p>
        ) : products.length === 0 ? (
          <p className="muted">No shirts yet. Run <code>npm run seed</code> or add some in the Admin panel.</p>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="section perks">
        <div><h3>Easy ordering</h3><p className="muted">Pick a size, add to cart, check out in a minute.</p></div>
        <div><h3>Cash on delivery</h3><p className="muted">Pay when your shirts arrive at your door.</p></div>
        <div><h3>Track your order</h3><p className="muted">See every order and its status in your account.</p></div>
      </section>
    </>
  );
}
