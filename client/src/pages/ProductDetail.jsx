import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { imageSrc, peso } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CustomerPageBackground from '../components/CustomerPageBackground';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSize(res.data.sizes?.[0] || 'M');
      })
      .catch(() => setProduct(false));
  }, [id]);

  if (product === null || product === false) {
    return (
      <section className="customer-page product-detail-page page-theme-product">
        <CustomerPageBackground word="DETAILS" angle={-8} />
        <p className="page-message">{product === null ? 'Loading...' : 'Shirt not found.'}</p>
      </section>
    );
  }

  const handleAdd = async () => {
    if (!user) return navigate('/login');
    try {
      await addToCart(product._id, size, qty);
      setMsg('Added to cart!');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Could not add to cart');
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <section className="customer-page product-detail-page page-theme-product">
      <CustomerPageBackground word="DETAILS" angle={-8} />
      <div className="detail product-detail">
        <div className="product-detail-image">
          <img src={imageSrc(product.image)} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <p className="page-kicker">JERUS collection</p>
          <h1>{product.name}</h1>
          <p className="price big">{peso(product.price)}</p>
          <p className="product-description">{product.description}</p>

          <label>Size</label>
          <div className="chips">
            {product.sizes.map((s) => (
              <button key={s} className={`chip ${s === size ? 'active' : ''}`} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>

          <label>Quantity</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            style={{ width: 90 }}
          />

          <p className="muted product-stock">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>

          {isAdmin ? (
            <p className="muted">Admins manage products from the Admin dashboard.</p>
          ) : (
            <button className="btn product-add-btn" disabled={product.stock === 0} onClick={handleAdd}>
              Add to Cart
            </button>
          )}
          {msg && <p className="notice product-notice">{msg}</p>}
        </div>
      </div>
    </section>
  );
}
