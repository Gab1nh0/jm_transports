import './css/navbar_fondo.css';
import { useLang } from '../context/LanguageContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      <span className="transport-navbar__group">
        Group
      </span>
    </a>

    <ul className="transport-navbar__links">
      <li><a href="#">{t('nav.services')}</a></li>
      <li><a href="#">{t('nav.tours')}</a></li>
      <li><a href="#">{t('nav.fleet')}</a></li>
      <li><a href="#">{t('nav.about')}</a></li>
      <li><a href="#" className="active">{t('nav.contact')}</a></li>
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