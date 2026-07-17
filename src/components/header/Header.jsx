import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from './User';
import { nav } from '../../assets/data/data';
import './header.css';

export const Header = () => {
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
