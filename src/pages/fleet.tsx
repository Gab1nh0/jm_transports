import React, { useState, useRef } from 'react';
import { FaUsers, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'; 
import type { Swiper as SwiperType } from 'swiper';
import { useLang } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination'; 
import './css/fleet.css';

interface Vehicle {
  name: string;
  type: 'suv' | 'coaster' | 'vip';
  passengers: string;
  isVip: boolean;
  image: string;
  scaleGroup: 'bus' | 'van' | 'large-suv' | 'compact'; 
}

const FLEET_DATA: Vehicle[] = [
  { name: "Chevrolet Suburban", type: "vip", passengers: "6-7", isVip: true, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Fsuburban.avif?alt=media&token=1a6b24d2-f7b6-4a89-86d0-66574c68e71b", scaleGroup: 'large-suv' },
  { name: "Mercedes-Benz Sprinter", type: "vip", passengers: "14-15", isVip: true, image:"https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Fsprinter.png?alt=media&token=f913b809-9f27-44ee-a7f3-ba88eb8faa16", scaleGroup: 'van' },
  { name: "Toyota Prado", type: "vip", passengers: "4-5", isVip: true, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Fprado.png?alt=media&token=f459288e-f960-4f05-a06b-f3f81f2a0423", scaleGroup: 'large-suv' },
  { name: "Kia Carnival", type: "vip", passengers: "7-8", isVip: true, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2FCarnival.png?alt=media&token=394cf5b0-844c-4c1b-b3c5-55bbfcab129e", scaleGroup: 'large-suv' },
  { name: "Geely Okavango", type: "suv", passengers: "6", isVip: false, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Fokavango.png?alt=media&token=b2492ee7-8339-435a-a0bc-65d245b51fc2", scaleGroup: 'compact' },
  { name: "Chery Tiggo 8 Pro", type: "suv", passengers: "6", isVip: false, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Ftiggo.png?alt=media&token=509a04d8-f27f-422c-a1f8-af526b347d54", scaleGroup: 'compact' },
  { name: "Kia Carens", type: "suv", passengers: "6", isVip: false, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Fcarens.png?alt=media&token=a08e24d4-caa6-49ab-a9b3-c796723bd74e", scaleGroup: 'compact' },
  { name: "Suzuki XL7", type: "suv", passengers: "6", isVip: false, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Fxl7.png?alt=media&token=1151f2ec-1dd8-4d4e-827f-64c5f1d18f5e", scaleGroup: 'compact' },
  { name: "Toyota Hiace", type: "coaster", passengers: "14-15", isVip: false, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Fhiace.png?alt=media&token=2a6c61b3-32f5-4c69-8e60-70625311a903", scaleGroup: 'van' },
  { name: "Toyota Coaster", type: "coaster", passengers: "22-26", isVip: false, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Fcoaster.png?alt=media&token=c8e55f54-c888-4235-97e4-a4617f9fd1bc", scaleGroup: 'bus' },
  { name: "Hyundai Universe", type: "coaster", passengers: "45-49", isVip: false, image: "https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/fleet%2Funiverse.png?alt=media&token=92555ba5-3fb1-4f8d-9372-bc73ed894e36", scaleGroup: 'bus' },
];

export const FleetSection: React.FC = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'suv' | 'coaster' | 'vip'>('all');
  const swiperRef = useRef<SwiperType | null>(null);

  const handleBookVehicle = (vehicleName: string) => {
    const slug = vehicleName.toLowerCase().replace(/[\s-]+/g, '-').replace(/[^a-z0-9-]/g, '');
    navigate(`/booking?tour=${slug}`);
  };

  const INCLUDED_BENEFITS = [
    t('fleet.benefit.ac'),
    t('fleet.benefit.tracking'),
    t('fleet.benefit.luggage'),
    t('fleet.benefit.water'),
    t('fleet.benefit.seats'),
    t('fleet.benefit.drivers'),
  ];

  const filteredVehicles = activeFilter === 'all' 
    ? FLEET_DATA 
    : FLEET_DATA.filter(v => v.type === activeFilter || (activeFilter === 'vip' && v.isVip));

  return (
    <section className="fleet-section" id="fleet-section">
      <div className="fleet-container">
        
        {/* ENCABEZADO */}
        <div className="fleet-header">
          <span className="subtitle">{t('fleet.header.subtitle')}</span>
          <h2>{t('fleet.header.title')}</h2>
          <p>{t('fleet.header.desc')}</p>
        </div>

        {/* FILTROS */}
        <div className="fleet-filters">
          <button className={activeFilter === 'all' ? 'active' : ''} onClick={() => setActiveFilter('all')}>
            {t('fleet.filter.all')}
          </button>
          <button className={activeFilter === 'suv' ? 'active' : ''} onClick={() => setActiveFilter('suv')}>
            {t('fleet.filter.suv')}
          </button>
          <button className={activeFilter === 'coaster' ? 'active' : ''} onClick={() => setActiveFilter('coaster')}>
            {t('fleet.filter.coaster')}
          </button>
          <button className={activeFilter === 'vip' ? 'active' : ''} onClick={() => setActiveFilter('vip')}>
            {t('fleet.filter.vip')}
          </button>
        </div>

        {/* CONTENEDOR DINÁMICO */}
        <div className="fleet-display-wrapper">
          
          {/* BOTONES DEL CARRUSEL */}
          {activeFilter === 'all' && (
            <>
              <button 
                className="carousel-arrow left" 
                onClick={() => swiperRef.current?.slidePrev()} 
                aria-label="Scroll left"
              >
                <FaChevronLeft />
              </button>
              <button 
                className="carousel-arrow right" 
                onClick={() => swiperRef.current?.slideNext()} 
                aria-label="Scroll right"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
            key={activeFilter} 
            spaceBetween={24}
            speed={800}
            touchReleaseOnEdges={true}
            resistanceRatio={0.5}
            loop={activeFilter === 'all'} 
            autoplay={
              activeFilter === 'all'
                ? {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              0: { slidesPerView: 1.15, spaceBetween: 16, allowTouchMove: true },
              640: { slidesPerView: 1.6, spaceBetween: 20, allowTouchMove: true },
              850: { slidesPerView: 2.3, allowTouchMove: true },
              1100: { slidesPerView: 3.2, allowTouchMove: activeFilter === 'all' }
            }}
            className={`fleet-swiper-container ${activeFilter === 'all' ? 'is-carousel' : 'is-grid'}`}
          >
            {filteredVehicles.map((vehicle, index) => (
              <SwiperSlide key={index}>
                <div className="vehicle-card-premium">
                  {vehicle.isVip && <div className="vip-tag-badge">{t('fleet.vip.tag')}</div>}
                  
                  <div className="img-holder">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      loading="lazy" 
                      data-scale={vehicle.scaleGroup} 
                    />
                  </div>

                  <div className="card-details">
                    <h3>{vehicle.name}</h3>
                    <div className="passenger-count">
                      <FaUsers className="icon" />
                      <span>
                        {lang === 'en' 
                          ? `Up to ${vehicle.passengers} passengers` 
                          : `Hasta ${vehicle.passengers} pasajeros`}
                      </span>
                    </div>
                    <button className="book-vehicle-btn" onClick={() => handleBookVehicle(vehicle.name)}>
                      {t('fleet.book.btn')}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* SECCIÓN BENEFICIOS */}
        <div className="fleet-perks-showcase">
          <h3>{t('fleet.perks.title')}</h3>
          <div className="perks-grid">
            {INCLUDED_BENEFITS.map((benefit, idx) => (
              <div key={idx} className="perk-card-item">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/check.png?alt=media&token=9ddfa5bf-b03b-4452-b878-90943868defa"
                  alt="Check Icon" 
                  className="perk-png-icon" 
                />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Nota Informativa Discreta e Integral del Cierre de Sección ── */}
        <div className="fleet-disclaimer-note">
          <p>
            {lang === 'en' 
              ? 'Images are for reference only. The assigned vehicle may vary depending on availability, the reserved category, and the specific requirements of your service.' 
              : 'Las imágenes son referenciales. El vehículo asignado puede variar según disponibilidad, la categoría reservada y los requerimientos específicos del servicio.'}
          </p>
        </div>

      </div>
    </section>
  );
};