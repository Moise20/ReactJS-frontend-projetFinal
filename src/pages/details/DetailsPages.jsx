// [LEARN] useParams() est le hook v6 pour lire les paramètres de route.
// [LEARN] Pour la route '/details/:id', useParams() retourne { id: '42' }.
// [LEARN] En v5 on utilisait match.params.id via les props injectées par Route.
// [LEARN] En v6 plus besoin de props spéciales, on utilise directement le hook.
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import api from '../../api/axios';
import { getImageUrl } from '../../utils/image';
import './details.css';

function DetailsPages() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState('');

  useEffect(() => {
    api.get(`/blog/${id}`)
      .then((res) => setArticle(res.data))
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleAddToCart() {
    if (!user) { navigate('/login'); return; }
    try {
      await addToCart(Number(id), quantity);
      setAddedMsg('Ajouté au panier !');
      setTimeout(() => setAddedMsg(''), 2000);
    } catch (err) {
      setAddedMsg(err.response?.data?.message || 'Erreur');
      setTimeout(() => setAddedMsg(''), 3000);
    }
  }

  if (loading) return <p className="details-status">Chargement...</p>;
  if (!article) return <p className="details-status">Produit introuvable.</p>;

  return (
    <div className="details-page container">
      <button className="details-back" onClick={() => navigate(-1)}>← Retour</button>
      <div className="details-card">
        <div className="details-image-wrap">
          {article.image && (
            <img
              src={getImageUrl(article.image)}
              alt={article.title}
              className="details-image"
            />
          )}
        </div>
        <div className="details-info">
          <h1>{article.title}</h1>
          <p className="details-price">
            {Number(article.price).toFixed(2)} €
          </p>
          <p className="details-stock">
            {article.stock > 0 ? `${article.stock} en stock` : 'Rupture de stock'}
          </p>
          <p className="details-body">{article.body}</p>

          {article.stock > 0 && (
            <div className="details-actions">
              <div className="qty-control">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(article.stock, q + 1))}>+</button>
              </div>
              <button className="btn-add-cart" onClick={handleAddToCart}>
                Ajouter au panier
              </button>
            </div>
          )}
          {addedMsg && <p className="details-feedback">{addedMsg}</p>}
        </div>
      </div>
    </div>
  );
}

export default DetailsPages;
