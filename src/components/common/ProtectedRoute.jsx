// [LEARN] ProtectedRoute est un composant "gardien" : il vérifie si l'utilisateur
// [LEARN] est connecté avant d'afficher la page demandée.
// [LEARN] Si non connecté → redirection vers /login.
// [LEARN]
// [LEARN] Parallèle Angular : c'est l'équivalent exact d'un CanActivate Guard.
// [LEARN] En Angular : canActivate() retourne false → router.navigate(['/login'])
// [LEARN] En React/v6 : on retourne <Navigate to="/login" /> si pas connecté.
// [LEARN]
// [LEARN] L'état 'replace' dans Navigate remplace l'entrée dans l'historique
// [LEARN] plutôt qu'en ajouter une nouvelle. Ainsi le bouton "retour" du navigateur
// [LEARN] ne renvoie pas vers la page protégée après déconnexion.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
