import './css/tours.css';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Footer from '../components/footer.tsx';
import Navbarwhite from '../components/navbar_fondo.tsx';
import { useLang } from '../context/LanguageContext.tsx'; 

// Librería internacional de teléfono
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { lang, t } = useLang();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const companyPhone = '50762166675';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Estados comunes controlados
  const [serviceType, setServiceType] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [people, setPeople] = useState('1');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Estados de consentimiento de fotografías/videos
  const [consentSocials, setConsentSocials] = useState(false);
  const [consentAnonymous, setConsentAnonymous] = useState(false);

  // Estados - Servicio de Traslado
  const [transferRoute, setTransferRoute] = useState('');
  const [airport, setAirport] = useState('');
  const [flightNum, setFlightNum] = useState('');
  const [flightTime, setFlightTime] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  // Estados - Tours Organizados
  const [selectedTour, setSelectedTour] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [tourDuration, setTourDuration] = useState('');
  const [tourPlaces, setTourPlaces] = useState('');

  // Estados - Personalizados & Corporativos
  const [subCategory, setSubCategory] = useState('personal'); 
  const [experienceType, setExperienceType] = useState('');
  const [budget, setBudget] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [corporateType, setCorporateType] = useState('');
  const [staffRequirements, setStaffRequirements] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');

  // Sincronización inteligente de parámetros URL
  useEffect(() => {
    const tourParam = searchParams.get('tour') || '';
    if (!tourParam) return;

    const fleetKeys = [
      'chevrolet-suburban', 'mercedes-benz-sprinter', 'toyota-prado', 
      'kia-carens', 'kia-carnival', 'geely-okavango', 'chery-tiggo-8-pro', 
      'suzuki-xl7', 'toyota-coaster', 'toyota-hiace', 'hyundai-universe'
    ];

    if (fleetKeys.includes(tourParam)) {
      setServiceType('transfer');
      const formattedVehicle = tourParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setSelectedVehicle(formattedVehicle);
    } else if (tourParam === 'airport' || tourParam === 'shuttle' || tourParam === 'transfer') {
      setServiceType('transfer');
    } else if (tourParam === 'custom' || tourParam === 'personalized') {
      setServiceType('corporate');
      setSubCategory('personal');
    } else if (tourParam === 'corporate') {
      setServiceType('corporate');
      setSubCategory('corporate');
    } else {
      setServiceType('tour');
      const tourNamesMap: Record<string, string> = {
        'san-blas': 'Pasadía San Blas 2026',
        'monkey-tour': 'Monkey Tour',
        'city-tour': 'City Tour Panamá',
        'playas': 'Beach Transfers',
        'colon': 'Colón Histórico Tour',
        'portobelo': 'Portobelo Adventure'
      };
      if (tourNamesMap[tourParam]) {
        setSelectedTour(tourNamesMap[tourParam]);
      }
    }
  }, [searchParams]);

  const handleSupportRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const supportMessage = lang === 'en'
      ? 'Hello, JM Transport Group! I am on the booking page and would like to request premium assistance to coordinate an active itinerary.'
      : '¡Hola, JM Transport Group! Estoy en la página de reservas y me gustaría solicitar asistencia premium para coordinar un itinerario activo.';
    
    window.open(`https://wa.me/${companyPhone}?text=${encodeURIComponent(supportMessage)}`, '_blank');
  };

  const handleConsentSocialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentSocials(e.target.checked);
    if (e.target.checked) {
      setConsentAnonymous(false);
    }
  };

  const handleConsentAnonymousChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsentAnonymous(e.target.checked);
    if (e.target.checked) {
      setConsentSocials(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceType || !fullName.trim() || phoneNumber.length < 5 || !date) {
      alert(t('bk.alertFields'));
      return;
    }

    if (serviceType === 'transfer' && (!transferRoute || !airport || !flightNum.trim() || !flightTime || !selectedVehicle)) {
      alert(t('bk.alertFields'));
      return;
    }
    // Remoción de la validación obligatoria de tourPlaces.trim() para evitar bloqueos
    if (serviceType === 'tour' && (!selectedTour || !pickupLocation.trim() || !tourDuration.trim() || !detailedDescription.trim())) {
      alert(t('bk.alertFields'));
      return;
    }
    if (serviceType === 'corporate') {
      if (subCategory === 'personal' && (!experienceType || !detailedDescription.trim())) {
        alert(t('bk.alertFields'));
        return;
      }
      if (subCategory === 'corporate' && (!companyName.trim() || !corporateType.trim() || !detailedDescription.trim())) {
        alert(t('bk.alertFields'));
        return;
      }
    }

    let lines: string[] = [];

    if (serviceType === 'transfer') {
      lines = [
        ' *JM Transport Group — Servicio de Traslado*',
        '__________________________________________',
        '',
        ` *Cliente:* ${fullName.trim()}`,
        ` *Correo:* ${email.trim() || 'No provisto'}`,
        ` *Teléfono:* ${phoneNumber.trim()}`,
        ` *Pasajeros:* ${people}`,
        ` *Fecha:* ${date}`,
        ` *Ruta:* ${transferRoute}`,
        ` *Aeropuerto:* ${airport}`,
        ` *Nº Vuelo:* ${flightNum.trim().toUpperCase()}`,
        ` *Hora de Vuelo:* ${flightTime}`,
        ` *Vehículo:* ${selectedVehicle}`,
      ];
    } else if (serviceType === 'tour') {
      lines = [
        ' *JM Transport Group — Reserva de Tour*',
        '__________________________________________',
        '',
        ` *Cliente:* ${fullName.trim()}`,
        ` *Correo:* ${email.trim() || 'No provisto'}`,
        ` *Teléfono:* ${phoneNumber.trim()}`,
        ` *Pasajeros:* ${people}`,
        ` *Fecha Estimada:* ${date}`,
        ` *Tour Seleccionado:* ${selectedTour}`,
        ` *Duración Estimada:* ${tourDuration}`,
        ` *Lugar de Recogida:* ${pickupLocation.trim()}`,
        '',
        ` *Descripción Detallada:*`,
        detailedDescription.trim()
      ];
    } else if (serviceType === 'corporate') {
      if (subCategory === 'personal') {
        lines = [
          ' *JM Transport Group — Servicio Personalizado*',
          '__________________________________________',
          '',
          ` *Cliente:* ${fullName.trim()}`,
          ` *Correo:* ${email.trim() || 'No provisto'}`,
          ` *Teléfono:* ${phoneNumber.trim()}`,
          ` *Participantes:* ${people}`,
          ` *Fechas del Viaje:* ${date}`,
          ` *Estilo de Experiencia:* ${experienceType}`,
          ` *Presupuesto Aprox:* ${budget.trim() || 'No especificado'}`,
          '',
          ` *Descripción del Viaje:*`,
          detailedDescription.trim()
        ];
      } else {
        lines = [
          ' *JM Transport Group — Evento Corporativo*',
          '__________________________________________',
          '',
          ` *Empresa:* ${companyName.trim()}`,
          ` *Contacto:* ${fullName.trim()}`,
          ` *Correo:* ${email.trim() || 'No provisto'}`,
          ` *Teléfono:* ${phoneNumber.trim()}`,
          ` *Asistentes Estimados:* ${people}`,
          ` *Fecha del Evento:* ${date}`,
          ` *Tipo de Evento:* ${corporateType.trim()}`,
          ` *Requerimientos de Personal:* ${staffRequirements.trim() || 'Ninguno'}`,
          '',
          ` *Logística y Detalles:*`,
          detailedDescription.trim()
        ];
      }
    }

    if (notes.trim()) {
      lines.push('', ` *Notas Especiales:* ${notes.trim()}`);
    }

    // Inclusión limpia del estatus del consentimiento en el reporte de WhatsApp
    let mediaConsentStatus = 'No especificado / declinado';
    if (consentSocials) mediaConsentStatus = 'Autorizado para redes sociales';
    if (consentAnonymous) mediaConsentStatus = 'Autorizado de forma anónima (sin nombre)';
    lines.push('', ` *Consentimiento Multimedia:* ${mediaConsentStatus}`);

    lines.push('', '__________________________________________', ' *JM Transport Group* — *Panama Premium Mobility*');

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${companyPhone}?text=${message}`, '_blank');
  };

  return (
    <>
      <Navbarwhite />
      <div className="bk-root">

        {/* ── HEADER CON CAPA VISUAL CINEMÁTICA PREMIUM ── */}
        <header className="bk-editorial-header">
          <div className="bk-editorial-overlay" />
          <div className="bk-canvas-container">
            <span className="bk-meta-tag">SECURE RESERVATIONS</span>
            <h1 className="bk-display-title">
              {lang === 'en' ? (
                <>PLAN YOUR <span className="bk-stroke-text">JOURNEY</span></>
              ) : (
                <>PLANIFICA TU <span className="bk-stroke-text">TRAYECTO</span></>
              )}
            </h1>
            <p className="bk-lead-subtitle">
              {lang === 'en'
                ? 'Coordinate your private transfer, corporate event logistics, or custom tours with absolute synchrony and local transparency.'
                : 'Coordina tu traslado privado, logística de eventos corporativos o paseos personalizados bajo una sincronía absoluta y transparencia local.'}
            </p>
          </div>
        </header>

        <div className="bk-body">
          
          <form className="bk-form-card" onSubmit={handleSubmit}>
            <div className="bk-form-header">
              <h2>{t('bk.formTitle')}</h2>
              <div className="bk-accent-line-mini" />
            </div>
            
            <div className="bk-grid">
              
              <div className="bk-field full">
                <label>{t('bk.serviceTypeLabel')}</label>
                <select value={serviceType} onChange={e => setServiceType(e.target.value)} required>
                  <option value="">{t('bk.selectServiceType')}</option>
                  <option value="transfer">{t('bk.serviceTransfer')}</option>
                  <option value="tour">{t('bk.serviceTour')}</option>
                  <option value="corporate">{t('bk.serviceCorporate')}</option>
                </select>
              </div>

              {serviceType !== '' && (
                <>
                  {serviceType === 'corporate' && (
                    <div className="bk-field full bk-sub-selector">
                      <button 
                        type="button" 
                        className={`bk-tab-btn ${subCategory === 'personal' ? 'active' : ''}`}
                        onClick={() => setSubCategory('personal')}
                      >
                        Tours Personalizados
                      </button>
                      <button 
                        type="button" 
                        className={`bk-tab-btn ${subCategory === 'corporate' ? 'active' : ''}`}
                        onClick={() => setSubCategory('corporate')}
                      >
                        Eventos Corporativos
                      </button>
                    </div>
                  )}

                  {serviceType === 'corporate' && subCategory === 'corporate' ? (
                    <div className="bk-field">
                      <label>{t('bk.corpNameLabel')}</label>
                      <input type="text" placeholder="Corporate Group Logistics" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                    </div>
                  ) : (
                    <div className="bk-field">
                      <label>{t('bk.nameLabel')}</label>
                      <input type="text" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} required />
                    </div>
                  )}

                  <div className="bk-field">
                    <label>{t('bk.emailLabel')}</label>
                    <input type="email" placeholder="client@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>

                  {/* Teléfono Internacional integrado */}
                  <div className="bk-field full" ref={dropdownRef}>
                    <label>{t('bk.phoneLabel')}</label>
                    <div className="bk-phone-library-wrapper">
                      <PhoneInput
                        defaultCountry="pa"
                        value={phoneNumber}
                        onChange={(phone) => setPhoneNumber(phone)}
                      />
                    </div>
                  </div>

                  {serviceType === 'corporate' && subCategory === 'corporate' && (
                    <div className="bk-field">
                      <label>{t('bk.nameLabel')}</label>
                      <input type="text" placeholder="John Doe (Event Manager)" value={fullName} onChange={e => setFullName(e.target.value)} required />
                    </div>
                  )}

                  <div className="bk-field">
                    <label>{t('bk.peopleLabel')}</label>
                    <input type="number" value={people} min={1} onChange={e => setPeople(e.target.value)} required />
                  </div>

                  <div className="bk-field">
                    <label>{t('bk.dateLabel')}</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                  </div>
                </>
              )}

              {serviceType === 'transfer' && (
                <>
                  <div className="bk-field">
                    <label>{t('bk.transferRouteLabel')}</label>
                    <select value={transferRoute} onChange={e => setTransferRoute(e.target.value)} required>
                      <option value="">{t('bk.selectRoute')}</option>
                      <option value="Airport -> Hotel">{t('bk.routeToHotel')}</option>
                      <option value="Hotel -> Airport">{t('bk.routeToAirport')}</option>
                      <option value="Roundtrip">{t('bk.routeRoundtrip')}</option>
                    </select>
                  </div>

                  <div className="bk-field">
                    <label>{t('bk.airportLabel')}</label>
                    <select value={airport} onChange={e => setAirport(e.target.value)} required>
                      <option value="">{t('bk.selectAirport')}</option>
                      <option value="Tocumen International Airport (PTY)">Tocumen Intl. Airport (PTY)</option>
                      <option value="Albrook Marcos A. Gelabert Airport (PAC)">Albrook Airport (PAC)</option>
                    </select>
                  </div>

                  <div className="bk-field">
                    <label>{t('bk.flightNumLabel')}</label>
                    <input type="text" placeholder="e.g. CM 142" value={flightNum} onChange={e => setFlightNum(e.target.value)} required />
                  </div>

                  <div className="bk-field">
                    <label>{t('bk.flightTimeLabel')}</label>
                    <input type="time" value={flightTime} onChange={e => setFlightTime(e.target.value)} required />
                  </div>

                  <div className="bk-field full">
                    <label>{t('bk.fleetLabel')}</label>
                    <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)} required>
                      <option value="">{t('bk.selectVehicle')}</option>
                      <option value="Chevrolet Suburban">Chevrolet Suburban (VIP SUV)</option>
                      <option value="Mercedes-Benz Sprinter">Mercedes-Benz Sprinter (Luxury Van)</option>
                      <option value="Toyota Prado">Toyota Prado (VIP SUV)</option>
                      <option value="Kia Carens">Kia Carens (SUV)</option>
                      <option value="Kia Carnival">Kia Carnival (SUV)</option>
                      <option value="Geely Okavango">Geely Okavango (SUV)</option>
                      <option value="Chery Tiggo 8 Pro">Chery Tiggo 8 Pro (SUV)</option>
                      <option value="Suzuki XL7">Suzuki XL7 (SUV)</option>
                      <option value="Toyota Coaster">Toyota Coaster (Group Bus)</option>
                      <option value="Toyota Hiace">Toyota Hiace (Group Van)</option>
                      <option value="Hyundai Universe">Hyundai Universe (Premium Bus)</option>
                    </select>
                  </div>
                </>
              )}

              {serviceType === 'tour' && (
                <>
                  <div className="bk-field full">
                    <label>{t('bk.tourSelectLabel')}</label>
                    <select value={selectedTour} onChange={e => setSelectedTour(e.target.value)} required>
                      <option value="">{t('bk.selectTour')}</option>
                      <option value="Pasadía San Blas 2026">Pasadía San Blas 2026</option>
                      <option value="Monkey Tour">Monkey Tour</option>
                      <option value="City Tour Panamá">City Tour Panamá</option>
                      <option value="Beach Transfers">Beach Transfers</option>
                      <option value="Colón Histórico Tour">Colón Histórico Tour</option>
                      <option value="Portobelo Adventure">Portobelo Adventure</option>
                      <option value="custom">{t('bk.tourCustom')}</option>
                    </select>
                  </div>

                  <div className="bk-field">
                    <label>{t('bk.tourDurationLabel')}</label>
                    <input type="text" placeholder="e.g. 8 Hours / 3 Days" value={tourDuration} onChange={e => setTourDuration(e.target.value)} required />
                  </div>

                  <div className="bk-field full">
                    <label>{t('bk.pickupLabel')}</label>
                    <input type="text" placeholder="e.g. Riu Plaza Hotel, Casco Viejo Airbnb..." value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} required />
                  </div>
                  
                  {/* Se ha eliminado completamente el campo "Places of Interest" únicamente de esta sección */}
                </>
              )}

              {serviceType === 'corporate' && (
                <>
                  {subCategory === 'personal' ? (
                    <>
                      <div className="bk-field">
                        <label>{t('bk.experienceTypeLabel')}</label>
                        <select value={experienceType} onChange={e => setExperienceType(e.target.value)} required>
                          <option value="">{t('bk.selectExperience')}</option>
                          <option value="Vacational">{t('bk.expVacation')}</option>
                          <option value="Adventure">{t('bk.expAdventure')}</option>
                          <option value="VIP Luxury">{t('bk.expLuxury')}</option>
                        </select>
                      </div>
                      <div className="bk-field">
                        <label>{t('bk.budgetLabel')}</label>
                        <input type="text" placeholder={t('bk.budgetPlaceholder')} value={budget} onChange={e => setBudget(e.target.value)} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bk-field">
                        <label>{t('bk.corpTypeLabel')}</label>
                        <input type="text" placeholder={t('bk.corpTypePlaceholder')} value={corporateType} onChange={e => setCorporateType(e.target.value)} required />
                      </div>
                      <div className="bk-field">
                        <label>{t('bk.corpStaffLabel')}</label>
                        <input type="text" placeholder={t('bk.corpStaffPlaceholder')} value={staffRequirements} onChange={e => setStaffRequirements(e.target.value)} />
                      </div>
                    </>
                  )}
                </>
              )}

              {serviceType !== '' && serviceType !== 'transfer' && (
                <div className="bk-field full">
                  <label>{t('bk.detailsLabel')}</label>
                  <textarea placeholder={t('bk.detailsPlaceholder')} value={detailedDescription} onChange={e => setDetailedDescription(e.target.value)} required />
                </div>
              )}

              {serviceType !== '' && (
                <div className="bk-field full">
                  <label>{t('bk.notesLabel')}</label>
                  <textarea placeholder={t('bk.notesPlaceholder')} value={notes} onChange={e => setNotes(e.target.value)} />
                </div>
              )}

              {/* ── Nueva Sección Discreta de Consentimiento Multimedia ── */}
              {serviceType !== '' && (
                <div className="bk-field full bk-consent-section">
                  <label className="bk-consent-title">
                    {lang === 'en' ? 'Media Consent (Optional)' : 'Consentimiento Multimedia (Opcional)'}
                  </label>
                  <div className="bk-consent-group">
                    <label className="bk-consent-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={consentSocials} 
                        onChange={handleConsentSocialsChange} 
                      />
                      <span className="bk-custom-checkbox" />
                      <span className="bk-checkbox-text">
                        {lang === 'en' 
                          ? "I'd love to appear on JM Transport Group's social media and authorize the use of photos or videos taken during my service."
                          : "Me encantaría aparecer en las redes sociales de JM Transport Group y autorizo el uso de fotos o videos tomados durante mi servicio."}
                      </span>
                    </label>

                    <label className="bk-consent-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={consentAnonymous} 
                        onChange={handleConsentAnonymousChange} 
                      />
                      <span className="bk-custom-checkbox" />
                      <span className="bk-checkbox-text">
                        {lang === 'en'
                          ? "I authorize photos/videos to be taken, but without identifying my name."
                          : "Autorizo que se tomen fotos/videos, pero sin identificar mi nombre."}
                      </span>
                    </label>
                  </div>
                </div>
              )}

            </div>

            {serviceType !== '' && (
              <>
                <button type="submit" className="bk-submit">
                  {t('bk.submitBtn')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
                <p className="bk-note"> {t('bk.waNote')}</p>
              </>
            )}
          </form>

          {/* Sidebar */}
          <aside className="bk-sidebar">
            <div className="bk-contact-card">
              <h3>{lang === 'en' ? '24/7 Executive Assistance and Concierge' : 'Asistencia Ejecutiva y Concierge 24/7'}</h3>
              <p className="bk-sidebar-lead">
                {lang === 'en'
                  ? 'Do you have special requirements, complex schedules, or VIP requests? Our team coordinates every detail in real time.'
                  : '¿Tiene requerimientos especiales, agendas complejas o solicitudes VIP? Nuestro equipo coordina cada detalle en tiempo real.'}
              </p>

              <div className="bk-contact-item">
                <div className="bk-contact-icon wa">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"/>
                  </svg>
                </div>
                <div className="bk-contact-info">
                  <strong>{lang === 'en' ? 'Instant Helpline' : 'Línea Directa'}</strong>
                  <span>+507 6216-6675</span>
                </div>
              </div>

              <div className="bk-contact-item">
                <div className="bk-contact-icon em">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </div>
                <div className="bk-contact-info">
                  <strong>{lang === 'en' ? 'Email Desk' : 'Soporte vía Correo'}</strong>
                  <span>jmtransport.pa@gmail.com</span>
                </div>
              </div>

              <a href="#" onClick={handleSupportRedirect} className="bk-whatsapp-editorial-btn">
                <span className="bk-pulse-gold-dot" /> Hablar con un Asesor
              </a>
            </div>
          </aside>

        </div>
      </div>
      <Footer />
    </>
  );
}