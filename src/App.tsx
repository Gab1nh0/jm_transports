import './App.css'
import { Hero } from './components/heroSection';
import  Footer  from './components/footer';
import Tours from './components/TourCard';
import Navbar from './components/navbar';

function App() {

  return (
    <div>
      <Navbar />
      <Hero />
      <Tours />
      <Footer />
    </div>


  )
}

export default App
