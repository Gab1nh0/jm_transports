import './css/navbar_fondo.css';
import { useLang } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: '/',    label: t('nav.home') },
    { key: '#tc-header',   label: t('nav.tours') },
    { key: '#fleet-section',   label: t('nav.fleet') },
    { key: '/booking', label: t('nav.booking') },
    { key: 'about',   label: t('nav.about') },
  ];
  const navigate = useNavigate();

  const handleNavClick = (key: string) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveLink(key);

      if (key.startsWith('#')) {
        const element = document.querySelector(key);

        if (key === '#tc-header') {
          navigate('/#tc-header');
          if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
        return;       
      }

      

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
        return;
      }

      navigate(key);
    };
  };

  return (
    <nav className={`transport-navbar ${scrolled ? 'transport-navbar--scrolled' : ''}`}>

      <a href="/" className="transport-navbar__brand">
        <span className="transport-navbar__brand-text">
          {'JM Transport'.split('').map((char, i) => (
            <span
              key={i}
              className="transport-navbar__brand-char"
              style={{ '--i': i } as React.CSSProperties}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="transport-navbar__group">Group</span>
      </a>

      <ul className="transport-navbar__links">
        {navLinks.map(({ key, label }) => (
          <li key={key}>
            <a
              href={key.startsWith('/') ? key : `#${key}`}
              className={activeLink === key ? 'active' : ''}
              onClick={handleNavClick(key)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className="transport-navbar__lang-toggle"
        onClick={toggleLang}
      >
        {lang === 'en' ? 'ES/EN' : 'EN/ES'}
      </button>

    </nav>
  );
}