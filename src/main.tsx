import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx';
import Booking from './pages/tours.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={
          <>
            <App />
          </>
        } />
        <Route path="/booking" element={<Booking />} />
         </Routes>
    </LanguageProvider>  
    </BrowserRouter>    
  </StrictMode>,
)
