import './css/TourCard.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useLang } from '../context/LanguageContext';

import playasImg from '../assets/playas.png';
import colonImg from '../assets/colon.png';
import portobeloImg from '../assets/portobelo.png';

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
      <div
        className="tc-slides"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="tc-slide">
            <img className="tc-card-img" src={img.src} alt={img.alt} />
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

/* ── Image pools per tour ── */
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
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bater%C3%ADa_de_Santiago_en_Portobelo.jpg/1280px-Bater%C3%ADa_de_Santiago_en_Portobelo.jpg?utm_source=es.wikivoyage.org&utm_campaign=parser&utm_content=thumbnail', alt: 'Beach Transfers' },
  { src: 'https://www.thevisitorpanama.info/esp/wp-content/uploads/2024/08/Compress_20240817_235251_1205.jpg', alt: 'Beach Transfers' },
  { src: 'https://e9q4u4m64gi.exactdn.com/wp-content/uploads/2018/01/Portobelo-Panam%C3%A1-e1516284626521.jpg?strip=all', alt: 'Beach Transfers' },


];

const colonImages = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Toma_a%C3%A9rea_del_Fuerte_San_Lorenzo.jpg', alt: 'Colón Histórico Tour' },
  { src: 'https://elcapitalfinanciero.com/wp-content/uploads/2017/07/sanlorenzo3.png' , alt: 'Colón Histórico Tour' },
  { src: 'https://www.viajesyfotografia.com/wp-content/uploads/2016/11/esclusas-agua-clara.jpg', alt: 'Colón Histórico Tour' },
];

const playasImages = [
  { src: 'https://buenaventura.com.pa/wp-content/uploads/2024/06/video-4.jpg', alt: 'Playa Tour' },
  { src: 'https://elcapitalfinanciero.com/wp-content/uploads/2022/12/Evenia-Hotel.jpg', alt: 'Playa Tour' },
  { src: 'https://travelagents.decameron.com/images/destinos/panama/royal-panama/panoramica-hotal-panama.jpg', alt: 'Playa Tour' },

];

export default function Tours() {
  const navigate = useNavigate();
  const { lang, t } = useLang();

  return (
    <div id="tc-header" className="tc-root">
      <div className="tc-header">
        <h2 className='tc-header'>Exclusive Tours</h2>
        <p>Selected premium experiences for corporate and luxury clients.</p>
        <div className="tc-filters">
          {['All', 'Beach', 'Nature', 'Urban'].map(f => (
            <button
              key={f}
              className={`tc-filter ${f === 'All' ? 'active' : ''}`}
              onClick={e => {
                document.querySelectorAll('.tc-filter').forEach(b => b.classList.remove('active'));
                (e.target as HTMLButtonElement).classList.add('active');
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="tc-grid">

        {/* ── San Blas ── */}
        <div className="tc-card sanblas">
          <ImageCarousel images={sanBlasImages} />
          <div className="tc-card-body">
            <div className="tc-badges">
              <span className="tc-badge featured">Featured</span>
              <span className="tc-badge rated">Top Rated</span>
            </div>
            <div className="tc-card-top">
              <h3>Pasadía San Blas 2026</h3>
              <div className="tc-price">
                <span>From</span>
                <strong>$125</strong>
              </div>
            </div>
            <div className="tc-meta">
              <span className="tc-meta-item">⏱ Full day</span>
              <span className="tc-meta-item">👥 Private group</span>
            </div>
            <p className="tc-desc">
              Escape to the paradise of Guna Yala — crystal-clear waters, white sand beaches,
              and a unique indigenous culture across an archipelago of 365 islands.
            </p>
            <div className="tc-tags">
              <span className="tc-tag">4×4 Transport</span>
              <span className="tc-tag">Lunch included</span>
              <span className="tc-tag">Boat rides</span>
            </div>
            <button className="tc-btn" onClick={() => navigate('/booking?tour=san-blas')}>Book Now</button>
          </div>
        </div>

        {/* ── Monkey Tour ── */}
        <div className="tc-card monkey">
          <ImageCarousel images={monkeyImages} />
          <div className="tc-card-body">
            <div className="tc-card-top">
              <h3>Monkey Tour</h3>
              <div className="tc-price"><strong>$65</strong></div>
            </div>
            <div className="tc-meta">
              <span className="tc-meta-item">⏱ Half day</span>
            </div>
            <p className="tc-desc">
              Discover the biodiversity of the Panama Canal and meet its most famous
              residents up close in their natural habitat.
            </p>
            <div className="tc-includes">
              <span className="tc-include">Boat ride on the Canal</span>
              <span className="tc-include">Wildlife spotting</span>
              <span className="tc-include">Hotel pickup &amp; drop-off</span>
            </div>
            <button className="tc-btn" onClick={() => navigate('/booking?tour=monkey-tour')}>Book Now</button>
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
            <p className="tc-desc">
              {t('tours.playas.desc')}
            </p>
            <p className="tc-destinations-text" style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500', marginBottom: '14px' }}>
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
            <p className="tc-desc">
              {t('tours.colon.desc')}
            </p>
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
              <h3>City Tour Panamá</h3>
              <div className="tc-price">
                <span>Up to 3 pax</span>
                <strong>$140</strong>
              </div>
            </div>
            <div className="tc-meta">
              <span className="tc-meta-item">⏱ 5 hours</span>
              <span className="tc-meta-item">🚗 Pro driver</span>
            </div>
            <p className="tc-desc">
              A perfect mix of history, engineering marvels, and modern skyscrapers
              across the highlights of Panama City.
            </p>
            <div className="tc-includes">
              <span className="tc-include">Panama Canal — Miraflores</span>
              <span className="tc-include">Casco Antiguo walking tour</span>
              <span className="tc-include">Amador Causeway &amp; skyline</span>
            </div>
            <button className="tc-btn" onClick={() => navigate('/booking?tour=city-tour')}>Book Now</button>
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
            <p className="tc-desc">
              {t('tours.portobelo.desc')}
            </p>
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

        {/* ── Custom ── */}
        <div className="tc-custom">
          <div className="tc-custom-icon">✦</div>
          <h3>Need a Custom Experience?</h3>
          <p>
            We specialize in tailoring luxury tours for corporate retreats,
            family gatherings, and VIP guests.
          </p>
          <a href="https://wa.me/50762166675" target="_blank" rel="noreferrer">
            Contact our Concierge →
          </a>
        </div>

      </div>
    </div>
  );
}