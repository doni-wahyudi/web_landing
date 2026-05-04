import {
  FiMonitor, FiSmartphone, FiTrendingUp, FiShield, FiClock, FiHeadphones,
  FiLayers, FiLayout, FiDatabase, FiSearch, FiCode, FiZap, FiMessageSquare
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './Services.css';

const Services = () => {
  const { language } = useLanguage();

  const coreSolutionsId = [
    {
      icon: <FiLayout />,
      title: "Premium Company Profile",
      desc: "Membangun kredibilitas B2B dengan desain institusional yang elegan dan informatif.",
      highlight: "Sangat Rekomen"
    },
    {
      icon: <FiLayers />,
      title: "Landing Page Konversi Tinggi",
      desc: "Dirancang khusus untuk kampanye marketing dengan fokus pada tingkat konversi pelanggan.",
      highlight: "Terpopuler"
    },
    {
      icon: <FiDatabase />,
      title: "Custom Web Application",
      desc: "Sistem dashboard, CRM, atau portal internal yang dibangun sesuai kebutuhan bisnis unik Anda.",
      highlight: "Enterprise"
    }
  ];

  const coreSolutionsEn = [
    {
      icon: <FiLayout />,
      title: "Premium Company Profile",
      desc: "Building B2B credibility with an elegant and informative institutional design.",
      highlight: "Highly Recommended"
    },
    {
      icon: <FiLayers />,
      title: "High-Conversion Landing Page",
      desc: "Designed specifically for marketing campaigns focusing on customer conversion rates.",
      highlight: "Most Popular"
    },
    {
      icon: <FiDatabase />,
      title: "Custom Web Application",
      desc: "Dashboard systems, CRM, or internal portals built to fit your unique business needs.",
      highlight: "Enterprise"
    }
  ];

  const benefitsId = [
    {
      icon: <FiZap />,
      title: "Laju Loading Sangat Cepat",
      desc: "Optimasi core web vitals untuk pengalaman pengguna tanpa hambatan."
    },
    en: {
      heroTitle: "Digital Solutions",
      heroTitleGradient: "Without Compromise",
      heroSubtitle: "We combine premium aesthetics with cutting-edge technology to create websites that don't just exist, but perform.",
      workTitle: "Professional",
      workTitleGradient: "Workflow",
      workSubtitle: "How we turn your vision into digital reality.",
      standardTitle: "Aurotech",
      standardTitleGradient: "Standards",
      standardSubtitle: "Every line of code we write is designed for excellence.",
      ctaTitle: "Ready to Build Your Digital Presence?",
      ctaDesc: "Consult your website needs with our experts now.",
      ctaButton: "Start Free Consultation",
      coreSolutions: [
        {
          title: "Premium Company Profile",
          desc: "Build B2B credibility with an elegant and informative institutional design.",
          highlight: "Highly Recommended"
        },
        {
          title: "High-Conversion Landing Page",
          desc: "Specially designed for marketing campaigns with a focus on customer conversion rates.",
          highlight: "Most Popular"
        },
        {
          title: "Custom Web Application",
          desc: "Dashboard systems, CRM, or internal portals built to fit your unique business needs.",
          highlight: "Enterprise"
        }
      ],
      benefits: [
        {
          title: "Lightning Fast Loading",
          desc: "Core web vitals optimization for a seamless user experience."
        },
        {
          title: "Ultimate Mobile Experience",
          desc: "Not just responsive, but designed for thumb-friendly comfort."
        },
        {
          title: "Data Security Priority",
          desc: "Implementation of modern security standards to protect your digital assets."
        }
      ],
      steps: [
        {
          num: "01",
          title: "Discovery & Strategy",
          desc: "Deep discussions to understand your audience, competitors, and business goals."
        },
        {
          num: "02",
          title: "UI/UX Design",
          desc: "Creation of aesthetic and functional visual prototypes for approval."
        },
        {
          num: "03",
          title: "Development",
          desc: "Coding process using the latest technology stack for fast results."
        },
        {
          num: "04",
          title: "Final QA & Launch",
          desc: "Rigorous testing across browsers and SEO integration before going live."
        }
      ]
    }
  };

  const benefitsEn = [
    {
      icon: <FiZap />,
      title: "Ultra-Fast Loading Speed",
      desc: "Core web vitals optimization for a seamless user experience."
    },
    {
      icon: <FiSmartphone />,
      title: "Ultimate Mobile Experience",
      desc: "Not just responsive, but designed for thumb-friendly user comfort."
    },
    {
      icon: <FiShield />,
      title: "Data Security Priority",
      desc: "Implementation of modern security standards to protect your digital assets."
    }
  ];

  const stepsId = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "Diskusi mendalam untuk memahami audiens, kompetitor, dan tujuan bisnis Anda."
    },
    {
      num: "02",
      title: "UI/UX Design",
      desc: "Pembuatan prototipe visual yang estetik dan fungsional untuk disetujui."
    },
    {
      num: "03",
      title: "Development",
      desc: "Proses coding menggunakan stack teknologi terbaru untuk hasil yang kencang."
    },
    {
      num: "04",
      title: "Final QA & Launch",
      desc: "Pengujian ketat di berbagai browser dan integrasi SEO sebelum go-live."
    }
  ];

  const stepsEn = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "In-depth discussions to understand your audience, competitors, and business goals."
    },
    {
      num: "02",
      title: "UI/UX Design",
      desc: "Creation of aesthetic and functional visual prototypes for approval."
    },
    {
      num: "03",
      title: "Development",
      desc: "Coding process using the latest technology stack for fast results."
    },
    {
      num: "04",
      title: "Final QA & Launch",
      desc: "Rigorous testing across multiple browsers and SEO integration before go-live."
    }
  ];

  const translations = {
    id: {
      title: "Solusi Digital",
      titleGradient: "Tanpa Kompromi",
      subtitle: "Kami menggabungkan estetika premium dengan teknologi mutakhir untuk menciptakan website yang bukan sekadar ada, tapi menghasilkan.",
      processTitle: "Alur Kerja",
      processGradient: "Profesional",
      processSubtitle: "Bagaimana kami mewujudkan visi Anda menjadi realitas digital.",
      standardTitle: "Standar",
      standardGradient: "Aurotech",
      standardSubtitle: "Setiap baris kode yang kami tulis didesain untuk keunggulan.",
      ctaTitle: "Siap Membangun Kehadiran Digital Anda?",
      ctaDesc: "Konsultasikan kebutuhan website Anda dengan pakar kami sekarang.",
      ctaButton: "Mulai Konsultasi Gratis"
    },
    en: {
      title: "Digital Solutions",
      titleGradient: "Without Compromise",
      subtitle: "We combine premium aesthetics with cutting-edge technology to create websites that don't just exist, but perform.",
      processTitle: "Professional",
      processGradient: "Workflow",
      processSubtitle: "How we turn your vision into digital reality.",
      standardTitle: "Aurotech",
      standardGradient: "Standards",
      standardSubtitle: "Every line of code we write is designed for excellence.",
      ctaTitle: "Ready to Build Your Digital Presence?",
      ctaDesc: "Consult your website needs with our experts now.",
      ctaButton: "Start Free Consultation"
    }
  };

  const coreSolutions = language === 'en' ? coreSolutionsEn : coreSolutionsId;
  const benefits = language === 'en' ? benefitsEn : benefitsId;
  const steps = language === 'en' ? stepsEn : stepsId;
  const t = translations[language] || translations.id;

  return (
    <div className="services-page-container">
      {/* COMBINED HERO & SOLUTIONS SECTION */}
      <section className="section services-top-section">
        <div className="container">
          <div className="section-header text-center mb-16">
            <h1 className="section-title h1 animate-entrance">
              {language === 'id' ? (
                <>
                  {t.title} <br /> <span className="text-gradient">{t.titleGradient}</span>
                </>
              ) : (
                <>
                  {t.title} <span className="text-gradient">{t.titleGradient}</span>
                </>
              )}
            </h1>
            <p className="section-subtitle lg animate-entrance delay-100">
              {t.subtitle}
            </p>
          </div>

          <div className="solutions-grid">
            {coreSolutions.map((sol, index) => (
              <div key={index} className={`solution-card glass animate-entrance delay-${(index + 1) * 150}`}>
                <div className="solution-badge">{sol.highlight}</div>
                <div className="service-icon-wrapper gold-bg">
                  {sol.icon}
                </div>
                <h3 className="service-title">{sol.title}</h3>
                <p className="service-desc">{sol.desc}</p>
                <ul className="solution-features">
                  <li>Premium Design</li>
                  <li>Fast Loading</li>
                  <li>SEO Ready</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORKING PROCESS */}
      <section className="section process-section bg-secondary">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">{t.processTitle} <span className="text-gradient">{t.processGradient}</span></h2>
            <p className="section-subtitle">{t.processSubtitle}</p>
          </div>

          <div className="process-workflow">
            {t.steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.num}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                {index < t.steps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY US / BENEFITS */}
      <section className="section benefits-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">{t.standardTitle} <span className="text-gradient">{t.standardGradient}</span></h2>
            <p className="section-subtitle">{t.standardSubtitle}</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <div className="benefit-icon">{benefit.icon}</div>
                <div className="benefit-text">
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="section cta-section-mini glass">
        <div className="container text-center">
          <h2 className="cta-title animate-entrance">{t.ctaTitle}</h2>
          <p className="cta-desc animate-entrance delay-100">{t.ctaDesc}</p>
          <div className="cta-actions animate-entrance delay-200">
            <a href="https://wa.me/6282182252766" className="btn btn-primary btn-lg btn-glint">
              <FiMessageSquare /> {t.ctaButton}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

