// [LEARN] Card est le composant principal de la page d'accueil.
// [LEARN] Il affiche la liste des produits/articles récupérés depuis le backend.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineClockCircle,
  AiOutlineComment,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineLike,
} from 'react-icons/ai';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import './blog.css';

export const Card = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const response = await api.get('/blog');
        const data = response.data;

        const enriched = await Promise.all(
          data.map(async (item) => {
            const [countRes, tagRes] = await Promise.all([
              api.get(`/blog/comment/count/${item.id}`),
              api.get(`/blog/${item.id}/tags`),
            ]);
            return {
              ...item,
              commentCount: countRes.data,
              postTag: tagRes.data?.tags ?? [],
              showCommentField: false,
            };
          }),
        );
        setArticles(enriched);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);

  async function handleLike(item) {
    const res = await api.post(`/blog/${item.id}/like`);
    setArticles((prev) =>
      prev.map((a) => (a.id === item.id ? { ...a, likes: res.data.totalLikes?.likes ?? a.likes + 1 } : a)),
    );
  }

  async function submitComment(item) {
    if (!comment.trim()) return;
    await api.post(`/blog/comment/${item.id}`, { message: comment });
    setComment('');
    setArticles((prev) =>
      prev.map((a) =>
        a.id === item.id
          ? { ...a, showCommentField: false, commentCount: a.commentCount + 1 }
          : a,
      ),
    );
  }

  function toggleCommentField(id) {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, showCommentField: !a.showCommentField } : a,
      ),
    );
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer cet article ?')) return;
    await api.delete(`/blog/${id}`);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  if (isLoading) return <p style={{ textAlign: 'center', padding: '3rem' }}>Chargement...</p>;

  return (
    <section className="blog">
      <div className="container grid3">
        {articles.map((item) => (
          <div className="box boxItems" key={item.id}>
            <div className="img">
              {/* [LEARN] Correction du bug : src doit être une expression JS {`...`},
              // [LEARN] pas une chaîne littérale "{item.image}". */}
              <img
                src={`${process.env.REACT_APP_API_URL}${item.image}`}
                alt={item.title}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            <div className="details">
              {item.postTag?.length > 0 && (
                <div className="tag">
                  {item.postTag.map((t) => (
                    <span key={t.id}>#{t.name} </span>
                  ))}
                </div>
              )}

              <Link to={`/details/${item.id}`} className="link">
                <h3>{item.title}</h3>
              </Link>

              {item.price > 0 && (
                <p className="card-price">{Number(item.price).toFixed(2)} €</p>
              )}

              <p>{item.body?.slice(0, 180)}...</p>

              <div className="date">
                <AiOutlineClockCircle className="icon" />
                <label>
                  {format(new Date(item.createdAt), 'dd MMM yyyy', { locale: fr })}
                </label>

                <AiOutlineComment
                  className="icon"
                  onClick={() => toggleCommentField(item.id)}
                />
                {item.commentCount > 0 && (
                  <label>{item.commentCount} commentaire{item.commentCount > 1 ? 's' : ''}</label>
                )}

                {item.showCommentField && (
                  <div className="comment-field">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Votre commentaire..."
                    />
                    <button onClick={() => submitComment(item)}>Envoyer</button>
                  </div>
                )}

                <AiOutlineLike className="icon" onClick={() => handleLike(item)} />
                <label>{item.likes ?? 0} like{item.likes > 1 ? 's' : ''}</label>

                {user && (
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDelete(item.id)}
                  />
                )}
              </div>

              {user && (
                <div className="date2">
                  <Link to={`/edit/${item.id}`} className="link">
                    <AiOutlineEdit className="icon" /> <label>Modifier</label>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
