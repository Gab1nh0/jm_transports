import './css/navbar.css';
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
    { key: '/about-us',   label: t('nav.about') },
  ];
  const navigate = useNavigate();

  const handleNavClick = (key: string) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setActiveLink(key);

      if (key.startsWith('#')) {
        const element = document.querySelector(key);

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
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

      <a href="/" className="nav-brand">
        <span className="brand-text">
          {'JM Transport'.split('').map((char, i) => (
            <span
              key={i}
              className="brand-char"
              style={{ '--i': i } as React.CSSProperties}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="brand-group">Group</span>
      </a>

      <ul className="nav-links">
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

      <button className="lang-toggle" onClick={toggleLang}>
        {lang === 'en' ? 'ES/EN' : 'EN/ES'}
      </button>
    </nav>
  );
}