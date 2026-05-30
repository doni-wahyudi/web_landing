import {
  FiMonitor, FiSmartphone, FiTrendingUp, FiShield, FiClock, FiHeadphones,
  FiLayers, FiLayout, FiDatabase, FiSearch, FiCode, FiZap, FiMessageSquare
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import './Services.css';

const Services = () => {
  const { language } = useLanguage();
  const { openWhatsAppModal } = useWhatsAppModal();

  const coreSolutionsId = [
    {
      icon: <FiLayout />,
      title: "Company Profile Website",
      desc: "Membangun kredibilitas B2B dengan desain institusional yang elegan dan informatif.",
      highlight: "Sangat Rekomen",
      features: ["Premium Design", "Fast Loading", "Estimasi: 5–7 hari kerja"]
    },
    {
      icon: <FiSearch />,
      title: "E-Commerce / Toko Online",
      desc: "Platform jualan online lengkap dengan fitur keranjang belanja dan pembayaran.",
      highlight: "Bisnis Retail",
      features: ["Payment Gateway", "Manajemen Produk", "Estimasi: 14–21 hari kerja"]
    },
    {
      icon: <FiLayers />,
      title: "Landing Page / Iklan",
      desc: "Dirancang khusus untuk kampanye marketing dengan fokus pada tingkat konversi pelanggan.",
      highlight: "Terpopuler",
      features: ["Copywriting Konversi", "A/B Testing Ready", "Estimasi: 3–5 hari kerja"]
    },
    {
      icon: <FiDatabase />,
      title: "Custom Web Application",
      desc: "Sistem dashboard, CRM, atau portal internal yang dibangun sesuai kebutuhan bisnis unik Anda.",
      highlight: "Enterprise",
      features: ["Sistem Kompleks", "Integrasi Database", "Estimasi: Sesuai Scope"]
    },
    {
      icon: <FiShield />,
      title: "Maintenance & Support Plan",
      desc: "Layanan pemeliharaan, update konten, dan dukungan teknis berkelanjutan.",
      highlight: "Berlangganan",
      features: ["Update Bulanan", "Keamanan", "Fast Response Support"]
    }
  ];

  const coreSolutionsEn = [
    {
      icon: <FiLayout />,
      title: "Company Profile Website",
      desc: "Building B2B credibility with an elegant and informative institutional design.",
      highlight: "Highly Recommended",
      features: ["Premium Design", "Fast Loading", "Est: 5–7 working days"]
    },
    {
      icon: <FiSearch />,
      title: "E-Commerce / Online Store",
      desc: "Online selling platform complete with shopping cart and payment features.",
      highlight: "Retail Business",
      features: ["Payment Gateway", "Product Management", "Est: 14–21 working days"]
    },
    {
      icon: <FiLayers />,
      title: "High-Conversion Landing Page",
      desc: "Designed specifically for marketing campaigns focusing on customer conversion rates.",
      highlight: "Most Popular",
      features: ["Conversion Copywriting", "A/B Testing Ready", "Est: 3–5 working days"]
    },
    {
      icon: <FiDatabase />,
      title: "Custom Web Application",
      desc: "Dashboard systems, CRM, or internal portals built to fit your unique business needs.",
      highlight: "Enterprise",
      features: ["Complex Systems", "Database Integration", "Est: Custom Scope"]
    },
    {
      icon: <FiShield />,
      title: "Maintenance & Support Plan",
      desc: "Ongoing maintenance, content updates, and technical support services.",
      highlight: "Subscription",
      features: ["Monthly Updates", "Security", "Fast Response Support"]
    }
  ];

  const marketingSolutionsId = [
    {
      icon: <FiTrendingUp />,
      title: "Google Ads",
      desc: "Tangkap calon konsumen yang siap membeli di halaman pertama Google tepat saat mencari layanan Anda.",
      highlight: "Urgensi Tinggi",
      features: ["Riset Kata Kunci & Kompetitor", "Setup Search & Maps Ads", "Ad Copywriting Persuasif", "Optimasi Negative Keywords"]
    },
    {
      icon: <FiZap />,
      title: "Meta Ads (FB & IG)",
      desc: "Jangkau jutaan target pasar secara masif berdasarkan lokasi geografis, usia, dan minat spesifik.",
      highlight: "Visual Branding",
      features: ["A/B Testing Target Audiens", "Desain Visual & Editing Video", "Setup Meta Pixel & Tracking", "Targeting Lokal (Radius 5–10 KM)"]
    },
    {
      icon: <FiMessageSquare />,
      title: "Social Media Management",
      desc: "Ubah profil Instagram/TikTok Anda menjadi etalase digital premium yang estetik dan tepercaya.",
      highlight: "Brand Authority",
      features: ["Kalender Konten Bulanan", "Desain Feeds & Stories", "Copywriting Caption & Tagar", "Optimasi Profil & Interaksi"]
    },
    {
      icon: <FiSearch />,
      title: "Search Engine Optimization (SEO)",
      desc: "Melejitkan visibilitas organik bisnis Anda di Google secara jangka panjang tanpa biaya klik iklan.",
      highlight: "Organik & Stabil",
      features: ["Riset Kata Kunci Funnel Mendalam", "Produksi Artikel Teroptimasi SEO", "Technical SEO & Schema Markup", "Backlink Building Berkualitas"]
    }
  ];

  const marketingSolutionsEn = [
    {
      icon: <FiTrendingUp />,
      title: "Google Ads",
      desc: "Capture high-intent buyers on Google's first page precisely when they search for your services.",
      highlight: "High Urgency",
      features: ["Keyword & Competitor Research", "Search & Maps Ads Setup", "Persuasive Ad Copywriting", "Negative Keyword Optimization"]
    },
    {
      icon: <FiZap />,
      title: "Meta Ads (FB & IG)",
      desc: "Reach millions of targeted prospects massively based on location, age, and specific interests.",
      highlight: "Visual Branding",
      features: ["A/B Audience Testing", "Visual Design & Video Editing", "Meta Pixel & Conversion Setup", "Local Radius targeting (5–10 KM)"]
    },
    {
      icon: <FiMessageSquare />,
      title: "Social Media Management",
      desc: "Transform your Instagram/TikTok profile into a premium, aesthetic, and trustworthy digital storefront.",
      highlight: "Brand Authority",
      features: ["Monthly Content Calendar", "Feeds & Stories Graphic Design", "Persuasive Captions & Hashtags", "Profile & Interactive Optimization"]
    },
    {
      icon: <FiSearch />,
      title: "Search Engine Optimization (SEO)",
      desc: "Elevate your business organic visibility on Google long-term without recurring pay-per-click costs.",
      highlight: "Organic & Stable",
      features: ["Full-Funnel Keyword Research", "SEO-Optimized Content Production", "Technical SEO & Schema Markup", "High-Quality Backlink Building"]
    }
  ];

  const enterpriseSolutionsId = [
    {
      icon: <FiMonitor />,
      title: "Media Monitoring",
      desc: "Pantau reputasi brand dan pergerakan kompetitor di internet secara real-time untuk keputusan strategis.",
      highlight: "Real-time Intelligence",
      features: ["Pelacakan Kata Kunci Sentimen", "Monitoring Media Sosial & Cetak", "Live Dashboard Pelaporan", "Analisis Kompetitor Berkala"]
    },
    {
      icon: <FiCode />,
      title: "Sistem Informasi & Aplikasi",
      desc: "Digitalisasi operasional bisnis Anda dengan sistem internal (CRM/ERP) dan aplikasi mobile kustom.",
      highlight: "Digitalisasi Efisien",
      features: ["Otomatisasi Catatan Keuangan", "Manajemen Stok & Inventaris", "Dashboard Analitik Kustom", "Integrasi Sistem Terbuka"]
    }
  ];

  const enterpriseSolutionsEn = [
    {
      icon: <FiMonitor />,
      title: "Media Monitoring",
      desc: "Track brand reputation and competitor movements in real-time for data-driven strategic decisions.",
      highlight: "Real-time Intelligence",
      features: ["Sentiment & Keyword Tracking", "Social, Print & TV Monitoring", "Live Dashboard Analytics", "Regular Competitor Insights"]
    },
    {
      icon: <FiCode />,
      title: "Information Systems & Apps",
      desc: "Digitize your business operations with bespoke internal systems (CRM/ERP) and custom mobile applications.",
      highlight: "Efficient Digitize",
      features: ["Finance Record Automation", "Stock & Inventory Management", "Custom Analytical Dashboards", "Open API/System Integration"]
    }
  ];

  const benefitsId = [
    {
      icon: <FiZap />,
      title: "Laju Loading Sangat Cepat",
      desc: "Optimasi core web vitals untuk pengalaman pengguna tanpa hambatan."
    },
    {
      icon: <FiSmartphone />,
      title: "Pengalaman Mobile Terbaik",
      desc: "Bukan sekadar responsif, tapi didesain untuk kenyamanan ibu jari pengguna."
    },
    {
      icon: <FiShield />,
      title: "Prioritas Keamanan Data",
      desc: "Implementasi standar keamanan modern untuk melindungi aset digital Anda."
    }
  ];


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
      catWeb: "1. Core Web Solutions",
      catMarketing: "2. Digital Marketing & SEO",
      catEnterprise: "3. Enterprise & Analytics",
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
      catWeb: "1. Core Web Solutions",
      catMarketing: "2. Digital Marketing & SEO",
      catEnterprise: "3. Enterprise & Analytics",
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
  const marketingSolutions = language === 'en' ? marketingSolutionsEn : marketingSolutionsId;
  const enterpriseSolutions = language === 'en' ? enterpriseSolutionsEn : enterpriseSolutionsId;
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

          {/* Group 1: Core Web Solutions */}
          <div className="service-category-group mb-16">
            <h2 className="category-group-title text-gradient mb-8">{t.catWeb}</h2>
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
                    {sol.features && sol.features.map((feat, fIndex) => (
                      <li key={fIndex}>{feat}</li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => openWhatsAppModal(sol.title)}
                    className="btn btn-outline btn-sm w-full"
                    style={{ marginTop: '1.5rem' }}
                  >
                    {language === 'en' ? 'Select Service' : 'Pilih Layanan'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Digital Marketing & SEO */}
          <div className="service-category-group mb-16">
            <h2 className="category-group-title text-gradient mb-8">{t.catMarketing}</h2>
            <div className="solutions-grid">
              {marketingSolutions.map((sol, index) => (
                <div key={index} className={`solution-card glass animate-entrance delay-${(index + 1) * 150}`}>
                  <div className="solution-badge">{sol.highlight}</div>
                  <div className="service-icon-wrapper gold-bg">
                    {sol.icon}
                  </div>
                  <h3 className="service-title">{sol.title}</h3>
                  <p className="service-desc">{sol.desc}</p>
                  <ul className="solution-features">
                    {sol.features && sol.features.map((feat, fIndex) => (
                      <li key={fIndex}>{feat}</li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => openWhatsAppModal(sol.title)}
                    className="btn btn-outline btn-sm w-full"
                    style={{ marginTop: '1.5rem' }}
                  >
                    {language === 'en' ? 'Select Service' : 'Pilih Layanan'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Group 3: Enterprise & Analytics */}
          <div className="service-category-group">
            <h2 className="category-group-title text-gradient mb-8">{t.catEnterprise}</h2>
            <div className="solutions-grid">
              {enterpriseSolutions.map((sol, index) => (
                <div key={index} className={`solution-card glass animate-entrance delay-${(index + 1) * 150}`}>
                  <div className="solution-badge">{sol.highlight}</div>
                  <div className="service-icon-wrapper gold-bg">
                    {sol.icon}
                  </div>
                  <h3 className="service-title">{sol.title}</h3>
                  <p className="service-desc">{sol.desc}</p>
                  <ul className="solution-features">
                    {sol.features && sol.features.map((feat, fIndex) => (
                      <li key={fIndex}>{feat}</li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => openWhatsAppModal(sol.title)}
                    className="btn btn-outline btn-sm w-full"
                    style={{ marginTop: '1.5rem' }}
                  >
                    {language === 'en' ? 'Select Service' : 'Pilih Layanan'}
                  </button>
                </div>
              ))}
            </div>
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
            {steps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.num}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                {index < steps.length - 1 && <div className="step-connector"></div>}
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
            <button 
              className="btn btn-primary btn-lg btn-glint"
              onClick={() => openWhatsAppModal(language === 'en' ? 'Company Profile Website' : 'Company Profile Website')}
            >
              <FiMessageSquare /> {t.ctaButton}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

