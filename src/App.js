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
