import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaUsers, FaCheckCircle } from 'react-icons/fa';
import './css/fleet.css';

// NOTA: Recuerda importar o ajustar las rutas de tus imágenes cuando las tengas listas
import imgSuburban from '../assets/suburban.avif';
import imgSprinter from '../assets/sprinter.png';
import imgCarens from '../assets/carens.webp';
import imgPrado from '../assets/prado.png';
import imgCarnival from '../assets/carnival.avif';
import imgOkavango from '../assets/okavango.webp';
import imgTiggo from '../assets/tiggo.avif';
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
}

const FLEET_DATA: Vehicle[] = [
  { name: "Chevrolet Suburban", type: "vip", passengers: "6-7", isVip: true, image: imgSuburban },
  { name: "Mercedes-Benz Sprinter", type: "vip", passengers: "14-15", isVip: true, image: imgSprinter },
  { name: "Toyota Prado", type: "vip", passengers: "4-5", isVip: true, image: imgPrado },
  { name: "Kia Carens", type: "suv", passengers: "6", isVip: false, image: imgCarens },
  { name: "Kia Carnival", type: "suv", passengers: "7-8", isVip: false, image: imgCarnival },
  { name: "Geely Okavango", type: "suv", passengers: "6", isVip: false, image: imgOkavango },
  { name: "Chery Tiggo 8 Pro", type: "suv", passengers: "6", isVip: false, image: imgTiggo },
  { name: "Suzuki XL7", type: "suv", passengers: "6", isVip: false, image: imgXl7 },
  { name: "Toyota Coaster", type: "coaster", passengers: "22-26", isVip: false, image: imgCoaster },
  { name: "Toyota Hiace", type: "coaster", passengers: "14-15", isVip: false, image: imgHiace },
  { name: "Hyundai Universe", type: "coaster", passengers: "45-49", isVip: false, image: imgUniverse },
];

const INCLUDED_BENEFITS = [
  "Full Air Conditioning",
  "Real-Time Flight Tracking",
  "Luggage Assistance",
  "Complimentary Bottled Water & Snacks",
  "Child Seats Available Upon Request",
  "Bilingual Professional Drivers"
];

export const FleetSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'suv' | 'coaster' | 'vip'>('all');
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredVehicles = activeFilter === 'all' 
    ? FLEET_DATA 
    : FLEET_DATA.filter(v => v.type === activeFilter || (activeFilter === 'vip' && v.isVip));

  // Función lógica para mover el carrusel
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 370; // Ancho aproximado de la tarjeta + gap
      const container = carouselRef.current;
      
      if (direction === 'left') {
        // Si está al puro inicio y va a la izquierda, salta al final (Ciclo Infinito)
        if (container.scrollLeft <= 0) {
          container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        // Si llegó al final y va a la derecha, regresa al puro inicio (Ciclo Infinito)
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  // Función para arrancar el Autoplay automático
  const startAutoplay = () => {
    stopAutoplay(); // Limpia cualquier timer activo previo por seguridad
    if (activeFilter === 'all') {
      autoplayTimerRef.current = setInterval(() => {
        scrollCarousel('right');
      }, 3500); // Se mueve automáticamente cada 3.5 segundos
    }
  };

  // Función para detener el Autoplay (cuando el usuario interactúa)
  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
  };

  // Efecto para controlar el ciclo de vida del Autoplay
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); // Limpieza al desmontar el componente
  }, [activeFilter]); // Se reinicia si el usuario cambia el filtro

  // Manejador para cuando el usuario hace clic manual en las flechas
  const handleManualScroll = (direction: 'left' | 'right') => {
    scrollCarousel(direction);
    // Pausa el autoplay un momento para que no salte toscamente justo después del clic
    startAutoplay(); 
  };

  return (
    <section className="fleet-section">
      <div className="fleet-container">
        
        {/* Encabezado */}
        <div className="fleet-header">
          <span className="subtitle">OUR FLEET</span>
          <h2>Travel with Style, Comfort & Security</h2>
          <p>
            Discover our diverse lineup of modern, impeccably maintained vehicles tailored 
            to match your exact corporate, group, or VIP transportation requirements in Panama.
          </p>
        </div>

        {/* Filtros */}
        <div className="fleet-filters">
          <button className={activeFilter === 'all' ? 'active' : ''} onClick={() => setActiveFilter('all')}>All Fleet</button>
          <button className={activeFilter === 'suv' ? 'active' : ''} onClick={() => setActiveFilter('suv')}>SUVs</button>
          <button className={activeFilter === 'coaster' ? 'active' : ''} onClick={() => setActiveFilter('coaster')}>Group Vans & Coasters</button>
          <button className={activeFilter === 'vip' ? 'active' : ''} onClick={() => setActiveFilter('vip')}>VIP Experience</button>
        </div>

        {/* Contenedor Dinámico: Carrusel o Grid Estático */}
        <div className="fleet-display-wrapper">
          {activeFilter === 'all' && (
            <>
              <button className="carousel-arrow left" onClick={() => handleManualScroll('left')} aria-label="Scroll left">
                <FaChevronLeft />
              </button>
              <button className="carousel-arrow right" onClick={() => handleManualScroll('right')} aria-label="Scroll right">
                <FaChevronRight />
              </button>
            </>
          )}

          <div 
            ref={carouselRef} 
            className={`fleet-render-container ${activeFilter === 'all' ? 'is-carousel' : 'is-grid'}`}
            onMouseEnter={stopAutoplay} // Si el mouse se para encima, congela el carrusel para que puedan leer bien
            onMouseLeave={startAutoplay} // Si el mouse sale, continúa el ciclo solo
            onTouchStart={stopAutoplay} // Soporte para celulares
          >
            {filteredVehicles.map((vehicle, index) => (
              <div key={index} className="vehicle-card-premium">
                {vehicle.isVip && <div className="vip-tag-badge">VIP Class</div>}
                
                <div className="img-holder">
                  <img src={vehicle.image} alt={vehicle.name} loading="lazy" />
                </div>

                <div className="card-details">
                  <h3>{vehicle.name}</h3>
                  <div className="passenger-count">
                    <FaUsers className="icon" />
                    <span>Up to {vehicle.passengers} passengers</span>
                  </div>
                  <button className="book-vehicle-btn">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Beneficios Incluidos */}
        <div className="fleet-perks-showcase">
          <h3>All Our Transfers Include:</h3>
          <div className="perks-grid">
            {INCLUDED_BENEFITS.map((benefit, idx) => (
              <div key={idx} className="perk-card-item">
                <FaCheckCircle className="perk-check-icon" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};