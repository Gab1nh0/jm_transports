import './App.css'
import { Hero } from './components/heroSection';
import  Footer  from './components/footer';
import Tours from './components/TourCard';
import Navbar from './components/navbar';
import { ServicesSection } from './components/ServicesSection';
import { SocialPill } from './components/SocialPill';
import { FleetSection } from './pages/fleet';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

    const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (!scrollTo) return;

    const timeout = setTimeout(() => {
      const element = document.querySelector(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [location.state]);

  return (
    <div>
      <Navbar />
      <Hero />
      <SocialPill/>
      <ServicesSection />
      <Tours />
      <FleetSection/>
      <Footer />
    </div>


  )
}

export default App
