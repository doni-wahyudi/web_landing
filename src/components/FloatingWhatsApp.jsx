import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.css';
import { useLanguage } from '../context/LanguageContext';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const { openWhatsAppModal } = useWhatsAppModal();

  const translations = {
    id: {
      message: "Chat via WhatsApp — Respon dalam 1 jam kerja",
      defaultText: "Halo Aurotech, saya ingin berkonsultasi mengenai pembuatan website..."
    },
    en: {
      message: "Chat via WhatsApp — Response within 1 hour",
      defaultText: "Hello Aurotech, I would like to consult about website development..."
    },
    de: {
      message: "Kontakt via WhatsApp — Antwort innerhalb 1 Stunde",
      defaultText: "Hallo Aurotech, ich wünsche eine Beratung bezüglich Webentwicklung..."
    }
  };

  const t = translations[language] || translations.id;

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
      <button 
        onClick={() => openWhatsAppModal(
          language === 'en' 
            ? 'General Consultation / Others' 
            : language === 'de' 
            ? 'Allgemeine Beratung / Sonstiges' 
            : 'Konsultasi Umum / Lainnya'
        )}
        className="floating-whatsapp-btn"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
