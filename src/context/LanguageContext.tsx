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
    'nav.services': 'Services',
    'nav.tours': 'Tours',
    'nav.fleet': 'Fleet',
    'nav.booking': 'Booking',
    'nav.about': 'About',
    'nav.contact': 'Contact',

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
    'tours.playas.price': '$125/pax',
    'tours.playas.meta1': '⏱ Oneway / Roundtrip',
    'tours.playas.meta2': 'Private',
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
    'tours.colon.meta1': '⏱ Fullday',
    'tours.colon.meta2': 'Private Trip',

    'tours.portobelo.title': 'Portobelo & Its Charms (Full Tour)',
    'tours.portobelo.desc': 'A comprehensive tour of the Caribbean Coast combining history, culture, and paradise beaches.',
    'tours.portobelo.price_label': 'Min. 2 passengers',
    'tours.portobelo.price': '$125/pax',
    'tours.portobelo.inc1': 'Portobelo history & Black Christ',
    'tours.portobelo.inc2': 'Venas Azules mangrove boat ride',
    'tours.portobelo.inc3': 'Playa Blanca (Colon) beach time',
    'tours.portobelo.inc4': 'Roundtrip transport & water',
    'tours.portobelo.meta1': '⏱ Fullday',
    'tours.portobelo.meta2': 'Adventure',


    // San Blas Tour
    'tours.sanblas.title': 'San Blas Getaway 2026',
    'tours.sanblas.desc': 'Escape to the paradise of Guna Yala — crystal-clear waters, white sand beaches, and a unique indigenous culture across an archipelago of 365 islands.',
    'tours.sanblas.badge1': 'Featured',
    'tours.sanblas.badge2': 'Top Rated',
    'tours.sanblas.meta1': 'Full day',
    'tours.sanblas.meta2': 'Private group',
    'tours.sanblas.tag1': '4×4 Transport',
    'tours.sanblas.tag2': 'Lunch included',
    'tours.sanblas.tag3': 'Boat rides',
    'tours.sanblas.price_label': '$125/pax',

    // Monkey Tour
    'tours.monkey.title': 'Monkey Tour',
    'tours.monkey.price_label': 'Half day',
    'tours.monkey.price': '$65/pax',
    'tours.monkey.desc': 'Discover the biodiversity of the Panama Canal and meet its most famous residents up close in their natural habitat.',
    'tours.monkey.inc1': 'Boat ride on the Canal',
    'tours.monkey.inc2': 'Wildlife spotting',
    'tours.monkey.inc3': 'Hotel pickup & drop-off',

    // City Tour
    'tours.city.title': 'City Tour Panamá',
    'tours.city.price_label': 'Up to 3 pax',
    'tours.city.price': '$140/pax',
    'tours.city.desc': 'A perfect mix of history, engineering marvels, and modern skyscrapers across the highlights of Panama City.',
    'tours.city.meta1': '5 hours',
    'tours.city.meta2': 'Pro driver',
    'tours.city.inc1': 'Panama Canal — Miraflores',
    'tours.city.inc2': 'Casco Antiguo walking tour',
    'tours.city.inc3': 'Amador Causeway & skyline',

    // Tours Section Header
    'tours.header.subtitle': 'EXCLUSIVE TOURS',
    'tours.header.title': 'Selected Premium Experiences',
    'tours.header.desc': 'Curated luxury and corporate itineraries across Panama\'s most iconic destinations.',
    'tours.filter.all': 'All',
    'tours.filter.beach': 'Beach',
    'tours.filter.nature': 'Nature',
    'tours.filter.urban': 'Urban',

    // Services Section
    'services.header': 'OUR SERVICES',
    'services.title': 'Premium Mobility Solutions in Panama',
    'services.airport.tag': 'Most Popular',
    'services.airport.title': 'Airport Transfers',
    'services.airport.desc': 'Punctual door-to-door pickup at Tocumen International (PTY). Tracked flights and professional meet & greet.',
    'services.airport.link': 'Book Transfer →',
    'services.corporate.title': 'Executive Chauffeur',
    'services.corporate.desc': 'First-class mobility for business meetings, corporate events, and VIP itineraries.',
    'services.corporate.link': 'Learn More →',
    'services.tours.title': 'Custom Panama Tours',
    'services.tours.desc': 'Discover the Canal, Casco Antiguo, and tropical destinations with flexible private guides.',
    'services.tours.link': 'Explore Tours →',
    'services.modal.tag': 'Service Details',
    'services.modal.howworks': 'How It Works:',
    'services.modal.quote': 'Quote via WhatsApp',
    
    // Airport Service Details
    'services.airport.subtitle': 'Tocumen International (PTY) & Marcos A. Gelabert (Albrook)',
    'services.airport.desc.long': 'Our premium airport service is engineered to eliminate travel stress. We coordinate every detail from flight tracking to luggage handling so your arrival or departure in Panama is completely seamless.',
    'services.airport.step1': 'Real-Time Flight Tracking: We monitor your flight path. If your arrival is delayed or early, your chauffeur will adjust accordingly.',
    'services.airport.step2': 'Professional Meet & Greets: Your driver will await you at the arrivals gate holding a customized sign with your name or corporate logo.',
    'services.airport.step3': 'Complimentary Wait Time: Includes 60 minutes of complimentary waiting time after your flight lands, giving you ample time for customs and baggage claim.',
    'services.airport.step4': 'Luggage Assistance & Comfort: Full help loading your bags into a climate-controlled premium vehicle equipped with bottled water.',
    'services.airport.note1': 'Includes toll fees (Corredor Sur).',
    'services.airport.note2': 'Child seats available upon prior request.',
    
    // Corporate Service Details
    'services.corporate.subtitle': 'First-Class Corporate Mobility Solutions',
    'services.corporate.desc.long': 'Designed for corporate executives, state visits, and business travelers who value absolute punctuality, confidentiality, and flawless execution.',
    'services.corporate.step1': 'By-the-Hour or Full-Day Service: Retain a dedicated vehicle and professional driver for your entire business itinerary.',
    'services.corporate.step2': 'Bilingual Professional Chauffeurs: Drivers trained in corporate protocol, navigation, and security, speaking fluent English and Spanish.',
    'services.corporate.step3': 'On-Board Executive Perks: Vehicles equipped with Wi-Fi connectivity, device chargers, and refreshing amenities to keep you productive.',
    'services.corporate.step4': 'Flawless Logistics Coordination: Ideal for roadshows, corporate summits, and multi-destination meeting schedules.',
    'services.corporate.note1': 'Discreet, unbranded premium vehicles.',
    'services.corporate.note2': 'Confidentiality guaranteed under strict NDA standards.',
    
    // Tours Service Details
    'services.tours.subtitle': 'Bespoke Private Sightseeing & Experiences',
    'services.tours.desc.long': 'Explore the rich history, modern marvels, and breathtaking nature of Panama through a completely tailored private itinerary built around your pace and preferences.',
    'services.tours.step1': 'Tailored Itinerary Planning: Choose from iconic spots like the Panama Canal (Miraflores Locks), Casco Antiguo, Amador Causeway, or Gamboa Rainforest.',
    'services.tours.step2': 'Flexible Timing: No rigid schedules. Spend as much or as little time at each landmark as you wish.',
    'services.tours.step3': 'Expert Local Guidance: Travel alongside knowledgeable drivers who share deep historical and cultural insights about each destination.',
    'services.tours.step4': 'Premium Group Accommodations: Perfect for families, corporate groups, or VIP travelers wanting a relaxed, private excursion.',
    'services.tours.note1': 'Entrance tickets to museums or the Canal are coordinated separately.',
    'services.tours.note2': 'Custom lunch stop recommendations included.',

    // About Us
    'about.eyebrow': 'About us',
    'about.hero.title': 'Panama through local eyes',
    'about.hero.desc': 'We are a boutique tour operator born in Panama City, dedicated to crafting extraordinary experiences for luxury and corporate travelers who want to go beyond the ordinary.',
    'about.stats.exp': 'Years of experience',
    'about.stats.guests': 'Guests served',
    'about.stats.destinations': 'Curated destinations',
    'about.stats.experiences': 'Private experiences',
    'about.story.header': 'Our story',
    'about.story.year1': 'Founded 2012',
    'about.story.title1': 'From a passion for Panama to a curated travel brand',
    'about.story.desc1': 'Panama Master Tours was born out of a simple frustration: the country\'s most spectacular places were either unknown or inaccessible to travelers who expected more. We set out to change that — one private, well-designed experience at a time.',
    'about.story.year2': 'Today',
    'about.story.title2': 'Specialists in luxury and corporate travel',
    'about.story.desc2': 'Over a decade later, we have built a reputation among corporate travel managers, five-star hotels, and discerning travelers for delivering seamless, deeply perl experiences across San Blas, the Panama Canal, and the capital — always with a local guide, never on a schedule that isn\'t yours.',
    'about.team.header': 'Meet the team',
    'about.team.member1.role': 'Founder & Lead Guide',
    'about.team.member1.bio': 'Born in Panama City, Carlos has spent over 15 years exploring every corner of the isthmus. His local knowledge and logistics expertise are the backbone of every tour.',
    'about.team.member2.role': 'Operations & Concierge',
    'about.team.member2.bio': 'With a background in luxury hospitality, Valeria ensures every detail is confirmed before you arrive — from airport pickup to that last sunset on Isla Perro.',
    'about.team.member3.role': 'Corporate Travel Specialist',
    'about.team.member3.bio': 'Diego manages our corporate accounts and group logistics, coordinating multi-day retreats with the precision that executive teams demand.',
    'about.cta.title': 'Ready to plan your experience?',
    'about.cta.desc': 'Talk to our concierge and let\'s design something remarkable.',
    'about.cta.btn': 'Contact us on WhatsApp →',
    'about.address.label': 'Address',
    'about.phone.label': 'Landline',
    'about.whatsapp': 'WhatsApp',

    // Fleet Section
    'fleet.header.subtitle': 'OUR FLEET',
    'fleet.header.title': 'Travel with Style, Comfort & Security',
    'fleet.header.desc': 'Discover our diverse lineup of modern, impeccably maintained vehicles tailored to match your exact corporate, group, or VIP transportation requirements in Panama.',
    'fleet.filter.all': 'All Fleet',
    'fleet.filter.suv': 'SUVs',
    'fleet.filter.coaster': 'Group Vans & Coasters',
    'fleet.filter.vip': 'VIP Experience',
    'fleet.vip.tag': 'VIP Class',
    'fleet.passenger.label': 'Up to {passengers} passengers',
    'fleet.book.btn': 'Book Now',
    'fleet.perks.title': 'All Our Transfers Include:',
    'fleet.benefit.ac': 'Full Air Conditioning',
    'fleet.benefit.tracking': 'Real-Time Flight Tracking',
    'fleet.benefit.luggage': 'Luggage Assistance',
    'fleet.benefit.water': 'Complimentary Bottled Water & Snacks',
    'fleet.benefit.seats': 'Child Seats Available Upon Request',
    'fleet.benefit.drivers': 'Bilingual Professional Drivers',
  },
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.tours': 'Tours',
    'nav.fleet': 'Flota',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.booking': 'Reservas',

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
    'tours.playas.price': '$125/per',
    'tours.playas.meta1': '⏱ Ida / Vuelta',
    'tours.playas.meta2': 'Privado',
    'tours.playas.tag1': 'Vehículos Modernos',
    'tours.playas.tag2': 'Equipaje sin límites',
    'tours.playas.tag3': 'Atención 24/7',
    'tours.playas.destinations': 'Destinos: RIU Playa Blanca, Gran Evenia Bijao, Decameron, Buenaventura.',
    
    'tours.colon.title': 'Tour Colón Histórico (Fuerte San Lorenzo + Agua Clara)',
    'tours.colon.desc': 'Un viaje enfocado en la historia, la ingeniería del canal y la naturaleza, con salida desde la Ciudad de Panamá.',
    'tours.colon.price_label': 'Mínimo 2 pers',
    'tours.colon.price': '$125/per',
    'tours.colon.inc1': 'Fuerte San Lorenzo (UNESCO)',
    'tours.colon.inc2': 'Centro de Visitantes Agua Clara',
    'tours.colon.inc3': 'Transporte climatizado A/C',
    'tours.colon.inc4': 'Chofer certificado y agua',
    'tours.colon.meta1': '⏱ Día completo',
    'tours.colon.meta2': 'Tour Privado',
    
    'tours.portobelo.title': 'Portobelo y sus Encantos (Tour Completo)',
    'tours.portobelo.desc': 'Un tour integral por la Costa Caribe que combina historia, cultura y playas paradisíacas.',
    'tours.portobelo.price_label': 'Mínimo 2 pers',
    'tours.portobelo.price': '$125/per',
    'tours.portobelo.inc1': 'Historia de Portobelo e Iglesia Cristo Negro',
    'tours.portobelo.inc2': 'Paseo en lancha por Venas Azules',
    'tours.portobelo.inc3': 'Relajación en Playa Blanca (Colón)',
    'tours.portobelo.inc4': 'Transporte de ida/vuelta y agua',
    'tours.portobelo.meta1': '⏱ Día completo',
    'tours.portobelo.meta2': 'Aventura',

    // San Blas Tour
    'tours.sanblas.title': 'Pasadía San Blas 2026',
    'tours.sanblas.desc': 'Escapa al paraíso de Guna Yala — aguas cristalinas, playas de arena blanca, y una cultura indígena única en un archipiélago de 365 islas.',
    'tours.sanblas.price_label': '$125/per',
    'tours.sanblas.badge1': 'Destacado',
    'tours.sanblas.badge2': 'Mejor Valorado',
    'tours.sanblas.meta1': 'Día completo',
    'tours.sanblas.meta2': 'Grupo privado',
    'tours.sanblas.tag1': 'Transporte 4×4',
    'tours.sanblas.tag2': 'Almuerzo incluido',
    'tours.sanblas.tag3': 'Paseos en bote',

    // Monkey Tour
    'tours.monkey.title': 'Tour de Monos',
    'tours.monkey.price_label': 'Medio día',
    'tours.monkey.price': '$65/per',
    'tours.monkey.desc': 'Descubre la biodiversidad del Canal de Panamá y conoce a sus residentes más famosos de cerca en su hábitat natural.',
    'tours.monkey.inc1': 'Paseo en bote por el Canal',
    'tours.monkey.inc2': 'Avistamiento de fauna',
    'tours.monkey.inc3': 'Recogida y regreso al hotel',

    // City Tour
    'tours.city.title': 'Tour por la Ciudad de Panamá',
    'tours.city.price_label': 'Hasta 3 pasajeros',
    'tours.city.price': '$140/per',
    'tours.city.desc': 'Una mezcla perfecta de historia, maravillas de la ingeniería y modernos rascacielos en los lugares destacados de la Ciudad de Panamá.',
    'tours.city.meta1': '5 horas',
    'tours.city.meta2': 'Conductor profesional',
    'tours.city.inc1': 'Canal de Panamá — Esclusas de Miraflores',
    'tours.city.inc2': 'Tour a pie por Casco Antiguo',
    'tours.city.inc3': 'Calzada de Amador y vista de la ciudad',

    // Tours Section Header
    'tours.header.subtitle': 'TOURS EXCLUSIVOS',
    'tours.header.title': 'Experiencias Premium Seleccionadas',
    'tours.header.desc': 'Itinerarios de lujo y corporativos curados en los destinos más icónicos de Panamá.',
    'tours.filter.all': 'Todos',
    'tours.filter.beach': 'Playa',
    'tours.filter.nature': 'Naturaleza',
    'tours.filter.urban': 'Urbano',

    // Services Section
    'services.header': 'NUESTROS SERVICIOS',
    'services.title': 'Soluciones Premium de Movilidad en Panamá',
    'services.airport.tag': 'Más Popular',
    'services.airport.title': 'Traslados al Aeropuerto',
    'services.airport.desc': 'Recogida de puerta a puerta puntual en Tocumen Internacional (PTY). Vuelos rastreados y recepción profesional.',
    'services.airport.link': 'Reservar Traslado →',
    'services.corporate.title': 'Chofer Ejecutivo',
    'services.corporate.desc': 'Movilidad de primera clase para reuniones de negocios, eventos corporativos e itinerarios VIP.',
    'services.corporate.link': 'Más Información →',
    'services.tours.title': 'Tours perlizados de Panamá',
    'services.tours.desc': 'Descubre el Canal, Casco Antiguo y destinos tropicales con guías privados flexibles.',
    'services.tours.link': 'Explorar Tours →',
    'services.modal.tag': 'Detalles del Servicio',
    'services.modal.howworks': 'Cómo Funciona:',
    'services.modal.quote': 'Solicitar Cotización por WhatsApp',
    
    // Airport Service Details
    'services.airport.subtitle': 'Tocumen Internacional (PTY) y Marcos A. Gelabert (Albrook)',
    'services.airport.desc.long': 'Nuestro servicio de aeropuerto premium está diseñado para eliminar el estrés de los viajes. Coordinamos cada detalle desde el rastreo de vuelos hasta el manejo del equipaje para que tu llegada o salida de Panamá sea completamente fluida.',
    'services.airport.step1': 'Rastreo de Vuelos en Tiempo Real: Monitoreamos la ruta de tu vuelo. Si tu llegada se retrasa o adelanta, tu chófer se ajustará en consecuencia.',
    'services.airport.step2': 'Recepción Profesional: Tu conductor te esperará en la puerta de llegadas con un cartel perlizado con tu nombre o logo corporativo.',
    'services.airport.step3': 'Tiempo de Espera Gratuito: Incluye 60 minutos de tiempo de espera gratuito después de que tu vuelo aterrice, dándote tiempo suficiente para aduanas y reclamación de equipaje.',
    'services.airport.step4': 'Asistencia de Equipaje y Comodidad: Asistencia completa para cargar tus bolsas en un vehículo premium con aire acondicionado equipado con agua embotellada.',
    'services.airport.note1': 'Incluye peajes (Corredor Sur).',
    'services.airport.note2': 'Asientos para niños disponibles bajo solicitud previa.',
    
    // Corporate Service Details
    'services.corporate.subtitle': 'Soluciones de Movilidad Corporativa de Primera Clase',
    'services.corporate.desc.long': 'Diseñado para ejecutivos corporativos, visitas de estado y viajeros de negocios que valoran la puntualidad absoluta, confidencialidad y ejecución impecable.',
    'services.corporate.step1': 'Servicio por Hora o Día Completo: Retén un vehículo dedicado y conductor profesional para todo tu itinerario comercial.',
    'services.corporate.step2': 'Choferes Profesionales Bilingües: Conductores capacitados en protocolo corporativo, navegación y seguridad, hablando fluidamente inglés y español.',
    'services.corporate.step3': 'Beneficios Ejecutivos a Bordo: Vehículos equipados con conectividad Wi-Fi, cargadores de dispositivos y comodidades refrescantes para mantenerte productivo.',
    'services.corporate.step4': 'Coordinación Logística Impecable: Ideal para encuentros de negocios, cumbres corporativas y agendas de reuniones en múltiples destinos.',
    'services.corporate.note1': 'Vehículos premium discretos y sin marca.',
    'services.corporate.note2': 'Confidencialidad garantizada bajo estándares estrictos de NDA.',
    
    // Tours Service Details
    'services.tours.subtitle': 'Experiencias Privadas perlizadas',
    'services.tours.desc.long': 'Explora la rica historia, maravillas modernas y la naturaleza impresionante de Panamá a través de un itinerario completamente perlizado diseñado alrededor de tu ritmo y preferencias.',
    'services.tours.step1': 'Planificación de Itinerario perlizado: Elige entre lugares icónicos como el Canal de Panamá (Esclusas de Miraflores), Casco Antiguo, Calzada de Amador o la Selva de Gamboa.',
    'services.tours.step2': 'Horarios Flexibles: Sin horarios rígidos. Pasa tanto o tan poco tiempo como desees en cada sitio de interés.',
    'services.tours.step3': 'Orientación de Expertos Locales: Viaja junto a conductores conocedores que comparten profundas perspectivas históricas y culturales sobre cada destino.',
    'services.tours.step4': 'Acomodaciones para Grupos Premium: Perfecto para familias, grupos corporativos o viajeros VIP que desean una excursión privada y relajada.',
    'services.tours.note1': 'Las entradas a museos o el Canal se coordinan por separado.',
    'services.tours.note2': 'Recomendaciones de paradas para almuerzo perlizado incluidas.',

    // About Us
    'about.eyebrow': 'Acerca de nosotros',
    'about.hero.title': 'Panamá a través de ojos locales',
    'about.hero.desc': 'Somos un operador de tours boutique nacido en la Ciudad de Panamá, dedicado a crear experiencias extraordinarias para viajeros de lujo y corporativos que desean ir más allá de lo ordinario.',
    'about.stats.exp': 'Años de experiencia',
    'about.stats.guests': 'Huéspedes atendidos',
    'about.stats.destinations': 'Destinos curados',
    'about.stats.experiences': 'Experiencias privadas',
    'about.story.header': 'Nuestra historia',
    'about.story.year1': 'Fundada 2012',
    'about.story.title1': 'De una pasión por Panamá a una marca de viajes curada',
    'about.story.desc1': 'Panama Master Tours nació de una simple frustración: los lugares más espectaculares del país eran desconocidos o inaccesibles para viajeros que esperaban más. Nos propusimos cambiar eso — una experiencia privada y bien diseñada a la vez.',
    'about.story.year2': 'Hoy',
    'about.story.title2': 'Especialistas en viajes de lujo y corporativos',
    'about.story.desc2': 'Una década después, hemos construido una reputación entre gerentes de viajes corporativos, hoteles de cinco estrellas y viajeros exigentes por entregar experiencias sin problemas y profundamente perles en San Blas, el Canal de Panamá y la capital — siempre con un guía local, nunca en un horario que no sea el tuyo.',
    'about.team.header': 'Conoce al equipo',
    'about.team.member1.role': 'Fundador y Guía Principal',
    'about.team.member1.bio': 'Nacido en la Ciudad de Panamá, Carlos ha pasado más de 15 años explorando cada rincón del istmo. Su conocimiento local y experiencia en logística son la base de cada tour.',
    'about.team.member2.role': 'Operaciones y Conserjería',
    'about.team.member2.bio': 'Con experiencia en hospitalidad de lujo, Valeria asegura que cada detalle esté confirmado antes de tu llegada — desde la recogida en el aeropuerto hasta ese último atardecer en Isla Perro.',
    'about.team.member3.role': 'Especialista en Viajes Corporativos',
    'about.team.member3.bio': 'Diego gestiona nuestras cuentas corporativas y logística de grupos, coordinando retiros de varios días con la precisión que los equipos ejecutivos demandan.',
    'about.cta.title': '¿Listo para planificar tu experiencia?',
    'about.cta.desc': 'Habla con nuestro conserje y diseñemos algo extraordinario.',
    'about.cta.btn': 'Contáctanos por WhatsApp →',
    'about.address.label': 'Dirección',
    'about.phone.label': 'Teléfono Fijo',
    'about.whatsapp': 'WhatsApp',
    
    // Fleet Section
    'fleet.header.subtitle': 'NUESTRA FLOTA',
    'fleet.header.title': 'Viaja con Estilo, Comodidad y Seguridad',
    'fleet.header.desc': 'Descubre nuestra diversa flota de vehículos modernos, impecablemente mantenidos y adaptados a tus necesidades exactas de transporte corporativo, grupal o VIP en Panamá.',
    'fleet.filter.all': 'Toda la Flota',
    'fleet.filter.suv': 'SUVs',
    'fleet.filter.coaster': 'Furgonetas y Autobuses',
    'fleet.filter.vip': 'Experiencia VIP',
    'fleet.vip.tag': 'Clase VIP',
    'fleet.passenger.label': 'Hasta {passengers} pasajeros',
    'fleet.book.btn': 'Reservar Ahora',
    'fleet.perks.title': 'Todos Nuestros Traslados Incluyen:',
    'fleet.benefit.ac': 'Aire Acondicionado Completo',
    'fleet.benefit.tracking': 'Rastreo de Vuelos en Tiempo Real',
    'fleet.benefit.luggage': 'Asistencia de Equipaje',
    'fleet.benefit.water': 'Agua Embotellada y Snacks Cortesía',
    'fleet.benefit.seats': 'Asientos para Niños Disponibles Bajo Solicitud',
    'fleet.benefit.drivers': 'Conductores Profesionales Bilingües',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

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