import './App.css'
import { Hero } from './components/heroSection';
import  Footer  from './components/footer';
import Tours from './components/TourCard';
import Navbar from './components/navbar';
import { ServicesSection } from './components/ServicesSection';

function App() {

  return (
    <div>
      <Navbar />
      <Hero />
      <ServicesSection />
      <Tours />
      <Footer />
    </div>


  )
}

export default App
