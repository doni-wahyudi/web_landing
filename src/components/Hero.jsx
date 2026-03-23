import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-glow"></div>
      
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <div className="badge delay-100">
            <span className="badge-dot"></span>
            #1 Jasa Pembuatan Website Premium
          </div>
          
          <h1 className="hero-title delay-200">
            Tingkatkan Omset Bisnis Anda dengan Website <span className="text-gradient">Profesional & Elegan</span>
          </h1>
          
          <p className="hero-subtitle delay-300">
            Satu-satunya jasa pembuatan website yang berani memberikan garansi 100% kepuasan. Gratis Domain .COM, desain premium, dan support tanpa batas.
          </p>
          
          <div className="hero-actions delay-300">
            <a href="https://wa.me/6281234567890" className="btn btn-primary btn-lg">
              Konsultasi Sekarang <FiArrowRight />
            </a>
            <a href="#portfolio" className="btn btn-outline btn-lg">
              Lihat Portfolio
            </a>
          </div>

          <div className="hero-trust delay-300">
            <div className="trust-item">
              <FiCheckCircle className="trust-icon" />
              <span>Garansi 100% Uang Kembali</span>
            </div>
            <div className="trust-item">
              <FiCheckCircle className="trust-icon" />
              <span>Gratis Domain .COM</span>
            </div>
            <div className="trust-item">
              <FiCheckCircle className="trust-icon" />
              <span>Gratis Hosting</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in delay-200">
          <div className="hero-mockup-wrapper glass">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="mockup-url">webuildpremium.com</div>
            </div>
            <div className="mockup-body">
              {/* Abstract premium layout shapes */}
              <div className="skeleton-hero">
                <div className="skel-title"></div>
                <div className="skel-sub"></div>
                <div className="skel-btn"></div>
              </div>
              <div className="skeleton-cards">
                <div className="skel-card"></div>
                <div className="skel-card"></div>
                <div className="skel-card"></div>
              </div>
            </div>
          </div>
          
          {/* Decorative glowing orbs */}
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
