import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CustomerPageBackground from '../components/CustomerPageBackground';
import CustomerPageHeading from '../components/CustomerPageHeading';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <section className="customer-page auth-page page-theme-register">
      <CustomerPageBackground word="SIGN UP" angle={8} />
      <CustomerPageHeading
        word="SIGN UP"
        kicker="Join JERUS"
        description="Create an account to save your cart and keep track of your orders."
        theme="register"
      />
      <form className="form narrow auth-form" onSubmit={submit}>
        <h2>Create account</h2>
        <label>Name</label>
        <input name="name" required value={form.name} onChange={change} />
        <label>Email</label>
        <input name="email" type="email" required value={form.email} onChange={change} />
        <label>Password (min 6 characters)</label>
        <input name="password" type="password" minLength="6" required value={form.password} onChange={change} />
        {error && <p className="error">{error}</p>}
        <button className="btn">Sign up</button>
        <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
