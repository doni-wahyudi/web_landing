import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.css';
import { useLanguage } from '../context/LanguageContext';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  const translations = {
    id: {
      message: "Chat via WhatsApp — Respon dalam 1 jam kerja",
      defaultText: "Halo Aurotech, saya ingin berkonsultasi mengenai pembuatan website..."
    },
    en: {
      message: "Chat via WhatsApp — Response within 1 hour",
      defaultText: "Hello Aurotech, I would like to consult about website development..."
    }
  };

  const t = translations[language] || translations.id;
  const phoneNumber = "6285219461408";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(t.defaultText)}`;

  useEffect(() => {
    // Show button after scrolling down a bit
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={`floating-whatsapp-container ${isVisible ? 'visible' : ''}`}>
      <div className="whatsapp-tooltip">
        {t.message}
      </div>
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
