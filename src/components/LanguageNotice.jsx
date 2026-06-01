import { useState, useEffect } from 'react';
import { FiGlobe, FiX } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './LanguageNotice.css';

const LanguageNotice = () => {
  const { language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    // Check if the user has already selected or dismissed the language selector notice
    const hasNotified = localStorage.getItem('site_lang_notified');
    if (!hasNotified) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Elegant delay after preloader fades out
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    handleDismiss();
  };

  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('site_lang_notified', 'true');
    }, 400); // Let slide-out animation complete
  };

  if (!isVisible) return null;

  const content = {
    id: {
      title: "Pilih Bahasa",
      subtitle: "Pilih bahasa tampilan situs yang paling nyaman untuk Anda.",
      idBtn: "Bahasa Indonesia",
      enBtn: "English",
      deBtn: "Deutsch"
    },
    en: {
      title: "Choose Language",
      subtitle: "Choose the display language that is most comfortable for you.",
      idBtn: "Bahasa Indonesia",
      enBtn: "English",
      deBtn: "Deutsch"
    },
    de: {
      title: "Sprache wählen",
      subtitle: "Wählen Sie die für Sie bequemste Anzeigesprache.",
      idBtn: "Bahasa Indonesia",
      enBtn: "English",
      deBtn: "Deutsch"
    }
  };

  const t = content[language] || content.id;

  return (
    <div className={`lang-notice-card glass ${isDismissing ? 'slide-out' : 'slide-in'}`}>
      <button className="lang-notice-close" onClick={handleDismiss} aria-label="Tutup pemberitahuan">
        <FiX size={16} />
      </button>
      <div className="lang-notice-header">
        <div className="lang-notice-icon-box">
          <FiGlobe className="globe-glow" size={20} />
        </div>
        <div className="lang-notice-title-box">
          <h4>{t.title}</h4>
          <p>{t.subtitle}</p>
        </div>
      </div>
      <div className="lang-notice-actions">
        <button 
          className={`btn-lang-notice ${language === 'id' ? 'active' : ''}`}
          onClick={() => handleSelectLanguage('id')}
        >
          {t.idBtn}
        </button>
        <button 
          className={`btn-lang-notice ${language === 'en' ? 'active' : ''}`}
          onClick={() => handleSelectLanguage('en')}
        >
          {t.enBtn}
        </button>
        <button 
          className={`btn-lang-notice ${language === 'de' ? 'active' : ''}`}
          onClick={() => handleSelectLanguage('de')}
        >
          {t.deBtn}
        </button>
      </div>
    </div>
  );
};

export default LanguageNotice;
