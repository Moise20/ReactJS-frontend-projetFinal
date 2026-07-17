import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiImageAddLine } from 'react-icons/ri';
import { BsBagCheck } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { IoPersonOutline } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const User = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) {
    return (
      <div className="profile">
        <Link to="/login" className="login-link">Connexion</Link>
      </div>
    );
  }

  return (
    <div className="profile">
      <Link to="/cart" className="cart-icon-btn">
        <BsBagCheck size={20} />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>

      <button className="profile-avatar" onClick={() => setProfileOpen(!profileOpen)}>
        <IoPersonOutline size={22} />
      </button>

      {profileOpen && (
        <div className="openProfile boxItems" onClick={() => setProfileOpen(false)}>
          <div className="profile-user-info">
            <p className="profile-email">{user.email}</p>
          </div>
          <Link to="/create" className="box">
            <RiImageAddLine className="icon" />
            <h4>Créer un article</h4>
          </Link>
          <Link to="/account" className="box">
            <BsBagCheck className="icon" />
            <h4>Mes commandes</h4>
          </Link>
          <button className="box" onClick={logout}>
            <BiLogOut className="icon" />
            <h4>Déconnexion</h4>
          </button>
        </div>
      )}
    </div>
  );
};
