import './css/about_us.css';
import Navbarwhite from '../components/navbar_fondo.tsx';

const teamMembers = [
  {
    name: 'Nombre Apellido',
    role: 'Founder & Lead Guide',
    bio: 'Born in Panama City, Carlos has spent over 15 years exploring every corner of the isthmus. His local knowledge and logistics expertise are the backbone of every tour.',
    photo: '', // agregar url
  },
  {
    name: 'Nombre Apellido',
    role: 'Operations & Concierge',
    bio: 'With a background in luxury hospitality, Valeria ensures every detail is confirmed before you arrive — from airport pickup to that last sunset on Isla Perro.',
    photo: '',
  },
  {
    name: 'Nombre Apellido',
    role: 'Corporate Travel Specialist',
    bio: 'Diego manages our corporate accounts and group logistics, coordinating multi-day retreats with the precision that executive teams demand.',
    photo: '',
  },
];

const stats = [
  { num: '12+', label: 'Years of experience' },
  { num: '4k',  label: 'Guests served' },
  { num: '18',  label: 'Curated destinations' },
  { num: '100%', label: 'Private experiences' },
];

const values = [
  {
    icon: '◇',
    title: 'Uncompromising quality',
    desc: 'Every vehicle, guide, and supplier is carefully vetted. We only work with partners who share our standard for detail.',
  },
  {
    icon: '♡',
    title: 'Radical personalization',
    desc: 'No two groups are the same. Every itinerary is built around your goals, pace, and curiosity — not our inventory.',
  },
  {
    icon: '❧',
    title: 'Responsible travel',
    desc: 'We operate with deep respect for the communities we visit — particularly in indigenous territories like Guna Yala.',
  },
];

export default function AboutUs() {
  

  return (
    <>
    <Navbarwhite />
    <div className="ab-root">

      {/* ── Hero ── */}
      <div className="ab-hero">
        <div className="ab-hero-left">
          <div className="ab-eyebrow">About us</div>
          <h1>Panama through<br /><em>local eyes</em></h1>
          <p>
            We are a boutique tour operator born in Panama City, dedicated to crafting
            extraordinary experiences for luxury and corporate travelers who want to go
            beyond the ordinary.
          </p>
        </div>
        <div className="ab-hero-right">
          {stats.map(s => (
            <div className="ab-stat-cell" key={s.label}>
              <div className="ab-stat-num">{s.num}</div>
              <div className="ab-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Story ── */}
      <div className="ab-section">
        <div className="ab-section-header">
          <span className="ab-section-num">01</span>
          <h2>Our story</h2>
        </div>
        <div className="ab-story-grid">
          <div className="ab-story-col">
            <div className="ab-story-year">Founded 2012</div>
            <h3>From a passion for Panama to a curated travel brand</h3>
            <p>
              Panama Master Tours was born out of a simple frustration: the country's most
              spectacular places were either unknown or inaccessible to travelers who expected
              more. We set out to change that — one private, well-designed experience at a time.
            </p>
          </div>
          <div className="ab-story-col">
            <div className="ab-story-year">Today</div>
            <h3>Specialists in luxury and corporate travel</h3>
            <p>
              Over a decade later, we have built a reputation among corporate travel managers,
              five-star hotels, and discerning travelers for delivering seamless, deeply personal
              experiences across San Blas, the Panama Canal, and the capital — always with a
              local guide, never on a schedule that isn't yours.
            </p>
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="ab-section">
        <div className="ab-section-header">
          <span className="ab-section-num">02</span>
          <h2>What we stand for</h2>
        </div>
        <div className="ab-values-grid">
          {values.map(v => (
            <div className="ab-value-card" key={v.title}>
              <div className="ab-value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Team ── */}
      <div className="ab-section">
        <div className="ab-section-header">
          <span className="ab-section-num">03</span>
          <h2>Meet the team</h2>
        </div>
        <div className="ab-team-grid">
          {teamMembers.map(m => (
            <div className="ab-team-card" key={m.name}>
              {m.photo
                ? <img className="ab-team-img" src={m.photo} alt={m.name} />
                : <div className="ab-team-img-placeholder" aria-hidden="true">👤</div>
              }
              <div className="ab-team-body">
                <div className="ab-team-name">{m.name}</div>
                <div className="ab-team-role">{m.role}</div>
                <p className="ab-team-bio">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="ab-cta">
        <div className="ab-cta-left">
          <h2>Ready to plan<br />your experience?</h2>
          <p>Talk to our concierge and let's design something remarkable.</p>
        </div>
        <a
          className="ab-cta-btn"
          href="https://wa.me/50762166675"
          target="_blank"
          rel="noreferrer"
        >
          Contact us on WhatsApp →
        </a>
      </div>

    </div>
    </>
  );
}