import './css/tours.css';
//import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer.tsx';
import Navbarwhite from '../components/navbar_fondo.tsx';

export default function Booking() {
  //const navigate = useNavigate();

  const handleSubmit = () => {
    const phone = '50762166675';
    const message = encodeURIComponent('Hello! I would like to book a service with JM Transport Group.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
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
              <input type="text" placeholder="John Doe" />
            </div>

            <div className="bk-field">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" />
            </div>

            <div className="bk-field">
              <label>WhatsApp Number</label>
              <div className="bk-phone-wrap">
                <span className="bk-phone-prefix">+ 507</span>
                <input type="tel" placeholder="0000-0000" />
              </div>
            </div>

            <div className="bk-field">
              <label>Number of People</label>
              <input type="number" defaultValue={1} min={1} />
            </div>

            <div className="bk-field">
              <label>Preferred Date</label>
              <input type="date" />
            </div>

            <div className="bk-field">
              <label>Tour / Service Selected</label>
              <select>
                <option value="">Select a service...</option>
                <option>Pasadía San Blas 2026</option>
                <option>Monkey Tour</option>
                <option>City Tour Panamá</option>
                <option>Airport Transfer</option>
                <option>Custom Experience</option>
              </select>
            </div>

            <div className="bk-field full">
              <label>Additional Notes</label>
              <textarea placeholder="Flight details, specific pickup points, or special requests..." />
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
                <svg viewBox="0 0 24 24" fill="#25D366"><path d="M7.25 18.49l.72.42A10 10 0 1020 12a10 10 0 00-9.19 13.94l.42.84-1.77.48 1.79-.73zM2 22l1.36-4.97A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10a9.93 9.93 0 01-5.03-1.36L2 22z" /></svg>
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