import './css/footer.css';
import { useLang } from '../context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLang();

  return (
    <footer className="footer-root">
      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand">
          <a href="#" className="footer-brand__logo">
            <span className="footer-brand__text">
              {'JM Transport'.split('').map((char, i) => (
                <span
                  key={i}
                  className="footer-brand__char"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="footer-brand__group">Group</span>
          </a>
          <span className="brand-tagline">Panama · Since 2012</span>
          <p>{t('footer.description')}</p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>{t('footer.quicklinks')}</h4>
          <ul>
            <li><a href="#">{t('footer.privacy')}</a></li>
            <li><a href="#">{t('footer.terms')}</a></li>
            <li><a href="#">{t('footer.faq')}</a></li>
            <li><a href="#">{t('footer.corporate')}</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>{t('footer.services')}</h4>
          <ul>
            <li><a href="#">{t('footer.airport')}</a></li>
            <li><a href="#">{t('footer.citytours')}</a></li>
            <li><a href="#">{t('footer.intercity')}</a></li>
            <li><a href="#">{t('footer.events')}</a></li>
          </ul>
        </div>

        {/* Location */}
        <div className="footer-col footer-location">
          <h4>{t('footer.location')}</h4>
          <address>
            {t('footer.address')}
          </address>
          <div className="footer-phone">
            <a href="tel:+5073104785">{t('footer.phone')}</a>
          </div>
          <div className="footer-socials">
            {/* WhatsApp */}
            <button className="social-btn" title="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.25 18.49l.72.42A10 10 0 1020 12a10 10 0 00-9.19 13.94l.42.84-1.77.48 1.79-.73zM2 22l1.36-4.97A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10a9.93 9.93 0 01-5.03-1.36L2 22zm6.39-14.69c.27-.01.55.06.69.38.3.68.59 1.36.87 2.05.06.15.02.34-.1.52-.06.1-.17.24-.28.38-.13.14-.37.41-.37.41s-.1.12-.07.26c.01.06.05.14.09.2l.04.06c.26.43.6.86 1.02 1.26.12.12.24.24.37.35.47.41 1 .75 1.57 1l.01.01c.08.04.13.06.24.11.06.02.13.05.19.07.02.01.05.01.08.01.16.01.25-.1.29-.15.72-.88.79-.93.79-.93.1-.1.25-.13.38-.12.06 0 .13.01.18.04.53.24 1.4.62 1.4.62l.58.26c.1.05.18.16.19.27 0 .07.01.17-.02.36-.03.26-.11.57-.19.74-.06.11-.13.21-.21.3-.11.12-.19.19-.32.29-.08.06-.12.09-.12.09-.14.09-.22.13-.38.22-.26.14-.54.22-.83.23-.18.01-.37.02-.55.01l-.65-.15c-1.42-.37-2.73-1.07-3.83-2.04-.23-.2-.44-.41-.65-.62-.89-.89-1.56-1.84-1.97-2.74a3.6 3.6 0 01-.3-1.38c0-.61.2-1.2.57-1.68.07-.1.14-.2.26-.31.13-.12.21-.18.3-.22.11-.06.24-.09.37-.1z"/></svg>
            </button>
            {/* Instagram */}
            <button className="social-btn" title="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
            </button>
            {/* Share */}
            <button className="social-btn" title="Share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          {lang === 'en' ? (
            <>© 2025 JM Transport Group Panama. <span>All rights reserved.</span></>
          ) : (
            <>© 2025 JM Transport Group Panamá. <span>Todos los derechos reservados.</span></>
          )}
        </p>
      </div>
    </footer>
  );
}