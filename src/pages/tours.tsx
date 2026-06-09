import './css/tours.css';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Footer from '../components/footer.tsx';
import Navbarwhite from '../components/navbar_fondo.tsx';
import { useLang } from '../context/LanguageContext.tsx'; 

// Lista optimizada y ordenada alfabéticamente de los prefijos más comunes del mundo
const ALL_COUNTRIES = [
  { code: 'DE', prefix: '+49', flag: '🇩🇪', name: 'Alemania' },
  { code: 'AR', prefix: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: 'BO', prefix: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: 'BR', prefix: '+55', flag: '🇧🇷', name: 'Brasil' },
  { code: 'CA', prefix: '+1', flag: '🇨🇦', name: 'Canadá' },
  { code: 'CL', prefix: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: 'CO', prefix: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: 'CR', prefix: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: 'CU', prefix: '+593', flag: '🇨🇺', name: 'Cuba' },
  { code: 'EC', prefix: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: 'SV', prefix: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: 'ES', prefix: '+34', flag: '🇪🇸', name: 'España' },
  { code: 'US', prefix: '+1', flag: '🇺🇸', name: 'Estados Unidos' },
  { code: 'FR', prefix: '+33', flag: '🇫🇷', name: 'Francia' },
  { code: 'GT', prefix: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: 'HN', prefix: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: 'IT', prefix: '+39', flag: '🇮🇹', name: 'Italia' },
  { code: 'MX', prefix: '+52', flag: '🇲🇽', name: 'México' },
  { code: 'NI', prefix: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: 'PA', prefix: '+507', flag: '🇵🇦', name: 'Panamá' },
  { code: 'PY', prefix: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: 'PE', prefix: '+51', flag: '🇵🇪', name: 'Perú' },
  { code: 'PR', prefix: '+1-787', flag: '🇵🇷', name: 'Puerto Rico' },
  { code: 'GB', prefix: '+44', flag: '🇬🇧', name: 'Reino Unido' },
  { code: 'DO', prefix: '+1-809', flag: '🇩🇴', name: 'República Dominicana' },
  { code: 'UY', prefix: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: 'VE', prefix: '+58', flag: '🇻🇪', name: 'Venezuela' }
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { t } = useLang();

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

  // ── SISTEMA NATIVO DE TELÉFONO CUSTOM ──
  const [selectedCountry, setSelectedCountry] = useState(ALL_COUNTRIES.find(c => c.code === 'PA') || ALL_COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el selector de países si se hace clic afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrar países en base a la búsqueda del usuario
  const filteredCountries = ALL_COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.prefix.includes(searchQuery)
  );

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceType || !fullName.trim() || !phoneNumber.trim() || !date) {
      alert(t('bk.alertFields'));
      return;
    }

    if (serviceType === 'transfer' && (!transferRoute || !airport || !flightNum.trim() || !flightTime || !selectedVehicle)) {
      alert(t('bk.alertFields'));
      return;
    }
    if (serviceType === 'tour' && (!selectedTour || !pickupLocation.trim() || !tourDuration.trim() || !tourPlaces.trim() || !detailedDescription.trim())) {
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

    const waPhone = '50762166675';
    const fullPhoneString = `${selectedCountry.prefix} ${phoneNumber.trim()}`;
    let lines: string[] = [];

    if (serviceType === 'transfer') {
      lines = [
        '🚐 *JM Transport Group — Servicio de Traslado*',
        '',
        `👤 *Cliente:* ${fullName.trim()}`,
        `📧 *Correo:* ${email.trim() || 'No provisto'}`,
        `📱 *Teléfono:* ${fullPhoneString}`,
        `👥 *Pasajeros:* ${people}`,
        `📅 *Fecha:* ${date}`,
        `🔄 *Ruta:* ${transferRoute}`,
        `🛫 *Aeropuerto:* ${airport}`,
        `🔢 *Nº Vuelo:* ${flightNum.trim().toUpperCase()}`,
        `⏰ *Hora:* ${flightTime}`,
        `🚗 *Vehículo Preseleccionado:* ${selectedVehicle}`,
      ];
    } else if (serviceType === 'tour') {
      lines = [
        '🚐 *JM Transport Group — Reserva de Tour*',
        '',
        `👤 *Cliente:* ${fullName.trim()}`,
        `📧 *Correo:* ${email.trim() || 'No provisto'}`,
        `📱 *Teléfono:* ${fullPhoneString}`,
        `👥 *Pasajeros:* ${people}`,
        `📅 *Fecha Estimada:* ${date}`,
        `🎯 *Tour Seleccionado:* ${selectedTour}`,
        `⏱️ *Duración Estimada:* ${tourDuration}`,
        `📍 *Lugar de Recogida:* ${pickupLocation.trim()}`,
        `🗺️ *Lugares de Interés:* ${tourPlaces.trim()}`,
        '',
        `📋 *Descripción Detallada:*`,
        detailedDescription.trim()
      ];
    } else if (serviceType === 'corporate') {
      if (subCategory === 'personal') {
        lines = [
          '🚐 *JM Transport Group — Servicio Personalizado*',
          '',
          `👤 *Cliente:* ${fullName.trim()}`,
          `📧 *Correo:* ${email.trim() || 'No provisto'}`,
          `📱 *Teléfono:* ${fullPhoneString}`,
          `👥 *Participantes:* ${people}`,
          `📅 *Fechas del Viaje:* ${date}`,
          `✨ *Estilo de Experiencia:* ${experienceType}`,
          `💰 *Presupuesto Aprox:* ${budget.trim() || 'No especificado'}`,
          '',
          `📋 *Descripción del Viaje:*`,
          detailedDescription.trim()
        ];
      } else {
        lines = [
          '🚐 *JM Transport Group — Evento Corporativo*',
          '',
          `🏢 *Empresa:* ${companyName.trim()}`,
          `👤 *Contacto:* ${fullName.trim()}`,
          `📧 *Correo:* ${email.trim() || 'No provisto'}`,
          `📱 *Teléfono:* ${fullPhoneString}`,
          `👥 *Asistentes Estimados:* ${people}`,
          `📅 *Fecha del Evento:* ${date}`,
          `💼 *Tipo de Evento:* ${corporateType.trim()}`,
          `🛠️ *Requerimientos de Personal:* ${staffRequirements.trim() || 'Ninguno'}`,
          '',
          `📋 *Logística y Detalles:*`,
          detailedDescription.trim()
        ];
      }
    }

    if (notes.trim()) {
      lines.push('', `💬 *Notas / Solicitudes Especiales:* ${notes.trim()}`);
    }

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${waPhone}?text=${message}`, '_blank');
  };

  return (
    <>
      <Navbarwhite />
      <div className="bk-root">

        <div className="bk-hero">
          <img src="https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/kunayala53925.jpg?alt=media&token=c5111d87-fbb1-48d0-83f6-3f75ab1ca004" alt="Panama" />
          <div className="bk-hero-overlay" />
          <div className="bk-hero-content">
            <h1>{t('bk.heroTitle')}</h1>
            <p>{t('bk.heroDesc')}</p>
          </div>
        </div>

        <div className="bk-body">
          
          <form className="bk-form-card" onSubmit={handleSubmit}>
            <h2>{t('bk.formTitle')}</h2>
            
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

                  {/* ── SELECTOR DE TELÉFONO 100% NATIVO Y PREMIUM ── */}
                  <div className="bk-field full">
                    <label>{t('bk.phoneLabel')}</label>
                    <div className="bk-phone-custom-wrapper" ref={dropdownRef}>
                      <button
                        type="button"
                        className="bk-phone-flag-trigger"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span className="bk-trigger-flag">{selectedCountry.flag}</span>
                        <span className="bk-trigger-prefix">{selectedCountry.prefix}</span>
                        <span className="bk-trigger-arrow">▼</span>
                      </button>

                      {isDropdownOpen && (
                        <div className="bk-phone-countries-dropdown">
                          <input
                            type="text"
                            className="bk-phone-dropdown-search"
                            placeholder={t('nav.booking') === 'Reservas' ? 'Buscar país...' : 'Search country...'}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            autoFocus
                          />
                          <div className="bk-phone-countries-list">
                            {filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                className={`bk-phone-country-option ${selectedCountry.code === country.code ? 'selected' : ''}`}
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsDropdownOpen(false);
                                  setSearchQuery('');
                                }}
                              >
                                <span className="bk-opt-flag">{country.flag}</span>
                                <span className="bk-opt-name">{country.name}</span>
                                <span className="bk-opt-prefix">{country.prefix}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <input
                        type="tel"
                        className="bk-phone-number-input"
                        placeholder={selectedCountry.code === 'US' || selectedCountry.code === 'CA' ? '201 555 0123' : '6000 0000'}
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value.replace(/[^0-9\s-]/g, ''))}
                        required
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

                  <div className="bk-field full">
                    <label>{t('bk.tourPlacesLabel')}</label>
                    <input type="text" placeholder={t('bk.tourPlacesPlaceholder')} value={tourPlaces} onChange={e => setTourPlaces(e.target.value)} required />
                  </div>
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

            </div>

            {serviceType !== '' && (
              <>
                <button type="submit" className="bk-submit">
                  {t('bk.submitBtn')}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
                <p className="bk-note">{t('bk.waNote')}</p>
              </>
            )}
          </form>

          <div className="bk-sidebar">
            <div className="bk-contact-card">
              <h3>{t('bk.sidebarTitle')}</h3>

              <div className="bk-contact-item">
                <div className="bk-contact-icon wa">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"/></svg>
                </div>
                <div className="bk-contact-info">
                  <strong>WhatsApp Support</strong>
                  <span>+507 6216-6675</span>
                  <small>Available 24/7 for active bookings</small>
                </div>
              </div>

              <div className="bk-contact-item">
                <div className="bk-contact-icon em">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4f6ef7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </div>
                <div className="bk-contact-info">
                  <strong>Email Inquiries</strong>
                  <span>jmtransport.pa@gmail.com</span>
                </div>
              </div>

              <hr className="bk-divider" />

              <div className="bk-why">
                <h4>{t('bk.sidebarWhy')}</h4>
                {[
                  t('fleet.benefit.ac'),
                  t('fleet.benefit.tracking'),
                  t('fleet.benefit.luggage'),
                  t('fleet.benefit.drivers')
                ].map(item => (
                  <div key={item} className="bk-why-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00D2E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bk-fleet-card">
              <div className="bk-fleet-card-content">
                <h3>{t('bk.fleetTitle')}</h3>
                <p>{t('bk.fleetDesc')}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}