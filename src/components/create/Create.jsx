import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './create.css';

export const Create = () => {
  // [LEARN] useNavigate() remplace useHistory() de react-router v5.
  // [LEARN] navigate('/') remplace history.push('/').
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('image', image);
    if (price) formData.append('price', price);
    if (stock) formData.append('stock', stock);

    try {
      await api.post('/blog/article', formData);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="newPost">
      <div className="container boxItems">
        <div className="img">
          <img
            src={preview || 'https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=600'}
            alt="aperçu"
            className="image-preview"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputfile flexCenter">
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </div>
          <input
            type="text"
            placeholder="Titre du produit"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            rows="8"
            placeholder="Description du produit..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="number"
              placeholder="Prix (€)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              style={{ flex: 1 }}
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min="0"
              style={{ flex: 1 }}
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Création...' : 'Créer le produit'}
          </button>
        </form>
      </div>
    </section>
  );
};
