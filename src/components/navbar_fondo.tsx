import './css/navbar_fondo.css';
import { useLang } from '../context/LanguageContext';


export default function Navbarwhite() {
  const { lang, toggleLang, t } = useLang();

  return (
    <nav className='navbar'>

      <a href="#" className="nav-brand">
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
        <li><a href="#">{t('nav.services')}</a></li>
        <li><a href="#">{t('nav.tours')}</a></li>
        <li><a href="#">{t('nav.fleet')}</a></li>
        <li><a href="#">{t('nav.about')}</a></li>
        <li><a href="#" className="active">{t('nav.contact')}</a></li>
      </ul>

      <button className="lang-toggle" onClick={toggleLang}>
        {lang === 'en' ? 'ES/EN' : 'EN/ES'}
      </button>
    </nav>
  );
}