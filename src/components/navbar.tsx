import './css/navbar.css';
import { useLang } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
            {lang === 'en' ? 'ES/EN' : 'EN/ES'}
          </button>
        </li>
      </ul>

      {/* Lang toggle desktop — visible only on larger screens */}
      <button className="lang-toggle lang-toggle--desktop" onClick={toggleLang}>
        {lang === 'en' ? 'ES/EN' : 'EN/ES'}
      </button>
    </nav>
  );
}