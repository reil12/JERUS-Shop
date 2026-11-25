import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: `${API_URL}/api` });

// Attach the login token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Works for uploaded images (/uploads/x.png), pasted URLs and data URLs
export const imageSrc = (img) => {
  if (!img) return '';
  if (img.startsWith('/uploads')) return `${API_URL}${img}`;
  return img;
};

export const peso = (n) => `₱${Number(n || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;

export default api;
