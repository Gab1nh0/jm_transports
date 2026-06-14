import './css/about_us.css';
import { useState, useEffect } from 'react';
import Navbarwhite from '../components/navbar_fondo.tsx';
import Footer from '../components/footer.tsx';
import { useLang } from '../context/LanguageContext';

export default function AboutUs() {
  const { lang, t } = useLang();

  // Estados del Formulario de Contacto
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Número de WhatsApp oficial de la empresa
  const companyPhone = '50762166675';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // 1. Funcionalidad optimizada para el botón directo de WhatsApp Concierge
  const handleConciergeRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const genericMessage = lang === 'en'
      ? 'Hello, JM Transport Group!  I would like to request premium concierge assistance to coordinate a private transfer in Panama.'
      : '¡Hola, JM Transport Group!  Me gustaría solicitar asistencia personalizada de conserjería para coordinar un traslado privado en Panamá.';

    const encodedMessage = encodeURIComponent(genericMessage);
    window.open(`https://wa.me/${companyPhone}?text=${encodedMessage}`, '_blank');
  };

  // 2. Funcionalidad optimizada para los datos estructurados del Formulario
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      alert(lang === 'en' ? 'Please share your name and requirements.' : 'Por favor, comparte tu nombre y tus requerimientos.');
      return;
    }

    const emailText = email.trim() ? email.trim() : (lang === 'en' ? 'Not provided 💬' : 'No provisto 💬');
    
    const structuredLines = lang === 'en' ? [
      '⚡ *NEW PRIVATE TRANSPORT INQUIRY* ⚡',
      '__________________________________________',
      '',
      `👤 *Name:* ${name.trim()}`,
      `📧 *Email:* ${emailText}`,
      '',
      '📝 *Requested Logistics / Details:*',
      `${message.trim()}`,
      '',
      '__________________________________________',
      ' *JM Transport Group* — *Panama Premium Mobility*'
    ] : [
      ' *NUEVA SOLICITUD DE TRANSPORTE PRIVADO* ',
      '__________________________________________',
      '',
      ` *Nombre:* ${name.trim()}`,
      ` *Correo:* ${emailText}`,
      '',
      ' *Detalles de Logística / Solicitud:*',
      `${message.trim()}`,
      '',
      '__________________________________________',
      ' *JM Transport Group* — *Movilidad Premium en Panamá*'
    ];

    const encodedFormMessage = encodeURIComponent(structuredLines.join('\n'));
    window.open(`https://wa.me/${companyPhone}?text=${encodedFormMessage}`, '_blank');
  };

  return (
    <>
      <Navbarwhite />
      <div className="ab-luxury-viewport">

        {/* ── 1. CINEMATIC HERO CANVAS ── */}
        <section className="ab-hero-canvas ab-animate-fade-in">
          <div className="ab-canvas-container">
            <span className="ab-meta-tag">{t('about.eyebrow')}</span>
            
            <h1 className="ab-massive-display">
              {lang === 'en' ? (
                <>WE MOVE <span className="ab-stroke-text">STANDARDS</span><br />NOT JUST VEHICLES.</>
              ) : (
                <>MOVEMOS <span className="ab-stroke-text">ESTÁNDARES</span><br />NO SOLO AUTOS.</>
              )}
            </h1>

            <div className="ab-hero-split-block">
              <div className="ab-hero-image-wrapper">
                <img src="https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/kunayala53925.jpg?alt=media&token=c5111d87-fbb1-48d0-83f6-3f75ab1ca004" alt="Panama Luxury Transit" />
                <div className="ab-hero-gradient-shield" />
              </div>
              
              <div className="ab-hero-editorial-card">
                <p className="ab-lead-editorial-text">
                  {t('about.hero.desc')}
                </p>
                
                <div className="ab-editorial-metrics">
                  <div className="ab-metric-node">
                    <span className="ab-node-num">12<span className="ab-node-mini">YRS</span></span>
                    <span className="ab-node-label">{t('about.stats.exp')}</span>
                  </div>
                  <div className="ab-metric-node">
                    <span className="ab-node-num">4<span className="ab-node-mini">K+</span></span>
                    <span className="ab-node-label">{t('about.stats.guests')}</span>
                  </div>
                  <div className="ab-metric-node">
                    <span className="ab-node-num">100%</span>
                    <span className="ab-node-label">{lang === 'en' ? 'Reliability' : 'Confianza'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. SECCIÓN HISTORIA ── */}
        <section className="ab-chronology-section">
          <div className="ab-canvas-container">
            <div className="ab-giant-num-tracker light-version">
              <span>01</span>
              <h2>{t('about.story.header')}</h2>
            </div>

            <div className="ab-chronology-strip">
              <div className="ab-chrono-panel">
                <div className="ab-panel-top">
                  <span className="ab-panel-year">{t('about.story.year1')}</span>
                  <div className="ab-panel-line-indicator" />
                </div>
                <h3>{t('about.story.title1')}</h3>
                <p>{t('about.story.desc1')}</p>
              </div>

              <div className="ab-chrono-panel highlighted">
                <div className="ab-panel-top">
                  <span className="ab-panel-year active">{t('about.story.year2')}</span>
                  <div className="ab-panel-line-indicator active" />
                </div>
                <h3>{t('about.story.title2')}</h3>
                <p>{t('about.story.desc2')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. OUR PURPOSE ── */}
        <section className="ab-pillars-section">
          <div className="ab-canvas-container">
            <div className="ab-giant-num-tracker">
              <span>02</span>
              <h2>{lang === 'en' ? 'The Foundations' : 'Los Fundamentos'}</h2>
            </div>

            <div className="ab-pillars-editorial-grid">
              <div className="ab-pillar-row">
                <div className="ab-pillar-meta">/ 01 . COMMITMENT</div>
                <div className="ab-pillar-main">
                  <h3>{lang === 'en' ? 'Unwavering Integrity' : 'Integridad Inquebrantable'}</h3>
                  <p>{lang === 'en' ? 'We operate with transparent communication, direct human support, and absolute loyalty to our clients convenience.' : 'Operamos bajo una comunicación transparente, soporte humano directo y una lealtad absoluta hacia la comodidad de nuestros clientes.'}</p>
                </div>
              </div>

              <div className="ab-pillar-row active-row">
                <div className="ab-pillar-meta">/ 02 . RIGOR</div>
                <div className="ab-pillar-main">
                  <h3>{lang === 'en' ? 'Flawless Execution' : 'Ejecución Impecable'}</h3>
                  <p>{lang === 'en' ? 'Strict punctuality, routes fully verified by active operators, and vehicles prepared to strict detailing standards.' : 'Puntualidad rigurosa, rutas validadas previamente por operadores activos y vehículos preparados bajo estrictos estándares de limpieza.'}</p>
                </div>
              </div>

              <div className="ab-pillar-row">
                <div className="ab-pillar-meta">/ 03 . PRIVACY</div>
                <div className="ab-pillar-main">
                  <h3>{lang === 'en' ? 'Discreet Chauffeur Protocol' : 'Protocolo Discreto de Conducción'}</h3>
                  <p>{lang === 'en' ? 'Our elite professional drivers are fully bilingual and trained in premium corporate confidentiality manners.' : 'Nuestros conductores profesionales de élite son completamente bilingües y están formados bajo estrictas normas de confidencialidad.'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. TEAM SECTION ── */}
        <section className="ab-collective-section">
          <div className="ab-canvas-container">
            <div className="ab-collective-split-layout">
              
              <div className="ab-collective-text">
                <div className="ab-giant-num-tracker inline light-version">
                  <span>03</span>
                  <h2>{t('about.team.header')}</h2>
                </div>
                <h3>{lang === 'en' ? 'One collective family driving your experience' : 'Una sola familia impulsando tu experiencia'}</h3>
                <p className="ab-collective-lead">
                  {lang === 'en'
                    ? 'True safety is not a product of luck; it is the result of collective discipline. Our concierge support desks, operations coordinators, and elite bilingually trained drivers operate as a single synchronized shield.'
                    : 'La verdadera seguridad no es producto del azar; es el resultado de una disciplina colectiva. Nuestro centro de operaciones, coordinadores de logística y conductores bilingües de élite operan como un solo bloque sincronizado.'}
                </p>
                <div className="ab-editorial-list-stack">
                  <div className="ab-editorial-list-item"><span className="ab-list-bullet">—</span> {lang === 'en' ? 'Corporate Protocol and NDA Compliance' : 'Protocolo Corporativo Ejecutivo y Cumplimiento de NDA'}</div>
                  <div className="ab-editorial-list-item"><span className="ab-list-bullet">—</span> {lang === 'en' ? 'Bilingual Drivers and Concierge Assistance' : 'Conductores Profesionales Bilingües y Asistencia de Conserjería'}</div>
                  <div className="ab-editorial-list-item"><span className="ab-list-bullet">—</span> {lang === 'en' ? 'Real-time GPS Operations Tracking' : 'Seguimiento Logístico de Rutas Mediante GPS en Tiempo Real'}</div>
                </div>
              </div>

              <div className="ab-collective-visual-side-composite">
                <div className="ab-editorial-composite-frame">
                  <img className="ab-composite-main-img" src="https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/kunayala53925.jpg?alt=media&token=c5111d87-fbb1-48d0-83f6-3f75ab1ca004" alt="JM Premium Fleet Base" />
                  <div className="ab-composite-overlap-card">
                    <img src="https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/kunayala53925.jpg?alt=media&token=c5111d87-fbb1-48d0-83f6-3f75ab1ca004" alt="JM Executive Detail" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 5. CONTACT & LOCATION ARCHITECTURAL SPLIT ── */}
        <section className="ab-contact-architecture-section">
          <div className="ab-canvas-container">
            <div className="ab-giant-num-tracker">
              <span>04</span>
              <h2>{t('about.contact.title')}</h2>
            </div>

            <div className="ab-architecture-contact-split">
              
              <div className="ab-form-side-pane">
                <div className="ab-fine-details-row">
                  <div className="ab-fine-block">
                    <h5>{lang === 'en' ? 'HQ Location' : 'Sede Principal'}</h5>
                    <p style={{ whiteSpace: 'pre-line' }}>{t('about.contact.address')}</p>
                  </div>
                  <div className="ab-fine-block">
                    <h5>{lang === 'en' ? 'Channels' : 'Canales Directos'}</h5>
                    <p><a href="tel:+5073104785" className="ab-stark-link">{t('about.contact.phone').replace('Landline: ', '').replace('Teléfono fijo: ', '')}</a></p>
                    {/* Disparador de WhatsApp */}
                    <a href="#" onClick={handleConciergeRedirect} className="ab-tertiary-action-pill">
                      <span className="ab-pulse-amber-dot" /> WhatsApp Concierge 24/7
                    </a>
                  </div>
                </div>

                <form className="ab-stark-form" onSubmit={handleContactSubmit}>
                  <div className="ab-stark-row-twin">
                    <div className="ab-stark-group">
                      <input type="text" placeholder={lang === 'en' ? 'Name *' : 'John Doe *'} value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="ab-stark-group">
                      <input type="email" placeholder={lang === 'en' ? 'Email' : 'client@Example.com'} value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="ab-stark-group">
                    <textarea placeholder={lang === 'en' ? 'Describe your destination or logistics request... *' : 'Describa su solicitud logística o ruta comercial... *'} value={message} onChange={e => setMessage(e.target.value)} required />
                  </div>
                  <button type="submit" className="ab-stark-submit-btn">
                    {lang === 'en' ? 'Initiate Private Coordination' : 'Iniciar Coordinación'}
                  </button>
                </form>
              </div>

              <div className="ab-map-side-pane">
                <div className="ab-map-stark-wrapper">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.195727003886!2d-79.53023992496735!3d8.979174691067272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca88f117c0607%3A0x7d6f55562140a3ec!2sScotia%20Plaza%2C%20Av.%20Federico%20Boyd%2C%20Panam%C3%A1!5e0!3m2!1sen!2spa!4v1717500000000!5m2!1sen!2spa" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    title="Scotia Plaza Location Architectural Map"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}