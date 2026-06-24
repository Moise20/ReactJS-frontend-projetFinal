import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du compte');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Créer un compte</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre@email.com"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="6 caractères minimum"
            />
          </div>
          <div className="auth-field">
            <label htmlFor="confirm">Confirmer le mot de passe</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder="••••••"
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Création...' : 'Créer mon compte'}
          </button>
        </form>
        <p className="auth-link">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
