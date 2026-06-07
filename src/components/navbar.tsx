import './css/navbar.css';
import { useLang } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'flag-icons/css/flag-icons.min.css';
export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  //const [activeLink, setActiveLink] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
    setMenuOpen(false);

    if (key.startsWith('#')) {
      const element = document.querySelector(key);
      if (element) {
        // Ya estamos en home, scroll directo
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Estamos en otra página, ir a home y luego hacer scroll
        navigate('/', { state: { scrollTo: key } });
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

      {/* Hamburger button — visible only on mobile */}
      <button
        className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className="navbar__hamburger-line" />
        <span className="navbar__hamburger-line" />
        <span className="navbar__hamburger-line" />
      </button>

      {/* Overlay backdrop */}
      <div
        className={`navbar__overlay ${menuOpen ? 'navbar__overlay--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      <ul className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
        {navLinks.map(({ key, label }) => (
          <li key={key}>
            <a
              href={key}
              //className={activeLink === key ? 'active' : ''}
              onClick={handleNavClick(key)}
            >
              {label}
            </a>
          </li>
        ))}

        {/* Lang toggle inside mobile menu */}
        <li className="nav-links__lang-mobile">
          <button className="lang-toggle" onClick={toggleLang}>
            <span className={`fi fi-${lang === 'en' ? 'us' : 'pa'}`} />
            {lang === 'en' ? '  EN/ES' : '  ES/EN'}
          </button>
        </li>
      </ul>

      {/* Lang toggle desktop — visible only on larger screens */}
      <button className="lang-toggle lang-toggle--desktop" onClick={toggleLang}>
        <span className={`fi fi-${lang === 'en' ? 'us' : 'pa'}`} />
        {lang === 'en' ? '  EN/ES' : '  ES/EN'}
      </button>
    </nav>
  );
}