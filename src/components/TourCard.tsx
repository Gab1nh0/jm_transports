import './css/TourCard.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useLang } from '../context/LanguageContext';

interface CarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
}

function ImageCarousel({ images, className = '' }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isHovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % images.length);
      }, 1800);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isHovered) setCurrent(0);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, images.length]);

  return (
    <div
      className={`tc-carousel ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* El wrapper con width = N * 100% y cada slide ocupa exactamente 1/N */}
      <div
        className="tc-slides"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${current * (100 / images.length)}%)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="tc-slide"
            style={{ width: `${100 / images.length}%` }}
          >
            <img className="tc-card-img" src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="tc-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`tc-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Imágenes ── */
const sanBlasImages = [
  { src: 'https://i0.wp.com/panamamastertours.com/wp-content/uploads/2023/08/panama-city-4-day-island-hopping-san-blas-adventure-1695289.webp?fit=1500%2C1001&ssl=1', alt: 'San Blas Islands' },
  { src: 'https://sanblasadventours.com/wp-content/uploads/AnyConv.com__psina-5-scaled.webp', alt: 'San Blas turquoise water' },
  { src: 'https://sanblasdreams.com/wp-content/uploads/2024/02/Diablo-Island-San-Blas-Tour-with-San-Blas-Dreams.jpg', alt: 'Guna Yala village' },
];
const monkeyImages = [
  { src: 'https://img.magnific.com/foto-gratis/macaco-cola-munon-cara-roja-selva-verde_475641-1561.jpg?semt=ais_hybrid&w=740&q=80', alt: 'Monkey on tree' },
  { src: 'https://elfarodelcanal.com/wp-content/uploads/2022/07/mono-arana.jpg', alt: 'Howler monkey' },
  { src: 'https://www.panamacanal-excursions.com/images/monkeyisland/monkey1_h.jpg', alt: 'Panama Canal rainforest' },
];
const cityImages = [
  { src: 'https://media.admagazine.com/photos/6298ea6145a759381146b164/16:9/w_2991,h_1682,c_limit/panama-1.jpg', alt: 'Miraflores Locks' },
  { src: 'https://media.istockphoto.com/id/1097678776/es/foto/skyline-ciudad-de-panam%C3%A1.jpg?s=612x612&w=0&k=20&c=HIF5ggcAMc_0VCkUxnun1dwEpoXV29FYrBpBzVOHD88=', alt: 'Panama City skyline' },
  { src: 'https://balaena.travel/storage/header_bookable_category-photos-b3bdd95d-de9c-4444-9d28-efa1eb0f14ed', alt: 'Casco Antiguo' },
];
const portobeloImages = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bater%C3%ADa_de_Santiago_en_Portobelo.jpg/1280px-Bater%C3%ADa_de_Santiago_en_Portobelo.jpg', alt: 'Portobelo Forts' },
  { src: 'https://www.thevisitorpanama.info/esp/wp-content/uploads/2024/08/Compress_20240817_235251_1205.jpg', alt: 'Portobelo Culture' },
  { src: 'https://e9q4u4m64gi.exactdn.com/wp-content/uploads/2018/01/Portobelo-Panam%C3%A1-e1516284626521.jpg?strip=all', alt: 'Portobelo Coastline' },
];
const colonImages = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Toma_a%C3%A9rea_del_Fuerte_San_Lorenzo.jpg', alt: 'Colón Histórico Tour' },
  { src: 'https://elcapitalfinanciero.com/wp-content/uploads/2017/07/sanlorenzo3.png', alt: 'San Lorenzo' },
  { src: 'https://www.viajesyfotografia.com/wp-content/uploads/2016/11/esclusas-agua-clara.jpg', alt: 'Agua Clara Locks' },
];
const playasImages = [
  { src: 'https://buenaventura.com.pa/wp-content/uploads/2024/06/video-4.jpg', alt: 'Playa Tour Buenaventura' },
  { src: 'https://elcapitalfinanciero.com/wp-content/uploads/2022/12/Evenia-Hotel.jpg', alt: 'Playa Tour Bijao' },
  { src: 'https://travelagents.decameron.com/images/destinos/panama/royal-panama/panoramica-hotal-panama.jpg', alt: 'Playa Tour Decameron' },
];



export default function Tours() {
  const navigate = useNavigate();
  const { lang, t } = useLang();
  return (
    <div className="tc-root" id="tc-header">
      <div className="tc-header">
        <span className="subtitle tc-yellow-subtitle">{t('tours.header.subtitle')}</span>
        <h2>{t('tours.header.title')}</h2>
        <p>{t('tours.header.desc')}</p>
      </div>

      <div className="tc-grid">

        {/* ── San Blas ── */}
                  <div className="tc-card sanblas">
            <ImageCarousel images={sanBlasImages} />
            <div className="tc-card-body">
              <div className="tc-badges">
                <span className="tc-badge featured">{t('tours.sanblas.badge1')}</span>
                <span className="tc-badge rated">{t('tours.sanblas.badge2')}</span>
              </div>
              <div className="tc-card-top">
                <h3>{t('tours.sanblas.title')}</h3>
                <div className="tc-price">
                  <span>{lang === 'en' ? 'From' : 'Desde'}</span>
                  <strong>$125</strong>
                </div>
              </div>
              <div className="tc-meta">
                <span className="tc-meta-item">⏱ {t('tours.sanblas.meta1')}</span>
                <span className="tc-meta-item">👥 {t('tours.sanblas.meta2')}</span>
              </div>
              <p className="tc-desc">{t('tours.sanblas.desc')}</p>
              <div className="tc-tags">
                <span className="tc-tag">{t('tours.sanblas.tag1')}</span>
                <span className="tc-tag">{t('tours.sanblas.tag2')}</span>
                <span className="tc-tag">{t('tours.sanblas.tag3')}</span>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=san-blas')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>

        {/* ── Monkey Tour ── */}
                  <div className="tc-card monkey">
            <ImageCarousel images={monkeyImages} />
            <div className="tc-card-body">
              <div className="tc-card-top">
                <h3>{t('tours.monkey.title')}</h3>
                <div className="tc-price"><strong>$65</strong></div>
              </div>
              <div className="tc-meta">
                <span className="tc-meta-item">⏱ {t('tours.monkey.price_label')}</span>
              </div>
              <p className="tc-desc">{t('tours.monkey.desc')}</p>
              <div className="tc-includes">
                <span className="tc-include">{t('tours.monkey.inc1')}</span>
                <span className="tc-include">{t('tours.monkey.inc2')}</span>
                <span className="tc-include">{t('tours.monkey.inc3')}</span>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=monkey-tour')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>

        {/* ── Beach Transfers ── */}
                  <div className="tc-card playas">
            <ImageCarousel images={playasImages} />
            <div className="tc-card-body">
              <div className="tc-card-top">
                <h3>{t('tours.playas.title')}</h3>
                <div className="tc-price">
                  <span>{t('tours.playas.price_label')}</span>
                  <strong>{t('tours.playas.price')}</strong>
                </div>
              </div>
              <div className="tc-meta">
                <span className="tc-meta-item">⏱ Oneway / Roundtrip</span>
                <span className="tc-meta-item">👥 Private</span>
              </div>
              <p className="tc-desc">{t('tours.playas.desc')}</p>
              <p className="tc-destinations-text">
                <strong>{lang === 'en' ? 'Destinations:' : 'Destinos:'}</strong> RIU Playa Blanca, Gran Evenia Bijao, Decameron, Buenaventura.
              </p>
              <div className="tc-tags">
                <span className="tc-tag">{t('tours.playas.tag1')}</span>
                <span className="tc-tag">{t('tours.playas.tag2')}</span>
                <span className="tc-tag">{t('tours.playas.tag3')}</span>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=playas')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>

        {/* ── Historic Colon ── */}
                  <div className="tc-card colon">
            <ImageCarousel images={colonImages} />
            <div className="tc-card-body">
              <div className="tc-card-top">
                <h3>{t('tours.colon.title')}</h3>
                <div className="tc-price">
                  <span>{t('tours.colon.price_label')}</span>
                  <strong>{t('tours.colon.price')}</strong>
                </div>
              </div>
              <div className="tc-meta">
                <span className="tc-meta-item">⏱ Full day</span>
                <span className="tc-meta-item">🚗 Private Tour</span>
              </div>
              <p className="tc-desc">{t('tours.colon.desc')}</p>
              <div className="tc-includes">
                <span className="tc-include">{t('tours.colon.inc1')}</span>
                <span className="tc-include">{t('tours.colon.inc2')}</span>
                <span className="tc-include">{t('tours.colon.inc3')}</span>
                <span className="tc-include">{t('tours.colon.inc4')}</span>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=colon')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>

        {/* ── City Tour ── */}
                  <div className="tc-card city">
            <ImageCarousel images={cityImages} />
            <div className="tc-card-body">
              <div className="tc-card-top">
                <h3>{t('tours.city.title')}</h3>
                <div className="tc-price">
                  <span>{t('tours.city.price_label')}</span>
                  <strong>{t('tours.city.price')}</strong>
                </div>
              </div>
              <div className="tc-meta">
                <span className="tc-meta-item">⏱ {t('tours.city.meta1')}</span>
                <span className="tc-meta-item">🚗 {t('tours.city.meta2')}</span>
              </div>
              <p className="tc-desc">{t('tours.city.desc')}</p>
              <div className="tc-includes">
                <span className="tc-include">{t('tours.city.inc1')}</span>
                <span className="tc-include">{t('tours.city.inc2')}</span>
                <span className="tc-include">{t('tours.city.inc3')}</span>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=city-tour')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>

        {/* ── Portobelo ── */}
                  <div className="tc-card portobelo">
            <ImageCarousel images={portobeloImages} />
            <div className="tc-card-body">
              <div className="tc-card-top">
                <h3>{t('tours.portobelo.title')}</h3>
                <div className="tc-price">
                  <span>{t('tours.portobelo.price_label')}</span>
                  <strong>{t('tours.portobelo.price')}</strong>
                </div>
              </div>
              <div className="tc-meta">
                <span className="tc-meta-item">⏱ Full day</span>
                <span className="tc-meta-item">⛵ Adventure</span>
              </div>
              <p className="tc-desc">{t('tours.portobelo.desc')}</p>
              <div className="tc-includes">
                <span className="tc-include">{t('tours.portobelo.inc1')}</span>
                <span className="tc-include">{t('tours.portobelo.inc2')}</span>
                <span className="tc-include">{t('tours.portobelo.inc3')}</span>
                <span className="tc-include">{t('tours.portobelo.inc4')}</span>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=portobelo')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>

        {/* ── Custom Experience ── */}
        <div className="tc-custom">
          <div className="tc-custom-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="custom-appointment-svg yellow-svg">
              <path d="M16 2v4M8 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              <circle cx="12" cy="14" r="2" />
              <path d="M16 19c0-1.5-1.5-2.5-4-2.5s-4 1-4 2.5" />
            </svg>
          </div>
          <h3>{lang === 'en' ? 'Need a Custom Experience?' : '¿Necesitas una Experiencia Personalizada?'}</h3>
          <p>
            {lang === 'en'
              ? 'We specialize in tailoring luxury tours for corporate retreats, family gatherings, and VIP guests.'
              : 'Nos especializamos en diseñar tours de lujo para retiros corporativos, reuniones familiares e invitados VIP.'}
          </p>
          <a href="https://wa.me/50762166675" target="_blank" rel="noreferrer" className="tc-green-tornasol-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="tc-wa-icon">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            {lang === 'en' ? 'Contact Support' : 'Contactar Soporte'}
          </a>
        </div>

      </div>
    </div>
  );
}