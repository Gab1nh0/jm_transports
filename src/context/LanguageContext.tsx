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
    'footer.address': 'Avenida Balboa, Financial District\nPanama City, Panama',
    'footer.rights': '© 2024 JM Transport Group Panama. All rights reserved.',
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
    'footer.address': 'Avenida Balboa, Distrito Financiero\nCiudad de Panamá, Panamá',
    'footer.rights': '© 2024 JM Transport Group Panamá. Todos los derechos reservados.',
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