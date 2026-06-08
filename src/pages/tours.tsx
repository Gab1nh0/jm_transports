import './css/tours.css';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from '../components/footer.tsx';
import Navbarwhite from '../components/navbar_fondo.tsx';

export default function Booking() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Map query param IDs → select option values
  const tourMap: Record<string, string> = {
    'san-blas': 'Pasadía San Blas 2026',
    'monkey-tour': 'Monkey Tour',
    'city-tour': 'City Tour Panamá',
    'playas': 'Beach Transfers',
    'colon': 'Colón Histórico Tour',
    'portobelo': 'Portobelo Adventure',
    'airport': 'Airport Transfer',
    'custom': 'Custom Experience',

    // Vehículos de la flota
  'chevrolet-suburban': 'Chevrolet Suburban',
  'mercedes-benz-sprinter': 'Mercedes-Benz Sprinter',
  'toyota-prado': 'Toyota Prado',
  'kia-carens': 'Kia Carens',
  'kia-carnival': 'Kia Carnival',
  'geely-okavango': 'Geely Okavango',
  'chery-tiggo-8-pro': 'Chery Tiggo 8 Pro',
  'suzuki-xl7': 'Suzuki XL7',
  'toyota-coaster': 'Toyota Coaster',
  'toyota-hiace': 'Toyota Hiace',
  'hyundai-universe': 'Hyundai Universe',

  };

  const tourParam = searchParams.get('tour') || '';
  const [selectedTour, setSelectedTour] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState('1');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (tourParam && tourMap[tourParam]) {
      setSelectedTour(tourMap[tourParam]);
    }
  }, [tourParam]);

  const handleSubmit = () => {
    const waPhone = '50762166675';
    const lines = [
      '🚐 *JM Transport Group — Solicitud de Reserva*',
      '',
      `👤 *Nombre:* ${fullName || 'Not provided'}`,
      `📧 *Correo:* ${email || 'Not provided'}`,
      `📱 *WhatsApp:* +507 ${phone || 'Not provided'}`,
      `👥 *Cantidad de personas:* ${people}`,
      `📅 *Fecha preferida:* ${date || 'Not specified'}`,
      `🎯 *Tour/Servicio:* ${selectedTour || 'Not selected'}`,
    ];
    if (notes.trim()) {
      lines.push(`📝 *Notes:* ${notes.trim()}`);
    }
    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${waPhone}?text=${message}`, '_blank');
  };

  return (
  <>
    <Navbarwhite />
    <div className="bk-root">

      {/* Hero */}
      <div className="bk-hero">
        <img src="https://firebasestorage.googleapis.com/v0/b/jmtransport-df658.firebasestorage.app/o/kunayala53925.jpg?alt=media&token=c5111d87-fbb1-48d0-83f6-3f75ab1ca004" alt="Panama" />
        <div className="bk-hero-overlay" />
        <div className="bk-hero-content">
          <h1>Book Your Premium Journey</h1>
          <p>Experience Panama with the highest standards of reliability and luxury. Fill out the form below to secure your private transport or curated tour.</p>
        </div>
      </div>

      {/* Body */}
      <div className="bk-body">

        {/* Form */}
        <div className="bk-form-card">
          <h2>Reservation Details</h2>
          <div className="bk-grid">

            <div className="bk-field">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>

            <div className="bk-field">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="bk-field">
              <label>WhatsApp Number</label>
              <div className="bk-phone-wrap">
                <span className="bk-phone-prefix">+ 507</span>
                <input type="tel" placeholder="0000-0000" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="bk-field">
              <label>Number of People</label>
              <input type="number" value={people} min={1} onChange={e => setPeople(e.target.value)} />
            </div>

            <div className="bk-field">
              <label>Preferred Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>

            <div className="bk-field">
              <label>Tour / Service Selected</label>
              <select value={selectedTour} onChange={e => setSelectedTour(e.target.value)}>
                <option value="">Select a service...</option>
                <optgroup label="Tours">
                  <option value="Pasadía San Blas 2026">Pasadía San Blas 2026</option>
                  <option value="Monkey Tour">Monkey Tour</option>
                  <option value="City Tour Panamá">City Tour Panamá</option>
                  <option value="Beach Transfers">Beach Transfers</option>
                  <option value="Colón Histórico Tour">Colón Histórico Tour</option>
                  <option value="Portobelo Adventure">Portobelo Adventure</option>
                  <option value="Airport Transfer">Airport Transfer</option>
                  <option value="Custom Experience">Custom Experience</option>
                </optgroup>
                <optgroup label="Fleet — Private Vehicle / Flota — Vehiculos Privados">
                  <option value="Chevrolet Suburban">Chevrolet Suburban</option>
                  <option value="Mercedes-Benz Sprinter">Mercedes-Benz Sprinter</option>
                  <option value="Toyota Prado">Toyota Prado</option>
                  <option value="Kia Carens">Kia Carens</option>
                  <option value="Kia Carnival">Kia Carnival</option>
                  <option value="Geely Okavango">Geely Okavango</option>
                  <option value="Chery Tiggo 8 Pro">Chery Tiggo 8 Pro</option>
                  <option value="Suzuki XL7">Suzuki XL7</option>
                  <option value="Toyota Coaster">Toyota Coaster</option>
                  <option value="Toyota Hiace">Toyota Hiace</option>
                  <option value="Hyundai Universe">Hyundai Universe</option>
                </optgroup>
              </select>
            </div>

            <div className="bk-field full">
              <label>Additional Notes</label>
              <textarea placeholder="Flight details, specific pickup points, or special requests..." value={notes} onChange={e => setNotes(e.target.value)} />
            </div>

          </div>

          <button className="bk-submit" onClick={handleSubmit}>
            Submit Booking Request
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
          <p className="bk-note">⚡ After submission, you will be redirected to WhatsApp for instant confirmation.</p>
        </div>

        {/* Sidebar */}
        <div className="bk-sidebar">

          <div className="bk-contact-card">
            <h3>Direct Contact</h3>

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
                <span>bookings@jmtransport.pa</span>
              </div>
            </div>

            <div className="bk-contact-item">
              <div className="bk-contact-icon ig">
                <svg viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#e1306c" stroke="none" />
                </svg>
              </div>
              <div className="bk-contact-info">
                <strong>Instagram</strong>
                <span>@JMTRANSPORTPA</span>
              </div>
            </div>

            <hr className="bk-divider" />

            <div className="bk-why">
              <h4>Why choose JM Transport?</h4>
              {[
                'Licensed Professional Drivers',
                'Modern Luxury Fleet',
                'Bilingual Staff (ES/EN)',
                'Punctuality Guaranteed',
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
              <h3>Our Premium Fleet</h3>
              <p>From executive sedans to luxury sprinter vans.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}