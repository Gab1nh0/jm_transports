import './css/navbar_fondo.css';
import { useLang } from '../context/LanguageContext';
import { useState, useEffect } from 'react';

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
    { key: 'home',    label: t('nav.home') },
    { key: 'tours',   label: t('nav.tours') },
    { key: 'fleet',   label: t('nav.fleet') },
    { key: 'booking', label: t('nav.booking') },
    { key: 'about',   label: t('nav.about') },
  ];

  return (
    <nav className={`transport-navbar ${scrolled ? 'transport-navbar--scrolled' : ''}`}>

      <a href="#" className="transport-navbar__brand">
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
              href="#"
              className={activeLink === key ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(key);
              }}
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