import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.tours': 'Tours',
    'nav.fleet': 'Fleet',
    'nav.about': 'About',
    'nav.booking': 'Booking',

    // Hero
    'hero.title': 'Explore Panama with Comfort, Safety & Style',
    'hero.subtitle': 'Private transportation, airport transfers and unforgettable tours across Panama. Experience the best of the tropics with a first-class executive touch.',
    'hero.btn.contact': 'Contact Us',
    'hero.btn.tours': 'Explore Tours',
    'hero.dock.drivers': 'Professional Drivers',
    'hero.dock.vehicles': 'Comfortable Vehicles',
    'hero.dock.transfers': 'Safe Transfers',
    'hero.dock.prices': 'Affordable Prices',

    // Footer
    'footer.description': 'Leading premium transportation and tourism logistics in the Republic of Panama since 2012.',
    'footer.quicklinks': 'Quick Links',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.faq': 'FAQ',
    'footer.corporate': 'Corporate Travel',
    'footer.services': 'Services',
    'footer.airport': 'Airport Transfers',
    'footer.citytours': 'City Tours',
    'footer.intercity': 'Inter-city Travel',
    'footer.events': 'Special Events',
    'footer.location': 'Location',
    'footer.address': 'Ave. Federico Boyd & Calle 51,\nScotia Plaza Building, 7th Floor,\nBella Vista, Panama City',
    'footer.phone': 'Landline: 3104785',
    'footer.rights': '© 2025 JM Transport Group Panama. All rights reserved.',
    'about.contact.title': 'Contact & Location',
    'about.contact.address': 'Ave. Federico Boyd & Calle 51,\nScotia Plaza Building, 7th Floor,\nBella Vista, Panama City',
    'about.contact.phone': 'Landline: 3104785',
    // Tours
    'tours.playas.title': 'Beach Transfers',
    'tours.playas.desc': 'Private, comfortable, and punctual transportation service to major beach areas and resorts.',
    'tours.playas.price_label': 'Up to 4 passengers',
    'tours.playas.price': '$125',
    'tours.playas.tag1': 'Modern Vehicles',
    'tours.playas.tag2': 'Unlimited Luggage',
    'tours.playas.tag3': '24/7 Support',
    'tours.playas.destinations': 'Destinations: RIU Playa Blanca, Gran Evenia Bijao, Decameron, Buenaventura.',
    'tours.colon.title': 'Historic Colon Tour (Fort San Lorenzo + Agua Clara)',
    'tours.colon.desc': 'A journey focused on history, canal engineering, and nature, departing from Panama City.',
    'tours.colon.price_label': 'Min. 2 passengers',
    'tours.colon.price': '$125/pax',
    'tours.colon.inc1': 'Fort San Lorenzo (UNESCO)',
    'tours.colon.inc2': 'Agua Clara visitor center',
    'tours.colon.inc3': 'Roundtrip A/C transport',
    'tours.colon.inc4': 'Certified drivers & water bottle',
    'tours.portobelo.title': 'Portobelo & Its Charms (Full Tour)',
    'tours.portobelo.desc': 'A comprehensive tour of the Caribbean Coast combining history, culture, and paradise beaches.',
    'tours.portobelo.price_label': 'Min. 2 passengers',
    'tours.portobelo.price': '$125/pax',
    'tours.portobelo.inc1': 'Portobelo history & Black Christ',
    'tours.portobelo.inc2': 'Venas Azules mangrove boat ride',
    'tours.portobelo.inc3': 'Playa Blanca (Colon) beach time',
    'tours.portobelo.inc4': 'Roundtrip transport & water',
  },
  es: {
    // Navbar
    'nav.services': 'Servicios',
    'nav.tours': 'Tours',
    'nav.fleet': 'Flota',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',

    // Hero
    'hero.title': 'Explora Panamá con Comodidad, Seguridad y Estilo',
    'hero.subtitle': 'Transporte privado, traslados al aeropuerto y tours inolvidables por Panamá. Vive lo mejor del trópico con un toque ejecutivo de primera clase.',
    'hero.btn.contact': 'Contáctanos',
    'hero.btn.tours': 'Ver Tours',
    'hero.dock.drivers': 'Conductores Profesionales',
    'hero.dock.vehicles': 'Vehículos Cómodos',
    'hero.dock.transfers': 'Traslados Seguros',
    'hero.dock.prices': 'Precios Accesibles',

    // Footer
    'footer.description': 'Proveedor líder de transporte y logística turística en la República de Panamá desde 2012.',
    'footer.quicklinks': 'Enlaces Rápidos',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.faq': 'Preguntas Frecuentes',
    'footer.corporate': 'Viajes Corporativos',
    'footer.services': 'Servicios',
    'footer.airport': 'Traslados al Aeropuerto',
    'footer.citytours': 'Tours por la Ciudad',
    'footer.intercity': 'Viajes Interurbanos',
    'footer.events': 'Eventos Especiales',
    'footer.location': 'Ubicación',
    'footer.address': 'Ave. Federico Boyd y Calle 51,\nEdificio Scotia Plaza, Piso 7,\nBella Vista, Ciudad de Panamá',
    'footer.phone': 'Teléfono fijo: 3104785',
    'footer.rights': '© 2025 JM Transport Group Panamá. Todos los derechos reservados.',
    'about.contact.title': 'Contacto y Ubicación',
    'about.contact.address': 'Ave. Federico Boyd y Calle 51,\nEdificio Scotia Plaza, Piso 7,\nBella Vista, Ciudad de Panamá',
    'about.contact.phone': 'Teléfono fijo: 3104785',
    // Tours
    'tours.playas.title': 'Traslados a Playas',
    'tours.playas.desc': 'Servicio de transporte privado, cómodo y puntual hacia las principales zonas de playa y resorts.',
    'tours.playas.price_label': 'Hasta 4 pasajeros',
    'tours.playas.price': '$125',
    'tours.playas.tag1': 'Vehículos Modernos',
    'tours.playas.tag2': 'Equipaje sin límites',
    'tours.playas.tag3': 'Atención 24/7',
    'tours.playas.destinations': 'Destinos: RIU Playa Blanca, Gran Evenia Bijao, Decameron, Buenaventura.',
    'tours.colon.title': 'Tour Colón Histórico (Fuerte San Lorenzo + Agua Clara)',
    'tours.colon.desc': 'Un viaje enfocado en la historia, la ingeniería del canal y la naturaleza, con salida desde la Ciudad de Panamá.',
    'tours.colon.price_label': 'Mínimo 2 personas',
    'tours.colon.price': '$125/persona',
    'tours.colon.inc1': 'Fuerte San Lorenzo (UNESCO)',
    'tours.colon.inc2': 'Centro de Visitantes Agua Clara',
    'tours.colon.inc3': 'Transporte climatizado A/C',
    'tours.colon.inc4': 'Chofer certificado y agua',
    'tours.portobelo.title': 'Portobelo y sus Encantos (Tour Completo)',
    'tours.portobelo.desc': 'Un tour integral por la Costa Caribe que combina historia, cultura y playas paradisíacas.',
    'tours.portobelo.price_label': 'Mínimo 2 personas',
    'tours.portobelo.price': '$125/persona',
    'tours.portobelo.inc1': 'Historia de Portobelo e Iglesia Cristo Negro',
    'tours.portobelo.inc2': 'Paseo en lancha por Venas Azules',
    'tours.portobelo.inc3': 'Relajación en Playa Blanca (Colón)',
    'tours.portobelo.inc4': 'Transporte de ida/vuelta y agua',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'es' : 'en');

  const t = (key: string): string => {
    return (translations[lang] as Record<string, string>)[key] ?? key;
  };
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}