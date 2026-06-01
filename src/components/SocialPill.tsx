import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import './css/SocialPill.css';

export const SocialPill: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true); // Inicia visible porque entramos en el Hero

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Controla el límite de visibilidad. 
      // Si el usuario baja más de 400px (mitad del Hero aprox), la píldora se oculta.
      if (currentScrollY < 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`social-pill-container ${isVisible ? 'show' : 'hide'}`}>
      <a 
        href="https://instagram.com/tu_usuario" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon instagram"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
      <a 
        href="https://facebook.com/tu_usuario" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon facebook"
        aria-label="Facebook"
      >
        <FaFacebookF />
      </a>
      <a 
        href="https://tiktok.com/@tu_usuario" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon tiktok"
        aria-label="TikTok"
      >
        <FaTiktok />
      </a>
    </div>
  );
};