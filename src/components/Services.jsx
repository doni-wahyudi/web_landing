import {
  FiMonitor, FiSmartphone, FiTrendingUp, FiShield, FiClock, FiHeadphones,
  FiLayers, FiLayout, FiDatabase, FiSearch, FiCode, FiZap, FiMessageSquare
} from 'react-icons/fi';
import './Services.css';

const Services = () => {
  const coreSolutions = [
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

  const benefits = [
    {
      icon: <FiZap />,
      title: "Laju Loading Sangat Cepat",
      desc: "Optimasi core web vitals untuk pengalaman pengguna tanpa hambatan."
    },
    {
      icon: <FiSmartphone />,
      title: "Ultimate Mobile Experience",
      desc: "Bukan sekadar responsif, tapi didesain untuk kenyamanan pengguna jempol."
    },
    {
      icon: <FiShield />,
      title: "Prioritas Keamanan Data",
      desc: "Implementasi standar keamanan modern untuk melindungi aset digital Anda."
    }
  ];

  const steps = [
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

  return (
    <div className="services-page-container">
      {/* COMBINED HERO & SOLUTIONS SECTION */}
      <section className="section services-top-section">
        <div className="container">
          <div className="section-header text-center mb-16">
            <h1 className="section-title h1 animate-entrance">Solusi Digital <br /> <span className="text-gradient">Tanpa Kompromi</span></h1>
            <p className="section-subtitle lg animate-entrance delay-100">
              Kami menggabungkan estetika premium dengan teknologi mutakhir untuk menciptakan website yang bukan sekadar ada, tapi menghasilkan.
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
            <h2 className="section-title">Alur Kerja <span className="text-gradient">Profesional</span></h2>
            <p className="section-subtitle">Bagaimana kami mewujudkan visi Anda menjadi realitas digital.</p>
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
            <h2 className="section-title">Standar <span className="text-gradient">Aurotech</span></h2>
            <p className="section-subtitle">Setiap baris kode yang kami tulis didesain untuk keunggulan.</p>
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
          <h2 className="cta-title animate-entrance">Siap Membangun Kehadiran Digital Anda?</h2>
          <p className="cta-desc animate-entrance delay-100">Konsultasikan kebutuhan website Anda dengan pakar kami sekarang.</p>
          <div className="cta-actions animate-entrance delay-200">
            <a href="https://wa.me/6282182252766" className="btn btn-primary btn-lg btn-glint">
              <FiMessageSquare /> Mulai Konsultasi Gratis
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
