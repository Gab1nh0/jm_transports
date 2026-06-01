import './App.css'
import { Hero } from './components/heroSection';
import  Footer  from './components/footer';
import Tours from './components/TourCard';
import Navbar from './components/navbar';
import { ServicesSection } from './components/ServicesSection';
import { SocialPill } from './components/SocialPill';
import { FleetSection } from './pages/fleet';

function App() {

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
