import React, { useState } from 'react';
import './css/ServicesSection.css';
import { useLang } from '../context/LanguageContext';

interface ServiceDetail {
  id: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  stepsKeys: string[];
  notesKeys: string[];
}

// Información extendida para el Modal Informativo
const SERVICES_DETAILS: Record<string, ServiceDetail> = {
  airport: {
    id: "airport",
    titleKey: "services.airport.title",
    subtitleKey: "services.airport.subtitle",
    descriptionKey: "services.airport.desc.long",
    stepsKeys: [
      "services.airport.step1",
      "services.airport.step2",
      "services.airport.step3",
      "services.airport.step4"
    ],
    notesKeys: ["services.airport.note1", "services.airport.note2"]
  },
  corporate: {
    id: "corporate",
    titleKey: "services.corporate.title",
    subtitleKey: "services.corporate.subtitle",
    descriptionKey: "services.corporate.desc.long",
    stepsKeys: [
      "services.corporate.step1",
      "services.corporate.step2",
      "services.corporate.step3",
      "services.corporate.step4"
    ],
    notesKeys: ["services.corporate.note1", "services.corporate.note2"]
  },
  tours: {
    id: "tours",
    titleKey: "services.tours.title",
    subtitleKey: "services.tours.subtitle",
    descriptionKey: "services.tours.desc.long",
    stepsKeys: [
      "services.tours.step1",
      "services.tours.step2",
      "services.tours.step3",
      "services.tours.step4"
    ],
    notesKeys: ["services.tours.note1", "services.tours.note2"]
  }
};

export const ServicesSection: React.FC = () => {
  const { t } = useLang();
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
        <span>{t('services.header')}</span>
        <h2>{t('services.title')}</h2>
      </div>

<div className="services-grid">
  {/* Tarjeta 1: Airport */}
  <div className="service-card card-large bg-airport" onClick={() => openModal('airport')}>
    <div className="card-overlay"></div>
    <div className="card-info">
      <div className="card-tag">{t('services.airport.tag')}</div>
      <h3>{t('services.airport.title')}</h3>
      <p>{t('services.airport.desc')}</p>
      <span className="card-link">{t('services.airport.link')}</span> 
    </div>
  </div>

  {/* Tarjeta 2: Corporate */}
  <div className="service-card card-small bg-corporate" onClick={() => openModal('corporate')}>
    <div className="card-overlay"></div>
    <div className="card-info">
      <h3>{t('services.corporate.title')}</h3>
      <p>{t('services.corporate.desc')}</p>
      <span className="card-link">{t('services.corporate.link')}</span> 
    </div>
  </div>

  {/* Tarjeta 3: Tours */}
  <div className="service-card card-small bg-tours" onClick={() => openModal('tours')}>
    <div className="card-overlay"></div>
    <div className="card-info">
      <h3>{t('services.tours.title')}</h3>
      <p>{t('services.tours.desc')}</p>
      <span className="card-link">{t('services.tours.link')}</span> 
    </div>
  </div>
</div>

      {/* --- MODAL DETALLADO --- */}
      {activeService && (
        <div className="service-modal-overlay" onClick={closeModal}>
          <div className="service-modal-window" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            
            <span className="modal-tag">{t('services.modal.tag')}</span>
            <h2>{t(activeService.titleKey)}</h2>
            <p className="modal-subtitle">{t(activeService.subtitleKey)}</p>
            
            <hr className="modal-divider" />
            
            <p className="modal-description">{t(activeService.descriptionKey)}</p>
            
            <h3>{t('services.modal.howworks')}</h3>
            <ul className="modal-steps-list">
              {activeService.stepsKeys.map((stepKey, index) => {
                const stepText = t(stepKey);
                const [title, text] = stepText.split(': ');
                return (
                  <li key={index}>
                    <strong>{title}:</strong> {text}
                  </li>
                );
              })}
            </ul>

            {activeService.notesKeys.length > 0 && (
              <div className="modal-notes-box">
                {activeService.notesKeys.map((noteKey, index) => (
                  <p key={index}>* {t(noteKey)}</p>
                ))}
              </div>
            )}

            <div className="modal-actions">
              <a href="https://wa.me/50762166675" target="_blank" rel="noreferrer" className="modal-btn-quote">
                {t('services.modal.quote')}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};