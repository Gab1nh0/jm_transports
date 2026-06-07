import './css/about_us.css';
import Navbarwhite from '../components/navbar_fondo.tsx';
import { useLang } from '../context/LanguageContext';

const teamMembers = [
  {
    name: 'Nombre Apellido',
    roleKey: 'about.team.member1.role',
    bioKey: 'about.team.member1.bio',
    photo: '', // agregar url
  },
  {
    name: 'Nombre Apellido',
    roleKey: 'about.team.member2.role',
    bioKey: 'about.team.member2.bio',
    photo: '',
  },
  {
    name: 'Nombre Apellido',
    roleKey: 'about.team.member3.role',
    bioKey: 'about.team.member3.bio',
    photo: '',
  },
];

const stats = [
  { numLabel: '12+', labelKey: 'about.stats.exp' },
  { numLabel: '4k',  labelKey: 'about.stats.guests' },
  { numLabel: '18',  labelKey: 'about.stats.destinations' },
  { numLabel: '100%', labelKey: 'about.stats.experiences' },
];



export default function AboutUs() {
  const { lang, t } = useLang();

  return (
    <>
    <Navbarwhite />
    <div className="ab-root">

      {/* ── Hero ── */}
      <div className="ab-hero">
        <div className="ab-hero-left">
          <div className="ab-eyebrow">{t('about.eyebrow')}</div>
          <h1>
            {lang === 'en' ? (
              <>Panama through<br /><em>local eyes</em></>
            ) : (
              <>Panamá a través de<br /><em>ojos locales</em></>
            )}
          </h1>
          <p>
            {t('about.hero.desc')}
          </p>
        </div>
        <div className="ab-hero-right">
          {stats.map(s => (
            <div className="ab-stat-cell" key={s.labelKey}>
              <div className="ab-stat-num">{s.numLabel}</div>
              <div className="ab-stat-label">{t(s.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Story ── */}
      <div className="ab-section">
        <div className="ab-section-header">
          <span className="ab-section-num">01</span>
          <h2>{t('about.story.header')}</h2>
        </div>
        <div className="ab-story-grid">
          <div className="ab-story-col">
            <div className="ab-story-year">{t('about.story.year1')}</div>
            <h3>{t('about.story.title1')}</h3>
            <p>
              {t('about.story.desc1')}
            </p>
          </div>
          <div className="ab-story-col">
            <div className="ab-story-year">{t('about.story.year2')}</div>
            <h3>{t('about.story.title2')}</h3>
            <p>
              {t('about.story.desc2')}
            </p>
          </div>
        </div>
      </div>

      {/* ── Contact & Location ── */}
      <div className="ab-section ab-contact-section">
        <div className="ab-section-header">
          <span className="ab-section-num">02</span>
          <h2>{t('about.contact.title')}</h2>
        </div>
        <div className="ab-contact-grid">
          <div className="ab-contact-info">
            <div className="ab-contact-item">
              <span className="ab-contact-icon">📍</span>
              <div>
                <h3>{lang === 'en' ? 'Address' : 'Dirección'}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{t('about.contact.address')}</p>
              </div>
            </div>
            <div className="ab-contact-item">
              <span className="ab-contact-icon">📞</span>
              <div>
                <h3>{lang === 'en' ? 'Landline' : 'Teléfono Fijo'}</h3>
                <p><a href="tel:+5073104785">{t('about.contact.phone').replace('Landline: ', '').replace('Teléfono fijo: ', '')}</a></p>
              </div>
            </div>
            <div className="ab-contact-item">
              <span className="ab-contact-icon">💬</span>
              <div>
                <h3>WhatsApp</h3>
                <p><a href="https://wa.me/50762166675" target="_blank" rel="noreferrer">+507 6216-6675</a></p>
              </div>
            </div>
          </div>
          <div className="ab-contact-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.195727003886!2d-79.53023992496735!3d8.979174691067272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca88f117c0607%3A0x7d6f55562140a3ec!2sScotia%20Plaza%2C%20Av.%20Federico%20Boyd%2C%20Panam%C3%A1!5e0!3m2!1sen!2spa!4v1717500000000!5m2!1sen!2spa" 
              width="100%" 
              height="350" 
              style={{ border: 0, borderRadius: '12px' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Scotia Plaza Location Map"
            />
          </div>
        </div>
      </div>

      {/* ── Team ── */}
      <div className="ab-section">
        <div className="ab-section-header">
          <span className="ab-section-num">03</span>
          <h2>{t('about.team.header')}</h2>
        </div>
        <div className="ab-team-grid">
          {teamMembers.map(m => (
            <div className="ab-team-card" key={m.name}>
              {m.photo
                ? <img className="ab-team-img" src={m.photo} alt={m.name} />
                : <div className="ab-team-img-placeholder" aria-hidden="true">👤</div>
              }
              <div className="ab-team-body">
                <div className="ab-team-name">{m.name}</div>
                <div className="ab-team-role">{t(m.roleKey)}</div>
                <p className="ab-team-bio">{t(m.bioKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="ab-cta">
        <div className="ab-cta-left">
          <h2>
            {lang === 'en' ? (
              <>Ready to plan<br />your experience?</>
            ) : (
              <>¿Listo para planificar<br />tu experiencia?</>
            )}
          </h2>
          <p>
            {lang === 'en' 
              ? "Talk to our concierge and let's design something remarkable."
              : 'Habla con nuestro conserje y diseñemos algo extraordinario.'}
          </p>
        </div>
        <a
          className="ab-cta-btn"
          href="https://wa.me/50762166675"
          target="_blank"
          rel="noreferrer"
        >
          {lang === 'en' ? 'Contact us on WhatsApp →' : 'Contáctanos por WhatsApp →'}
        </a>
      </div>

    </div>
    </>
  );
}