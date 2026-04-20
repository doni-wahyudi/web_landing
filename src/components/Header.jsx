import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logoImg from '../assets/logo_auro.png';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header className={`header ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <img src={logoImg} alt="Aurotech Logo" />
          </span>
          <span className="logo-text">Auro<span className="text-gradient">tech</span></span>
        </Link>

        <nav className={`nav-links ${isMobileMenuOpen ? 'open glass' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Layanan</Link>
          <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
          <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Harga</Link>
          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          <div className="nav-cta-wrapper">
            <a href="https://wa.me/6282182252766" className="btn btn-primary btn-glint nav-cta" onClick={() => setIsMobileMenuOpen(false)}>
              Konsultasi Gratis
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
