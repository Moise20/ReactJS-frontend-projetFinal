// [LEARN] La page Compte affiche le profil de l'utilisateur connecté et son historique
// [LEARN] de commandes. Elle est protégée par ProtectedRoute dans App.jsx.
// [LEARN]
// [LEARN] useLocation() permet de lire l'état passé par navigate() au moment
// [LEARN] de la redirection. Ex: après une commande, on passe { newOrderId: 42 }
// [LEARN] pour surligner la nouvelle commande.
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import './account.css';

function Account() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const newOrderId = location.state?.newOrderId;

  useEffect(() => {
    api.get('/orders')
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="account-page container">
      <div className="account-header">
        <div>
          <h2>Mon compte</h2>
          <p className="account-email">{user?.email}</p>
        </div>
        <button className="account-logout-btn" onClick={logout}>Se déconnecter</button>
      </div>

      <section className="account-orders">
        <h3>Historique des commandes</h3>
        {loading && <p className="account-status">Chargement...</p>}
        {!loading && orders.length === 0 && (
          <p className="account-status">Aucune commande pour l'instant.</p>
        )}
        {orders.map((order) => (
          <div
            key={order.id}
            className={`order-card ${order.id === newOrderId ? 'order-card--new' : ''}`}
          >
            <div className="order-card-header">
              <span className="order-id">Commande #{order.id}</span>
              <span className={`order-status order-status--${order.status}`}>
                {order.status}
              </span>
              <span className="order-date">
                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit', month: 'long', year: 'numeric',
                })}
              </span>
              <span className="order-total">{Number(order.totalAmount).toFixed(2)} €</span>
            </div>
            <div className="order-items">
              {order.items?.map((item) => (
                <div key={item.id} className="order-item-line">
                  <span className="order-item-title">{item.articleTitle}</span>
                  <span className="order-item-qty">× {item.quantity}</span>
                  <span className="order-item-price">{Number(item.subtotal).toFixed(2)} €</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Account;
