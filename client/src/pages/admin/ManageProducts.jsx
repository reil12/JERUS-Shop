import { useEffect, useState } from 'react';
import api, { imageSrc, peso } from '../../api/axios';

const empty = { name: '', description: '', price: '', stock: 100, sizes: 'S,M,L,XL', image: '' };

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => api.get('/products').then((res) => setProducts(res.data));
  useEffect(() => {
    load();
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const reset = () => {
    setForm(empty);
    setFile(null);
    setEditingId(null);
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'image' && !v) return; // keep existing image unless a new URL is typed
      data.append(k, v);
    });
    if (file) data.append('imageFile', file);

    try {
      if (editingId) await api.put(`/products/${editingId}`, data);
      else await api.post('/products', data);
      reset();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setFile(null);
    setForm({
      name: p.name,
      description: p.description || '',
      price: p.price,
      stock: p.stock,
      sizes: p.sizes.join(','),
      image: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this shirt?')) return;
    await api.delete(`/products/${id}`);
    load();
  };

  return (
    <div>
      <form className="form card pad" onSubmit={submit}>
        <h3>{editingId ? 'Edit shirt (change price / image)' : 'Add new shirt'}</h3>
        <div className="two-col">
          <div>
            <label>Name</label>
            <input name="name" required value={form.name} onChange={change} />
          </div>
          <div>
            <label>Price (₱)</label>
            <input name="price" type="number" min="0" step="0.01" required value={form.price} onChange={change} />
          </div>
          <div>
            <label>Stock</label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={change} />
          </div>
          <div>
            <label>Sizes (comma separated)</label>
            <input name="sizes" value={form.sizes} onChange={change} />
          </div>
        </div>
        <label>Description</label>
        <textarea name="description" rows="2" value={form.description} onChange={change} />

        <label>Shirt image — upload a file</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
        <label>…or paste an image URL</label>
        <input name="image" placeholder="https://..." value={form.image} onChange={change} />
        {editingId && <p className="muted">Leave both empty to keep the current image.</p>}

        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button className="btn">{editingId ? 'Save changes' : 'Add shirt'}</button>
          {editingId && <button type="button" className="btn ghost" onClick={reset}>Cancel</button>}
        </div>
      </form>

      <table>
        <thead>
          <tr><th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th></th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td><img src={imageSrc(p.image)} alt="" className="thumb" /></td>
              <td>{p.name}</td>
              <td>{peso(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                <button className="link-btn" onClick={() => startEdit(p)}>Edit</button>{' '}
                <button className="link-btn danger" onClick={() => remove(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
