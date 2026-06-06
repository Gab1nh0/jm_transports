import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebookF, FaTiktok, FaLinkedinIn } from 'react-icons/fa'; 
import './css/SocialPill.css';

export const SocialPill: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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
        href="https://www.instagram.com/jmtransportpa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon instagram"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
      <a 
        href="https://www.facebook.com/share/14esQusDxQT/?mibextid=wwXIfr" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon facebook"
        aria-label="Facebook"
      >
        <FaFacebookF />
      </a>
      <a 
        href="https://www.tiktok.com/@jmtransportpanama?is_from_webapp=1&sender_device=pc" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon tiktok"
        aria-label="TikTok"
      >
        <FaTiktok />
      </a>
    
      <a 
        href="https://linkedin.com/company/tu_usuario" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="social-icon linkedin"
        aria-label="LinkedIn"
      >
        <FaLinkedinIn />
      </a>
    </div>
  );
};