import React, { useState } from 'react';
import './css/ServicesSection.css';

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  steps: string[];
  notes: string[];
}

// Información extendida para el Modal Informativo
const SERVICES_DETAILS: Record<string, ServiceDetail> = {
  airport: {
    id: "airport",
    title: "Airport Transfers",
    subtitle: "Tocumen International (PTY) & Marcos A. Gelabert (Albrook)",
    description: "Our premium airport service is engineered to eliminate travel stress. We coordinate every detail from flight tracking to luggage handling so your arrival or departure in Panama is completely seamless.",
    steps: [
      "Real-Time Flight Tracking: We monitor your flight path. If your arrival is delayed or early, your chauffeur will adjust accordingly.",
      "Professional Meet & Greets: Your driver will await you at the arrivals gate holding a customized sign with your name or corporate logo.",
      "Complimentary Wait Time: Includes 60 minutes of complimentary waiting time after your flight lands, giving you ample time for customs and baggage claim.",
      "Luggage Assistance & Comfort: Full help loading your bags into a climate-controlled premium vehicle equipped with bottled water."
    ],
    notes: ["Includes toll fees (Corredor Sur).", "Child seats available upon prior request."]
  },
  corporate: {
    id: "corporate",
    title: "Executive Chauffeur",
    subtitle: "First-Class Corporate Mobility Solutions",
    description: "Designed for corporate executives, state visits, and business travelers who value absolute punctuality, confidentiality, and flawless execution.",
    steps: [
      "By-the-Hour or Full-Day Service: Retain a dedicated vehicle and professional driver for your entire business itinerary.",
      "Bilingual Professional Chauffeurs: Drivers trained in corporate protocol, navigation, and security, speaking fluent English and Spanish.",
      "On-Board Executive Perks: Vehicles equipped with Wi-Fi connectivity, device chargers, and refreshing amenities to keep you productive.",
      "Flawless Logistics Coordination: Ideal for roadshows, corporate summits, and multi-destination meeting schedules."
    ],
    notes: ["Discreet, unbranded premium vehicles.", "Confidentiality guaranteed under strict NDA standards."]
  },
  tours: {
    id: "tours",
    title: "Custom Panama Tours",
    subtitle: "Bespoke Private Sightseeing & Experiences",
    description: "Explore the rich history, modern marvels, and breathtaking nature of Panama through a completely tailored private itinerary built around your pace and preferences.",
    steps: [
      "Tailored Itinerary Planning: Choose from iconic spots like the Panama Canal (Miraflores Locks), Casco Antiguo, Amador Causeway, or Gamboa Rainforest.",
      "Flexible Timing: No rigid schedules. Spend as much or as little time at each landmark as you wish.",
      "Expert Local Guidance: Travel alongside knowledgeable drivers who share deep historical and cultural insights about each destination.",
      "Premium Group Accommodations: Perfect for families, corporate groups, or VIP travelers wanting a relaxed, private excursion."
    ],
    notes: ["Entrance tickets to museums or the Canal are coordinated separately.", "Custom lunch stop recommendations included."]
  }
};

export const ServicesSection: React.FC = () => {
  // Estado para rastrear qué modal de servicio está abierto (null si está cerrado)
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  const openModal = (id: string) => {
    setActiveService(SERVICES_DETAILS[id]);
  };

  const closeModal = () => {
    setActiveService(null);
  };

  return (
    <section className="services-section">
      <div className="services-header">
        <span>OUR SERVICES</span>
        <h2>Premium Mobility Solutions in Panama</h2>
      </div>

<div className="services-grid">
  {/* Tarjeta 1: Airport */}
  <div className="service-card card-large bg-airport" onClick={() => openModal('airport')}>
    <div className="card-overlay"></div>
    <div className="card-info">
      <div className="card-tag">Most Popular</div>
      <h3>Airport Transfers</h3>
      <p>Punctual door-to-door pickup at Tocumen International (PTY). Tracked flights and professional meet & greet.</p>
      <span className="card-link">Book Transfer →</span> 
    </div>
  </div>

  {/* Tarjeta 2: Corporate */}
  <div className="service-card card-small bg-corporate" onClick={() => openModal('corporate')}>
    <div className="card-overlay"></div>
    <div className="card-info">
      <h3>Executive Chauffeur</h3>
      <p>First-class mobility for business meetings, corporate events, and VIP itineraries.</p>
      <span className="card-link">Learn More →</span> 
    </div>
  </div>

  {/* Tarjeta 3: Tours */}
  <div className="service-card card-small bg-tours" onClick={() => openModal('tours')}>
    <div className="card-overlay"></div>
    <div className="card-info">
      <h3>Custom Panama Tours</h3>
      <p>Discover the Canal, Casco Antiguo, and tropical destinations with flexible private guides.</p>
      <span className="card-link">Explore Tours →</span> 
    </div>
  </div>
</div>

      {/* --- MODAL DETALLADO --- */}
      {activeService && (
        <div className="service-modal-overlay" onClick={closeModal}>
          <div className="service-modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            
            <span className="modal-tag">Service Details</span>
            <h2>{activeService.title}</h2>
            <p className="modal-subtitle">{activeService.subtitle}</p>
            
            <hr className="modal-divider" />
            
            <p className="modal-description">{activeService.description}</p>
            
            <h3>How It Works:</h3>
            <ul className="modal-steps-list">
              {activeService.steps.map((step, index) => {
                const [title, text] = step.split(': ');
                return (
                  <li key={index}>
                    <strong>{title}:</strong> {text}
                  </li>
                );
              })}
            </ul>

            {activeService.notes.length > 0 && (
              <div className="modal-notes-box">
                {activeService.notes.map((note, index) => (
                  <p key={index}>* {note}</p>
                ))}
              </div>
            )}

            <div className="modal-actions">
              <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noreferrer" className="modal-btn-quote">
                Quote via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};