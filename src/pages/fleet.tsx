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
import imgCheckInstagram from '../assets/check.png'; 

import imgSuburban from '../assets/suburban.avif';
import imgSprinter from '../assets/sprinter.png';
import imgCarens from '../assets/carens.png';
import imgPrado from '../assets/prado.png';
import imgCarnival from '../assets/Carnival.png';
import imgOkavango from '../assets/okavango.png';
import imgTiggo from '../assets/tiggo.png';
import imgXl7 from '../assets/xl7.png';
import imgCoaster from '../assets/coaster.png';
import imgHiace from '../assets/hiace.png';
import imgUniverse from '../assets/universe.png';

interface Vehicle {
  name: string;
  type: 'suv' | 'coaster' | 'vip';
  passengers: string;
  isVip: boolean;
  image: string;
  scaleGroup: 'bus' | 'van' | 'large-suv' | 'compact'; // Nueva propiedad interna para controlar escalas exactas
}

const FLEET_DATA: Vehicle[] = [
  { name: "Chevrolet Suburban", type: "vip", passengers: "6-7", isVip: true, image: imgSuburban, scaleGroup: 'large-suv' },
  { name: "Mercedes-Benz Sprinter", type: "vip", passengers: "14-15", isVip: true, image: imgSprinter, scaleGroup: 'van' },
  { name: "Toyota Prado", type: "vip", passengers: "4-5", isVip: true, image: imgPrado, scaleGroup: 'large-suv' },
  // Kia Carnival actualizada a VIP tal como solicitaste:
  { name: "Kia Carnival", type: "vip", passengers: "7-8", isVip: true, image: imgCarnival, scaleGroup: 'large-suv' },
  { name: "Kia Carens", type: "suv", passengers: "6", isVip: false, image: imgCarens, scaleGroup: 'compact' },
  { name: "Geely Okavango", type: "suv", passengers: "6", isVip: false, image: imgOkavango, scaleGroup: 'compact' },
  { name: "Chery Tiggo 8 Pro", type: "suv", passengers: "6", isVip: false, image: imgTiggo, scaleGroup: 'compact' },
  { name: "Suzuki XL7", type: "suv", passengers: "6", isVip: false, image: imgXl7, scaleGroup: 'compact' },
  { name: "Toyota Coaster", type: "coaster", passengers: "22-26", isVip: false, image: imgCoaster, scaleGroup: 'bus' },
  { name: "Toyota Hiace", type: "coaster", passengers: "14-15", isVip: false, image: imgHiace, scaleGroup: 'van' },
  { name: "Hyundai Universe", type: "coaster", passengers: "45-49", isVip: false, image: imgUniverse, scaleGroup: 'bus' },
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
                  
                  {/* Se modificó el img-holder */}
                  <div className="img-holder">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      loading="lazy" 
                      data-scale={vehicle.scaleGroup} /* Atributo clave inyectado al DOM */
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
                  src={imgCheckInstagram} 
                  alt="Check Icon" 
                  className="perk-png-icon" 
                />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};