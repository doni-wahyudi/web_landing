import { useRef } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import personImage from '../assets/hero_alt.png';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const { language } = useLanguage();
  const { openWhatsAppModal } = useWhatsAppModal();

  const translations = {
    id: {
      badge: "Jasa Pembuatan Website Premium",
      title: "Tingkatkan Omset Bisnis Anda",
      titleSuffix: "dengan Website",
      titleGradient: "Profesional & Elegan",
      subtitle: "Klien kami rata-rata melaporkan peningkatan 40% dalam permintaan online dalam 90 hari pertama setelah peluncuran. Dapatkan desain premium lengkap dengan Domain .COM gratis dan pemeliharaan teknis terpercaya.",
      ctaConsult: "Konsultasi Gratis - Respon 10 Menit",
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
      subtitle: "Our clients report an average 40% increase in online inquiries within the first 90 days of launch. Get premium designs complete with a free .COM domain and trusted technical maintenance.",
      ctaConsult: "Free Consultation — 1 Hour Response",
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
      <div className="container hero-container">
        <div className="hero-content animate-entrance">
          <div className="badge delay-100">
            <span className="badge-dot"></span>
            {t.badge}
          </div>

          <h1 className="hero-title delay-200">
            {language === 'id' ? (
              <>
                {t.title} <br className="desktop-only" /> {t.titleSuffix} <span className="text-gradient">{t.titleGradient}</span>
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
            <button 
              className="btn btn-primary btn-lg btn-glint"
              onClick={() => openWhatsAppModal(language === 'en' ? 'Company Profile Website' : 'Company Profile Website')}
            >
              {t.ctaConsult} <FiArrowRight />
            </button>
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
          <div className="hero-image-card">
            <img 
              src={personImage} 
              alt="Professional Project" 
              className="hero-main-image"
              fetchpriority="high"
              loading="eager"
            />
            <div className="card-glass-sheen"></div>
          </div>
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

