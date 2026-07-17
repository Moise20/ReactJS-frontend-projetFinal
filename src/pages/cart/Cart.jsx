import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import api from '../../api/axios';
import { getImageUrl } from '../../utils/image';
import './cart.css';

function Cart() {
  const { cart, updateItem, removeItem } = useCart();
  const navigate = useNavigate();
  const [ordering, setOrdering] = useState(false);
  const [orderError, setOrderError] = useState('');

  const total = cart?.items?.reduce(
    (sum, item) => sum + Number(item.article.price) * item.quantity,
    0,
  ) ?? 0;

  async function handleOrder() {
    setOrdering(true);
    setOrderError('');
    try {
      const response = await api.post('/orders');
      navigate(`/account`, { state: { newOrderId: response.data.id } });
    } catch (err) {
      setOrderError(err.response?.data?.message || 'Erreur lors de la commande');
    } finally {
      setOrdering(false);
    }
  }

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="cart-empty container">
        <h2>Votre panier est vide</h2>
        <Link to="/" className="cart-btn-back">Continuer mes achats</Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h2>Mon panier</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              {item.article.image && (
                <img
                  src={getImageUrl(item.article.image)}
                  alt={item.article.title}
                  className="cart-item-img"
                />
              )}
              <div className="cart-item-info">
                <h3>{item.article.title}</h3>
                <p className="cart-item-price">{Number(item.article.price).toFixed(2)} €</p>
              </div>
              <div className="cart-item-qty">
                <button onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateItem(item.id, item.quantity + 1)}>+</button>
              </div>
              <p className="cart-item-subtotal">
                {(Number(item.article.price) * item.quantity).toFixed(2)} €
              </p>
              <button className="cart-item-remove" onClick={() => removeItem(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Récapitulatif</h3>
          <div className="cart-total-line">
            <span>Total</span>
            <span className="cart-total-amount">{total.toFixed(2)} €</span>
          </div>
          {orderError && <p className="cart-error">{orderError}</p>}
          <button
            className="cart-checkout-btn"
            onClick={handleOrder}
            disabled={ordering}
          >
            {ordering ? 'Commande en cours...' : 'Commander'}
          </button>
          <Link to="/" className="cart-btn-back">Continuer mes achats</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
