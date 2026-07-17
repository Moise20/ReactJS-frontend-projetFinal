import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart doit être utilisé dans un CartProvider');
  return context;
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = useCallback(async () => {
    if (!user) { setCart(null); setCartCount(0); return; }
    try {
      const response = await api.get('/cart');
      setCart(response.data);
      const count = response.data.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
      setCartCount(count);
    } catch {
      setCart(null);
      setCartCount(0);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  async function addToCart(articleId, quantity = 1) {
    await api.post('/cart/items', { articleId, quantity });
    await fetchCart();
  }

  async function updateItem(itemId, quantity) {
    await api.patch(`/cart/items/${itemId}`, { quantity });
    await fetchCart();
  }

  async function removeItem(itemId) {
    await api.delete(`/cart/items/${itemId}`);
    await fetchCart();
  }

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, updateItem, removeItem, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}
