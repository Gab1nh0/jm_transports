import './css/navbar.css';
import { useLang } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();

  return (
    <nav className="navbar">
      <a href="#" className="nav-brand">JM Transport Group</a>

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