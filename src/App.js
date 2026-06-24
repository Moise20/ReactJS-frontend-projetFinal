// [LEARN] App.js est le composant racine de l'application React.
// [LEARN] Il configure les deux choses globales : les Providers (contextes) et le Router.
// [LEARN]
// [LEARN] Migration react-router v5 → v6 — les changements clés :
// [LEARN] - BrowserRouter reste pareil
// [LEARN] - Switch → Routes (même rôle : afficher la première route qui matche)
// [LEARN] - <Route component={X}> → <Route element={<X />}> (JSX complet, pas juste le type)
// [LEARN] - Plus besoin de 'exact' — toutes les routes sont exactes par défaut en v6
// [LEARN] - useHistory() → useNavigate() dans les composants
// [LEARN] - match.params → useParams() dans les composants
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/common/ProtectedRoute';

import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Home } from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import DetailsPages from './pages/details/DetailsPages';
import Cart from './pages/cart/Cart';
import Account from './pages/account/Account';
import { Create } from './components/create/Create';
import { Edit } from './components/create/Edit';

const App = () => {
  return (
    // [LEARN] L'ordre des Providers est important :
    // [LEARN] AuthProvider en dehors de CartProvider car CartProvider utilise useAuth().
    // [LEARN] Un Provider ne peut consommer que les contextes de ses ancêtres.
    <AuthProvider>
      <Router>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details/:id" element={<DetailsPages />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />

            {/* [LEARN] Routes protégées : ProtectedRoute vérifie l'auth avant d'afficher la page */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </CartProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
