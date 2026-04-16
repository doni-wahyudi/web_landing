import { useEffect, useState } from 'react';
import './Preloader.css';
import logoImg from '../assets/logo_auro.png';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    // Premium timing: 2.2 seconds before starting exit reveal
    const timer = setTimeout(() => {
      setExitAnimation(true);
      // Extra 800ms for the slide-up animation to complete
      setTimeout(() => setLoading(false), 800);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader-wrapper ${exitAnimation ? 'exit-active' : ''}`}>
      <div className="preloader-content">
        <div className="logo-glitch-wrapper">
          <img src={logoImg} alt="Aurotech Logo" className="preloader-logo" />
          <div className="scanline"></div>
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
        <div className="preloader-text">
          <span>Auro</span>tech <span className="text-muted">Digital Agency</span>
        </div>
      </div>
      
      {/* Decorative background grids */}
      <div className="preloader-grid"></div>
    </div>
  );
};

export default Preloader;
