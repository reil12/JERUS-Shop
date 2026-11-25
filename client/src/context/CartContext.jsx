import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  const refresh = useCallback(async () => {
    if (!user) return setCart({ items: [] });
    try {
      setCart((await api.get('/cart')).data);
    } catch {
      setCart({ items: [] });
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addToCart = async (productId, size, quantity = 1) =>
    setCart((await api.post('/cart', { productId, size, quantity })).data);

  const updateItem = async (itemId, quantity) =>
    setCart((await api.put(`/cart/${itemId}`, { quantity })).data);

  const removeItem = async (itemId) => setCart((await api.delete(`/cart/${itemId}`)).data);

  const items = cart.items.filter((i) => i.product);
  const count = items.reduce((n, i) => n + i.quantity, 0);
  const total = items.reduce((n, i) => n + i.quantity * i.product.price, 0);

  return (
    <CartContext.Provider value={{ items, count, total, addToCart, updateItem, removeItem, refresh }}>
      {children}
    </CartContext.Provider>
  );
}
