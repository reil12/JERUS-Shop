import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CustomerPageBackground from '../components/CustomerPageBackground';
import CustomerPageHeading from '../components/CustomerPageHeading';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="customer-page auth-page page-theme-login">
      <CustomerPageBackground word="LOGIN" angle={-8} />
      <CustomerPageHeading
        word="LOGIN"
        kicker="Welcome back"
        description="Sign in to shop and keep up with your orders."
        theme="login"
      />
      <form className="form narrow auth-form" onSubmit={submit}>
        <h2>Login</h2>
        <label>Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button className="btn">Login</button>
        <p className="muted">No account? <Link to="/register">Sign up</Link></p>
      </form>
    </section>
  );
}
