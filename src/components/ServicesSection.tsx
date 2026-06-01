import React from 'react';
import './css/ServicesSection.css';

export const ServicesSection: React.FC = () => {
  return (
    <section className="services-section">
      <div className="services-header">
        <span>OUR SERVICES</span>
        <h2>Premium Mobility Solutions in Panama</h2>
      </div>

      <div className="services-grid">
        <div className="service-card card-large bg-airport">
          <div className="card-overlay"></div>
          <div className="card-info">
            <div className="card-tag">Most Popular</div>
            <h3>Airport Transfers</h3>
            <p>Punctual door-to-door pickup at Tocumen International (PTY). Tracked flights and professional meet & greet.</p>
            <button className="card-link">Book Transfer →</button>
          </div>
        </div>

        <div className="service-card card-small bg-corporate">
          <div className="card-overlay"></div>
          <div className="card-info">
            <h3>Executive Chauffeur</h3>
            <p>First-class mobility for business meetings, corporate events, and VIP itineraries.</p>
            <button className="card-link">Learn More →</button>
          </div>
        </div>

        <div className="service-card card-small bg-tours">
          <div className="card-overlay"></div>
          <div className="card-info">
            <h3>Custom Panama Tours</h3>
            <p>Discover the Canal, Casco Antiguo, and tropical destinations with flexible private guides.</p>
            <button className="card-link">Explore Tours →</button>
          </div>
        </div>
      </div>
    </section>
  );
};