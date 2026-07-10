import './css/TourCard.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useLang } from '../context/LanguageContext';

interface CarouselProps {
  images: { src: string; alt: string; id?: string }[];
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
            <img 
              className={`tc-card-img ${img.id ? `img-${img.id}` : ''}`} 
              src={img.src} 
              alt={img.alt} 
              loading="lazy" 
            />
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

const sanBlasImages = [
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2FSanblas1.webp?alt=media&token=502492ba-79c1-4fa2-9d63-e1f72092d8d0', alt: 'San Blas Islands' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2FSanblas2.webp?alt=media&token=122d9a06-c962-4756-b7a6-10a2c4c7094e ', alt: 'San Blas turquoise water' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2FSanblas3.jpg?alt=media&token=8ba9aaef-b449-4f7c-950f-6668806f6b93', alt: 'Guna Yala village' },
];
const monkeyImages = [
  { id: 'monkey-1', src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fmonkey1.avif?alt=media&token=6701ca68-1169-4868-9db0-07dbe0839056', alt: 'Monkey on tree' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fmonkey2.jpg?alt=media&token=495e2e95-f44b-4e6b-a0b2-4f4abe1aafbb', alt: 'Howler monkey' },
  { id: 'monkey-3', src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fmonkey3.jpg?alt=media&token=95bb24bc-6ef5-48b1-837d-525d8dd8cd3d' , alt: 'Howler monkey'},
];
const cityImages = [
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Ftourpanama1.webp?alt=media&token=80f0f899-7e29-495b-b9f3-5b95c7b5e828', alt: 'Miraflores Locks' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Ftourpanama2.jpg?alt=media&token=27d424c7-ed8f-485c-8ad8-17a1a141ad50', alt: 'Panama City skyline' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Ftourpanama3.jpg?alt=media&token=f9d864ea-f8db-4cd2-ac35-5531edf1cdad', alt: 'Casco Antiguo' },
];
const portobeloImages = [
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2FPortebelo1.jpg?alt=media&token=19a1838e-819f-4713-b57e-52f5e29f4058', alt: 'Portobelo Forts' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fportobelo2.jpg?alt=media&token=eab93003-7576-47e4-9475-b55c74308f46', alt: 'Portobelo Culture' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fportobelo3.webp?alt=media&token=eb84b355-fd9b-4e28-8e54-1a56fd5c44c2', alt: 'Portobelo Coastline' },
];
const colonImages = [
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fcolon1.jpg?alt=media&token=78e302f3-48ca-4602-8c3d-20008385a907', alt: 'Colón Histórico Tour' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fcolon2.png?alt=media&token=91c488f1-dcc6-4539-b4ae-e174863d3e07', alt: 'San Lorenzo' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fcolon3.webp?alt=media&token=376dfdcd-349a-436c-ad25-8352c24561bc', alt: 'Agua Clara Locks' },
];
const playasImages = [
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fplaya1.jpg?alt=media&token=d36c0fac-0e84-4957-b1ac-c0d4cf5a0f5a', alt: 'Playa Tour Buenaventura' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fplaya2.jpg?alt=media&token=7a170522-76e3-4a9d-af0c-c88af0d62d68', alt: 'Playa Tour Bijao' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fplaya3.jpg?alt=media&token=088d2ea6-3b62-4ddd-b171-d3abf878dea7', alt: 'Playa Tour Decameron' },
];
const emberaImages = [
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fembera.jpeg?alt=media&token=0924aae3-de64-4e4d-9e45-7a9111364300', alt: 'Chagres River' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fembera1.jpg?alt=media&token=fa8766fc-422e-42ab-8180-b0f8fd6ab3ac', alt: 'Embera Cultural Tour' },
  { src: 'https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour%2Fembera2.jpg?alt=media&token=2289fbf3-a1fb-4748-b85d-8bf98626d3e6', alt: 'type' }
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
        <div className="tc-card sanblas">
          <ImageCarousel images={sanBlasImages} />
          <div className="tc-card-body">
            <div className="tc-card-main-info">
              <h3>{t('tours.sanblas.title')}</h3>
              <div className="tc-card-meta">{t('tours.sanblas.meta')}</div>
              <p className="tc-desc">{t('tours.sanblas.desc')}</p>
              <div className="tc-highlights">
                <span className="tc-hl">{t('tours.sanblas.hl1')}</span>
                <span className="tc-hl">{t('tours.sanblas.hl2')}</span>
                <span className="tc-hl">{t('tours.sanblas.hl3')}</span>
                <span className="tc-hl">{t('tours.sanblas.hl4')}</span>
                <span className="tc-hl">{t('tours.sanblas.hl5')}</span>
              </div>
            </div>
            <div className="tc-card-footer">
              <div className="tc-price-block">
                <span className="tc-label">{t('tours.sanblas.price_label')}</span>
                <strong className="tc-amount">{t('tours.sanblas.price')}</strong>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=san-blas')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>
        </div>

        <div className="tc-card monkey">
          <ImageCarousel images={monkeyImages} />
          <div className="tc-card-body">
            <div className="tc-card-main-info">
              <h3>{t('tours.monkey.title')}</h3>
              <div className="tc-card-meta">{t('tours.monkey.meta')}</div>
              <p className="tc-desc">{t('tours.monkey.desc')}</p>
              <div className="tc-highlights">
                <span className="tc-hl">{t('tours.monkey.hl1')}</span>
                <span className="tc-hl">{t('tours.monkey.hl2')}</span>
                <span className="tc-hl">{t('tours.monkey.hl3')}</span>
              </div>
            </div>
            <div className="tc-card-footer">
              <div className="tc-price-block">
                <span className="tc-label">{t('tours.monkey.price_label')}</span>
                <strong className="tc-amount">{t('tours.monkey.price')}</strong>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=monkey-tour')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>
        </div>

        <div className="tc-card colon">
          <ImageCarousel images={colonImages} />
          <div className="tc-card-body">
            <div className="tc-card-main-info">
              <h3>{t('tours.colon.title')}</h3>
              <div className="tc-card-meta">{t('tours.colon.meta')}</div>
              <p className="tc-desc">{t('tours.colon.desc')}</p>
              <div className="tc-highlights">
                <span className="tc-hl">{t('tours.colon.hl1')}</span>
                <span className="tc-hl">{t('tours.colon.hl2')}</span>
                <span className="tc-hl">{t('tours.colon.hl3')}</span>
              </div>
            </div>
            <div className="tc-card-footer">
              <div className="tc-price-block">
                <span className="tc-label">{t('tours.colon.price_label')}</span>
                <strong className="tc-amount">{t('tours.colon.price')}</strong>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=colon')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>
        </div>

        <div className="tc-card city">
          <ImageCarousel images={cityImages} />
          <div className="tc-card-body">
            <div className="tc-card-main-info">
              <h3>{t('tours.city.title')}</h3>
              <div className="tc-card-meta">{t('tours.city.meta')}</div>
              <p className="tc-desc">{t('tours.city.desc')}</p>
              <div className="tc-highlights">
                <span className="tc-hl">{t('tours.city.hl1')}</span>
                <span className="tc-hl">{t('tours.city.hl2')}</span>
                <span className="tc-hl">{t('tours.city.hl3')}</span>
              </div>
            </div>
            <div className="tc-card-footer">
              <div className="tc-price-block">
                <span className="tc-label">{t('tours.city.price_label')}</span>
                <strong className="tc-amount">{t('tours.city.price')}</strong>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=city-tour')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>
        </div>

        <div className="tc-card portobelo">
          <ImageCarousel images={portobeloImages} />
          <div className="tc-card-body">
            <div className="tc-card-main-info">
              <h3>{t('tours.portobelo.title')}</h3>
              <div className="tc-card-meta">{t('tours.portobelo.meta')}</div>
              <p className="tc-desc">{t('tours.portobelo.desc')}</p>
              <div className="tc-highlights">
                <span className="tc-hl">{t('tours.portobelo.hl1')}</span>
                <span className="tc-hl">{t('tours.portobelo.hl2')}</span>
                <span className="tc-hl">{t('tours.portobelo.hl3')}</span>
              </div>
            </div>
            <div className="tc-card-footer">
              <div className="tc-price-block">
                <span className="tc-label">{t('tours.portobelo.price_label')}</span>
                <strong className="tc-amount">{t('tours.portobelo.price')}</strong>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=portobelo')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>
        </div>

        <div className="tc-card embera">
          <ImageCarousel images={emberaImages} />
          <div className="tc-card-body">
            <div className="tc-card-main-info">
              <h3>{t('tours.embera.title')}</h3>
              <div className="tc-card-meta">{t('tours.embera.meta')}</div>
              <p className="tc-desc">{t('tours.embera.desc')}</p>
              <div className="tc-highlights">
                <span className="tc-hl">{t('tours.embera.hl1')}</span>
                <span className="tc-hl">{t('tours.embera.hl2')}</span>
                <span className="tc-hl">{t('tours.embera.hl3')}</span>
                <span className="tc-hl">{t('tours.embera.hl4')}</span>
                <span className="tc-hl">{t('tours.embera.hl5')}</span>
              </div>
            </div>
            <div className="tc-card-footer">
              <div className="tc-price-block">
                <span className="tc-label">{t('tours.embera.price_label')}</span>
                <strong className="tc-amount">{t('tours.embera.price')}</strong>
              </div>
              <button className="tc-btn" onClick={() => navigate('/booking?tour=embera')}>
                {lang === 'en' ? 'Book Now' : 'Reservar Ahora'}
              </button>
            </div>
          </div>
        </div>

        <div className="tc-card playas tc-transfer-card">
          <ImageCarousel images={playasImages} />
          <div className="tc-card-body">
            <div className="tc-card-main-info">
              <span className="tc-transfer-badge">{lang === 'en' ? 'PRIVATE TRANSFER SERVICE' : 'SERVICIO DE TRASLADO PRIVADO'}</span>
              <h3>{t('tours.playas.title')}</h3>
              <div className="tc-card-meta">{t('tours.playas.meta')}</div>
              <p className="tc-desc">{t('tours.playas.desc')}</p>
              <p className="tc-destinations-text">{t('tours.playas.destinations')}</p>
              <div className="tc-highlights">
                <span className="tc-hl">{t('tours.playas.hl1')}</span>
                <span className="tc-hl">{t('tours.playas.hl2')}</span>
                <span className="tc-hl">{t('tours.playas.hl3')}</span>
              </div>
            </div>
            <div className="tc-card-footer">
              <div className="tc-price-block">
                <span className="tc-label">{t('tours.playas.price_label')}</span>
                <strong className="tc-amount">{t('tours.playas.price')}</strong>
              </div>
              <button className="tc-btn tc-btn-transfer" onClick={() => navigate('/booking?tour=playas')}>
                {lang === 'en' ? 'Book Transfer' : 'Reservar Traslado'}
              </button>
            </div>
          </div>
        </div>

        <div className="tc-custom">
          <div className="tc-custom-icon">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/tour_icon.png?alt=media&token=a5665592-cc6e-4789-b099-af1685287203" 
              alt="Check Icon" 
              className="custom-appointment-svg yellow-svg"
            />
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