import { useRef } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import personImage from '../assets/person_image.png';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg-glow"></div>

      <div className="container hero-container">
        <div className="hero-content animate-entrance">
          <div className="badge delay-100">
            <span className="badge-dot"></span>
            Jasa Pembuatan Website Premium
          </div>

          <h1 className="hero-title delay-200">
            Tingkatkan Omset Bisnis&nbsp;Anda <br /> dengan Website <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>Profesional & Elegan</span>
          </h1>


          <p className="hero-subtitle delay-300">
            Satu-satunya jasa pembuatan website yang berani memberikan garansi 100% kepuasan. Gratis Domain .COM, desain premium, dan support tanpa batas.
          </p>

          <div className="hero-actions delay-400">
            <a href="https://wa.me/6282182252766" className="btn btn-primary btn-lg btn-glint">
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
          <div className="hero-main-image-wrapper">
            <img src={personImage} alt="Professional Project" className="hero-main-image" />
          </div>

          {/* Decorative glowing orbs */}
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
      </div>

      <div className="scroll-indicator animate-entrance delay-400">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
