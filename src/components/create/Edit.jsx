import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import './create.css';

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: '', body: '', price: '', stock: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/blog/${id}`).then((res) => setArticle(res.data));
  }, [id]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('body', article.body);
    if (article.price !== '') formData.append('price', article.price);
    if (article.stock !== '') formData.append('stock', article.stock);
    if (image) formData.append('image', image);

    try {
      await api.put(`/blog/${id}`, formData);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  }

  const displayImage = preview || (article.image ? `${process.env.REACT_APP_API_URL}${article.image}` : null);

  return (
    <section className="newPost">
      <div className="container boxItems">
        {displayImage && (
          <div className="img">
            <img src={displayImage} alt="aperçu" className="image-preview" />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="inputfile flexCenter">
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <input
            type="text"
            placeholder="Titre"
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            required
          />
          <textarea
            rows="8"
            placeholder="Description..."
            value={article.body}
            onChange={(e) => setArticle({ ...article, body: e.target.value })}
            required
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="number"
              placeholder="Prix (€)"
              value={article.price ?? ''}
              onChange={(e) => setArticle({ ...article, price: e.target.value })}
              min="0"
              step="0.01"
              style={{ flex: 1 }}
            />
            <input
              type="number"
              placeholder="Stock"
              value={article.stock ?? ''}
              onChange={(e) => setArticle({ ...article, stock: e.target.value })}
              min="0"
              style={{ flex: 1 }}
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Modification...' : 'Modifier le produit'}
          </button>
        </form>
      </div>
    </section>
  );
};
