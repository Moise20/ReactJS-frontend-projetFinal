// [LEARN] AuthContext partage l'état d'authentification à toute l'application
// [LEARN] sans passer les props manuellement de composant en composant (prop drilling).
// [LEARN]
// [LEARN] Pattern Context API en 3 étapes :
// [LEARN] 1. createContext() → crée le "canal" de communication
// [LEARN] 2. <AuthContext.Provider value={...}> → fournit les données (dans App.jsx)
// [LEARN] 3. useContext(AuthContext) → consomme les données (dans n'importe quel composant)
// [LEARN]
// [LEARN] Parallèle Angular : c'est l'équivalent d'un Service singleton injecté dans
// [LEARN] le root (providedIn: 'root'). Tout composant peut l'injecter directement.
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

// [LEARN] Le hook useAuth est un raccourci pour useContext(AuthContext).
// [LEARN] C'est une convention React : on exporte un hook personnalisé plutôt que
// [LEARN] d'exposer le Context directement. Ça permet d'ajouter une validation
// [LEARN] (tu as oublié de mettre le Provider) et c'est plus lisible dans les composants.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans un AuthProvider');
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // [LEARN] useEffect avec [] = s'exécute une seule fois au montage du composant.
  // [LEARN] On relit le token depuis localStorage pour restaurer la session
  // [LEARN] si l'utilisateur rafraîchit la page (le state React est réinitialisé
  // [LEARN] au refresh, mais localStorage persiste).
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }

  async function register(email, password) {
    const response = await api.post('/auth/register', { email, password });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  // [LEARN] 'loading' évite un flash de contenu : si on rafraîchit la page,
  // [LEARN] le composant ProtectedRoute ne redirige pas vers /login avant
  // [LEARN] d'avoir vérifié si un token existe dans localStorage.
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
