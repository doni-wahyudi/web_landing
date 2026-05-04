import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo_auro.webp';
import typographyImg from '../assets/typography_white.webp';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const translations = {
    id: {
      home: "Beranda",
      services: "Layanan",
      portfolio: "Portfolio",
      pricing: "Harga",
      faq: "FAQ",
      cta: "Konsultasi Gratis"
    },
    en: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      pricing: "Pricing",
      faq: "FAQ",
      cta: "Free Consultation"
    }
  };

  const t = translations[language] || translations.id;

  return (
    <header className={`header ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <img src={logoImg} alt="Aurotech Logo" />
          </span>
          <img src={typographyImg} alt="Aurotech" className="logo-typography" />
        </Link>

        <nav className={`nav-links ${isMobileMenuOpen ? 'open glass' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>{t.home}</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>{t.services}</Link>
          <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>{t.portfolio}</Link>
          <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>{t.pricing}</Link>
          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>{t.faq}</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          
          <div className="lang-switch">
            <button 
              className={`lang-btn ${language === 'id' ? 'active' : ''}`} 
              onClick={() => setLanguage('id')}
            >
              ID
            </button>
            <span className="lang-separator">|</span>
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>

          <div className="nav-cta-wrapper">
            <a href="https://wa.me/6282182252766" className="btn btn-primary btn-glint nav-cta" onClick={() => setIsMobileMenuOpen(false)}>
              {t.cta}
            </a>
          </div>
        </nav>

        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;

