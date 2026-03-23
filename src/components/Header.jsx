import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
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
          <span className="logo-icon">▲</span>
          <span className="logo-text">WeBuild<span className="text-gradient">Premium</span></span>
        </Link>

        <nav className={`nav-links ${isMobileMenuOpen ? 'open glass' : ''}`}>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Layanan</Link>
          <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
          <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Harga</Link>
          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          <a href="https://wa.me/6281234567890" className="btn btn-primary nav-cta" onClick={() => setIsMobileMenuOpen(false)}>
            Konsultasi Gratis
          </a>
        </nav>

        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
