import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from './User';
import { nav } from '../../assets/data/data';
import './header.css';

export const Header = () => {
  // [LEARN] On déplace l'addEventListener dans useEffect pour :
  // [LEARN] 1. Ne l'ajouter qu'une fois au montage (pas à chaque render)
  // [LEARN] 2. Le supprimer au démontage (cleanup) pour éviter les fuites mémoire
  // [LEARN] La fonction retournée par useEffect est le "cleanup" : React l'appelle
  // [LEARN] quand le composant est détruit. Toujours nettoyer les event listeners !
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) header.classList.toggle('active', window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="scontainer flex">
        <div className="logo">
          <Link to="/">
            <img src="/panas_blog_logo.png" alt="Logo" width="100px" />
          </Link>
        </div>
        <nav>
          <ul>
            {nav.map((link) => (
              <li key={link.id}>
                <Link to={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="account flexCenter">
          <User />
        </div>
      </div>
    </header>
  );
};
