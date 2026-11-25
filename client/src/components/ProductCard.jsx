import { Link } from 'react-router-dom';
import { imageSrc, peso } from '../api/axios';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="card product-card">
      <div className="img-wrap">
        <img src={imageSrc(product.image)} alt={product.name} loading="lazy" />
        {product.stock === 0 && <span className="sold-out">Sold out</span>}
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price">{peso(product.price)}</p>
      </div>
    </Link>
  );
}
