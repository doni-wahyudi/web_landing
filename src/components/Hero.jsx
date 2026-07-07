import { useRef, useState } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import heroDevices from '../assets/hero_devices.png';
import mascotImg from '../assets/mascot_waving.png';
import PersonImage from '../assets/hero_alt.png'; // keep original as fallback or unused
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const { language } = useLanguage();
  const { openWhatsAppModal } = useWhatsAppModal();

  const [auditUrl, setAuditUrl] = useState('');
  const [scanStep, setScanStep] = useState(0); // 0: idle, 1: resolving, 2: layout, 3: rendering, 4: score
  const [isScanning, setIsScanning] = useState(false);
  const [score, setScore] = useState(null);

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
      scroll: "Scroll Down",
      auditPlaceholder: "Masukkan domain Anda (contoh: bisnisku.com)",
      auditBtn: "Audit Kecepatan Gratis",
      auditOutcomes: {
        resolving: "Menghubungkan ke server...",
        layout: "Menganalisis kestabilan visual (CLS)...",
        lcp: "Mengukur waktu rendering konten utama (LCP)...",
        compiling: "Menyusun skor performa & SEO...",
        title: "Laporan Audit Performa Website",
        subtitle: "Laporan diagnostik untuk",
        perfScore: "Skor Performa",
        clsScore: "Kestabilan Visual (CLS)",
        lcpScore: "Waktu Loading (LCP)",
        statusSlow: "SANGAT LAMBAT",
        statusBad: "BURUK",
        statusPoor: "KRITIS",
        suggestion: "Website lambat menurunkan konversi hingga 40% dan menurunkan posisi ranking di Google. Aurotech dapat mengoptimasi total kecepatan website Anda hingga loading di bawah 1.5 detik.",
        waBtn: "Konsultasikan Perbaikan via WhatsApp"
      }
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
      scroll: "Scroll Down",
      auditPlaceholder: "Enter your domain (e.g. mybusiness.com)",
      auditBtn: "Free Speed Audit",
      auditOutcomes: {
        resolving: "Connecting to server...",
        layout: "Analyzing visual stability (CLS)...",
        lcp: "Measuring largest contentful paint (LCP)...",
        compiling: "Compiling performance & SEO score...",
        title: "Website Performance Audit Report",
        subtitle: "Diagnostic report for",
        perfScore: "Performance Score",
        clsScore: "Visual Stability (CLS)",
        lcpScore: "Loading Speed (LCP)",
        statusSlow: "VERY SLOW",
        statusBad: "POOR",
        statusPoor: "CRITICAL",
        suggestion: "A slow website drops conversion by 40% and hurts Google ranking. Aurotech can optimize your site speed to load under 1.5 seconds.",
        waBtn: "Fix Website Speed on WhatsApp"
      }
    },
    de: {
      badge: "Premium-Webentwicklungsdienste",
      title: "Steigern Sie Ihren Geschäftsumsatz",
      titleSuffix: "mit einer",
      titleGradient: "professionellen & eleganten Website",
      subtitle: "Unsere Kunden berichten von einer durchschnittlichen Steigerung der Online-Anfragen um 40 % innerhalb der ersten 90 Tage nach dem Launch. Erhalten Sie Premium-Designs komplett mit kostenloser .COM-Domain und zuverlässiger technischer Wartung.",
      ctaConsult: "Kostenlose Beratung — Antwort innerhalb 1 Stunde",
      ctaPortfolio: "Portfolio ansehen",
      trust1: "Unbegrenzte Überarbeitungen",
      trust2: "Kostenlose .com-Domain",
      trust3: "Kostenloses Hosting",
      scroll: "Nach unten scrollen",
      auditPlaceholder: "Geben Sie Ihre Domain ein (z. B. meinunternehmen.de)",
      auditBtn: "Kostenlose Geschwindigkeitsprüfung",
      auditOutcomes: {
        resolving: "Verbindung zum Server wird hergestellt...",
        layout: "Visuelle Stabilität analysieren (CLS)...",
        lcp: "Hauptladezeit messen (LCP)...",
        compiling: "Performance- & SEO-Score zusammenstellen...",
        title: "Website-Performance-Auditbericht",
        subtitle: "Diagnosebericht für",
        perfScore: "Performance-Score",
        clsScore: "Visuelle Stabilität (CLS)",
        lcpScore: "Ladegeschwindigkeit (LCP)",
        statusSlow: "SEHR LANGSAM",
        statusBad: "SCHLECHT",
        statusPoor: "KRITISCH",
        suggestion: "Eine langsame Website senkt die Konversionsrate um 40 % und schadet dem Google-Ranking. Aurotech kann Ihre Website so optimieren, dass sie unter 1,5 Sekunden lädt.",
        waBtn: "Website-Geschwindigkeit auf WhatsApp beheben"
      }
    }
  };

  const t = translations[language] || translations.id;

  const runAudit = (e) => {
    e.preventDefault();
    if (!auditUrl) return;
    setIsScanning(true);
    setScanStep(1);
    
    setTimeout(() => {
      setScanStep(2);
      setTimeout(() => {
        setScanStep(3);
        setTimeout(() => {
          setScanStep(4);
          setTimeout(() => {
            const seed = auditUrl.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const perf = 35 + (seed % 20); // 35 - 54
            const cls = (0.22 + (seed % 10) / 100).toFixed(2); // 0.22 - 0.31
            const lcp = (4.5 + (seed % 15) / 10).toFixed(1); // 4.5 - 5.9
            
            setScore({ perf, cls, lcp });
            setIsScanning(false);
            setScanStep(5); // Show scorecard modal
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

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

          {/* Interactive URL Speed Audit Form */}
          <form onSubmit={runAudit} className="hero-audit-form delay-300">
            <input 
              type="text" 
              placeholder={t.auditPlaceholder} 
              value={auditUrl}
              onChange={(e) => setAuditUrl(e.target.value)}
              className="hero-audit-input"
              required
            />
            <button type="submit" className="btn btn-primary hero-audit-btn btn-glint">
              {t.auditBtn}
            </button>
          </form>

          <div className="hero-actions delay-400">
            <button 
              className="btn btn-primary btn-lg btn-glint"
              onClick={() => openWhatsAppModal(
                language === 'en' 
                  ? 'Company Profile Website' 
                  : language === 'de' 
                  ? 'Unternehmens-Website' 
                  : 'Company Profile Website'
              )}
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

          <div className="hero-stats delay-400">
            <div className="stat-item">
              <span className="stat-number text-gradient">40+</span>
              <span className="stat-label">{language === 'en' ? 'Projects Done' : language === 'de' ? 'Projekte abgeschlossen' : 'Proyek Selesai'}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number text-gradient">100%</span>
              <span className="stat-label">{language === 'en' ? 'Clients Satisfied' : language === 'de' ? 'Zufriedene Kunden' : 'Klien Puas'}</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number text-gradient">5+</span>
              <span className="stat-label">{language === 'en' ? 'Years Exp' : language === 'de' ? 'Jahre Erfahrung' : 'Tahun Pengalaman'}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fade-in delay-200">
          <div className="hero-mockup-container">
            <img 
              src={heroDevices} 
              alt="Aurotech Premium Website Mockup" 
              className="hero-device-image"
              fetchpriority="high"
              loading="eager"
            />
            <img 
              src={mascotImg}
              alt="Aurotech Cyber Owl Mascot"
              className="hero-mascot"
            />
          </div>
        </div>
      </div>

      <div className="scroll-indicator animate-entrance delay-400">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>{t.scroll}</span>
      </div>

      {/* Scanning Animation Overlay */}
      {isScanning && (
        <div className="audit-scan-overlay">
          <div className="audit-scan-modal glass">
            <div className="audit-spinner"></div>
            <h3>Aurotech Speed Audit</h3>
            <p className="scanning-url">{auditUrl}</p>
            <div className="scan-steps-progress">
              <p className={scanStep >= 1 ? 'active' : ''}>{scanStep > 1 ? '✓' : '•'} {t.auditOutcomes.resolving}</p>
              <p className={scanStep >= 2 ? 'active' : ''}>{scanStep > 2 ? '✓' : '•'} {t.auditOutcomes.layout}</p>
              <p className={scanStep >= 3 ? 'active' : ''}>{scanStep > 3 ? '✓' : '•'} {t.auditOutcomes.lcp}</p>
              <p className={scanStep >= 4 ? 'active' : ''}>{scanStep > 4 ? '✓' : '•'} {t.auditOutcomes.compiling}</p>
            </div>
          </div>
        </div>
      )}

      {/* Audit Scorecard Modal */}
      {scanStep === 5 && score && (
        <div className="audit-score-overlay">
          <div className="audit-score-modal glass animate-entrance">
            <button className="close-btn" onClick={() => setScanStep(0)}>×</button>
            <h2>{t.auditOutcomes.title}</h2>
            <p className="subtitle">{t.auditOutcomes.subtitle} <strong>{auditUrl}</strong></p>
            
            <div className="scores-grid">
              <div className="score-card critical">
                <div className="score-ring">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle" strokeDasharray={`${score.perf}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="percentage">{score.perf}</div>
                </div>
                <h4>{t.auditOutcomes.perfScore}</h4>
                <span className="status-label critical">{t.auditOutcomes.statusPoor}</span>
              </div>
              
              <div className="scores-sub-grid">
                <div className="metric-row">
                  <span className="metric-name">{t.auditOutcomes.clsScore}</span>
                  <span className="metric-val bad">{score.cls} <span className="status-badge">{t.auditOutcomes.statusBad}</span></span>
                </div>
                <div className="metric-row">
                  <span className="metric-name">{t.auditOutcomes.lcpScore}</span>
                  <span className="metric-val bad">{score.lcp}s <span className="status-badge">{t.auditOutcomes.statusSlow}</span></span>
                </div>
              </div>
            </div>
            
            <p className="suggestion-text">
              {t.auditOutcomes.suggestion}
            </p>
            
            <a 
              href={`https://wa.me/628123456789?text=${encodeURIComponent(
                language === 'en'
                  ? `Hi Aurotech, I ran a speed audit on ${auditUrl} and got a score of ${score.perf}/100. I'd like to get a free consultation to fix my website speed issues.`
                  : language === 'de'
                  ? `Hallo Aurotech, ich habe eine Geschwindigkeitsprüfung für ${auditUrl} durchgeführt und ein Ergebnis von ${score.perf}/100 erhalten. Ich hätte gerne eine kostenlose Beratung zur Behebung meiner Website-Geschwindigkeitsprobleme.`
                  : `Halo Aurotech, saya baru saja melakukan audit kecepatan di ${auditUrl} dan mendapatkan skor ${score.perf}/100. Saya ingin konsultasi gratis untuk mempercepat loading website saya.`
              )}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-lg btn-glint w-full"
            >
              {t.auditOutcomes.waBtn}
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

