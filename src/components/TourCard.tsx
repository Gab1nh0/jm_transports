import './css/TourCard.css';
import { useNavigate } from 'react-router-dom';

export default function Tours() {
  const navigate = useNavigate();

  return (
    <div className="tc-root">
      <div className="tc-header">
        <h2>Exclusive Tours</h2>
        <p>Selected premium experiences for our corporate and luxury clients.</p>
        <div className="tc-filters">
          {['All', 'Beach', 'Nature', 'Urban'].map(f => (
            <button
              key={f}
              className={`tc-filter ${f === 'All' ? 'active' : ''}`}
              onClick={e => {
                document.querySelectorAll('.tc-filter').forEach(b => b.classList.remove('active'));
                (e.target as HTMLButtonElement).classList.add('active');
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="tc-grid">

        {/* San Blas */}
        <div className="tc-card sanblas">
          <img className="tc-card-img" src="https://i0.wp.com/panamamastertours.com/wp-content/uploads/2023/08/panama-city-4-day-island-hopping-san-blas-adventure-1695289.webp?fit=1500%2C1001&ssl=1" alt="San Blas" />
          <div className="tc-card-body">
            <div className="tc-badges">
              <span className="tc-badge featured">Featured</span>
              <span className="tc-badge rated">Top Rated</span>
            </div>
            <div className="tc-card-top">
              <h3>Pasadía San Blas 2026</h3>
              <div className="tc-price"><span>FROM</span><strong>$125</strong></div>
            </div>
            <div className="tc-meta">
              <span className="tc-meta-item">⏱ Full day</span>
              <span className="tc-meta-item">👥 Private group</span>
            </div>
            <p className="tc-desc">Escape to the paradise of Guna Yala. Crystal clear waters, white sand beaches, and a unique indigenous culture in the archipelago of 365 islands.</p>
            <div className="tc-tags">
              <span className="tc-tag">4×4 Transport</span>
              <span className="tc-tag">Lunch included</span>
              <span className="tc-tag">Boat rides</span>
            </div>
            <button className="tc-btn" onClick={() => navigate('/booking')}>Book Now</button>
          </div>
        </div>

        {/* Monkey */}
        <div className="tc-card monkey">
          <img className="tc-card-img" src="https://img.magnific.com/foto-gratis/macaco-cola-munon-cara-roja-selva-verde_475641-1561.jpg?semt=ais_hybrid&w=740&q=80" alt="Monkey Tour" />
          <div className="tc-card-body">
            <div className="tc-card-top">
              <h3>Monkey Tour</h3>
              <div className="tc-price"><strong>$65</strong></div>
            </div>
            <div className="tc-meta">
              <span className="tc-meta-item">⏱ Half day</span>
            </div>
            <p className="tc-desc">Experience the biodiversity of the Panama Canal and meet its most famous residents up close.</p>
            <div className="tc-includes">
              <span className="tc-include">Boat ride on the Canal</span>
              <span className="tc-include">Wildlife spotting</span>
              <span className="tc-include">Hotel pickup & drop-off</span>
            </div>
            <button className="tc-btn" onClick={() => navigate('/booking')}>Book Now</button>
          </div>
        </div>

        {/* City Tour */}
        <div className="tc-card city">
          <img className="tc-card-img" src="https://media.istockphoto.com/id/1097678776/es/foto/skyline-ciudad-de-panam%C3%A1.jpg?s=612x612&w=0&k=20&c=HIF5ggcAMc_0VCkUxnun1dwEpoXV29FYrBpBzVOHD88=" alt="City Tour" />
          <div className="tc-card-body">
            <div className="tc-card-top">
              <h3>City Tour Panamá</h3>
              <div className="tc-price"><span>UP TO 3 PAX</span><strong>$140</strong></div>
            </div>
            <div className="tc-meta">
              <span className="tc-meta-item">⏱ 5 hours</span>
              <span className="tc-meta-item">🚗 Pro driver</span>
            </div>
            <p className="tc-desc">A perfect mix of history, engineering marvels, and modern skyscrapers across Panama City.</p>
            <div className="tc-includes">
              <span className="tc-include">Panama Canal Miraflores</span>
              <span className="tc-include">Casco Antiguo Walking Tour</span>
              <span className="tc-include">Amador Causeway & Skyline</span>
            </div>
            <button className="tc-btn" onClick={() => navigate('/booking')}>Book Now</button>
          </div>
        </div>

        {/* Custom */}
        <div className="tc-custom">
          <h3>Need a Custom Experience?</h3>
          <p>We specialize in tailoring luxury tours for corporate retreats, family gatherings, and VIP guests.</p>
          <a href="https://wa.me/50762166675" target="_blank" rel="noreferrer">
            Contact our Concierge Team →
          </a>
        </div>

      </div>
    </div>
  );
}