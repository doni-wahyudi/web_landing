import { useRef } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import personImage from '../assets/person_image.webp';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const { language } = useLanguage();

  const translations = {
    id: {
      badge: "Jasa Pembuatan Website Premium",
      title: "Tingkatkan Omset Bisnis Anda",
      titleSuffix: "dengan Website",
      titleGradient: "Profesional & Elegan",
      subtitle: "Membangun aset digital yang estetik dan siap untuk mempercepat pertumbuhan bisnis Anda. Dapatkan desain premium lengkap dengan Domain .COM gratis dan pemeliharaan teknis terpercaya.",
      ctaConsult: "Konsultasi Sekarang",
      ctaPortfolio: "Lihat Portfolio",
      trust1: "Revisi Unlimited",
      trust2: "Gratis Domain .com",
      trust3: "Gratis Hosting",
      scroll: "Scroll Down"
    },
    en: {
      badge: "Premium Website Development Services",
      title: "Increase Your Business Turnover",
      titleSuffix: "with a",
      titleGradient: "Professional & Elegant Website",
      subtitle: "Building aesthetic digital assets ready to accelerate your business growth. Get premium designs complete with a free .COM domain and trusted technical maintenance.",
      ctaConsult: "Consult Now",
      ctaPortfolio: "View Portfolio",
      trust1: "Unlimited Revisions",
      trust2: "Free .com Domain",
      trust3: "Free Hosting",
      scroll: "Scroll Down"
    }
  };

  const t = translations[language] || translations.id;

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg-glow"></div>

      <div className="container hero-container">
        <div className="hero-content animate-entrance">
          <div className="badge delay-100">
            <span className="badge-dot"></span>
            {t.badge}
          </div>

          <h1 className="hero-title delay-200">
            {language === 'id' ? (
              <>
                {t.title} <br /> {t.titleSuffix} <span className="text-gradient">{t.titleGradient}</span>
              </>
            ) : (
              <>
                {t.title} {t.titleSuffix} <span className="text-gradient">{t.titleGradient}</span>
              </>
            )}
          </h1>

          <p className="hero-subtitle delay-300">
            {t.subtitle}
          </p>

          <div className="hero-actions delay-400">
            <a href="https://wa.me/6282182252766" className="btn btn-primary btn-lg btn-glint">
              {t.ctaConsult} <FiArrowRight />
            </a>
            <a href="#portfolio" className="btn btn-outline btn-lg">
              {t.ctaPortfolio}
            </a>
          </div>

          <div className="hero-trust delay-300">
            <div className="trust-item">
              <FiCheckCircle className="trust-icon" />
              <span>{t.trust1}</span>
            </div>
            <div className="trust-item">
              <FiCheckCircle className="trust-icon" />
              <span>{t.trust2}</span>
            </div>
            <div className="trust-item">
              <FiCheckCircle className="trust-icon" />
              <span>{t.trust3}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fade-in delay-200">
          <div className="hero-main-image-wrapper">
            <img 
              src={personImage} 
              alt="Professional Project" 
              className="hero-main-image" 
              fetchpriority="high"
              loading="eager"
            />
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
        <span>{t.scroll}</span>
      </div>
    </section>
  );
};

export default Hero;

