// [LEARN] CartContext gère l'état du panier côté frontend.
// [LEARN] On stocke aussi le panier en localStorage pour survivre au refresh de page.
// [LEARN] Note : en production on synchroniserait avec le backend à chaque action.
// [LEARN] Ici on garde une approche mixte : localStorage pour la UI, API pour la persistance.
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

  // [LEARN] useCallback mémorise la fonction pour éviter qu'elle soit recréée
  // [LEARN] à chaque render, ce qui éviterait une boucle infinie dans le useEffect
  // [LEARN] qui en dépend (fetchCart est dans son tableau de dépendances).
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
