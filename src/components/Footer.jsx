import { Link } from 'react-router-dom';
import { FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import logoImg from '../assets/logo_auro.webp';
import typographyImg from '../assets/typography_white.webp';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  const translations = {
    id: {
      desc: "Mitra terbaik Anda dalam mewujudkan identitas digital yang profesional, estetik, dan berorientasi pada hasil penjualan.",
      services: "Layanan Kami",
      company: "Perusahaan",
      contact: "Hubungi Kami",
      about: "Tentang Kami",
      terms: "Syarat & Ketentuan",
      privacy: "Kebijakan Privasi",
      legitimacy: "Terdaftar di Kemenkumham",
      webProfile: "Premium Company Profile",
      landingPage: "Landing Page",
      customWeb: "Aplikasi Web Kustom",
      androidApp: "Aplikasi Android & iOS",
      customSoftware: "Software Kustom"
    },
    en: {
      desc: "Your best partner in realizing a professional, aesthetic, and sales-oriented digital identity.",
      services: "Our Services",
      company: "Company",
      contact: "Contact Us",
      about: "About Us",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      legitimacy: "Registered at Ministry of Law",
      webProfile: "Premium Company Profile",
      landingPage: "Landing Page",
      customWeb: "Custom Web Applications",
      androidApp: "Android & iOS Applications",
      customSoftware: "Custom Software"
    },
    de: {
      desc: "Ihr bester Partner bei der Verwirklichung einer professionellen, ästhetischen und verkaufsorientierten digitalen Identität.",
      services: "Unsere Dienstleistungen",
      company: "Unternehmen",
      contact: "Kontaktieren Sie uns",
      about: "Über uns",
      terms: "Nutzungsbedingungen",
      privacy: "Datenschutzerklärung",
      legitimacy: "Registriert beim Justizministerium",
      webProfile: "Premium Firmenprofil",
      landingPage: "Landing Page",
      customWeb: "Individuelle Webanwendungen",
      androidApp: "Android- & iOS-Anwendungen",
      customSoftware: "Individuelle Software"
    }
  };

  const t = translations[language] || translations.id;

  return (
    <footer className="footer section">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="logo">
            <span className="logo-icon">
              <img src={logoImg} alt="Aurotech Logo" />
            </span>
            <img src={typographyImg} alt="Aurotech" className="logo-typography" />
          </Link>
          <p className="footer-desc">
            {t.desc}
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/aurotech.co.id/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
            <a href="https://www.tiktok.com/@aurotech.co.id" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a>
          </div>

          <div className="legitimacy-signals">
            <p className="legitimacy-item">✓ {t.legitimacy}</p>
            <p className="legitimacy-item">✓ NIB: 0303260065722</p>
          </div>
        </div>

        <div className="footer-links">
          <h3>{t.services}</h3>
          <ul>
            <li><Link to="/portfolio">{t.webProfile}</Link></li>
            <li><Link to="/portfolio">{t.landingPage}</Link></li>
            <li>{t.customWeb}</li>
            <li>{t.androidApp}</li>
            <li>{t.customSoftware}</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>{t.company}</h3>
          <ul>
            <li><Link to="/about">{t.about}</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/terms">{t.terms}</Link></li>
            <li><Link to="/privacy">{t.privacy}</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>{t.contact}</h3>
          <ul>
            <li><FiPhone /> +62 821-8225-2766</li>
            <li><FiMail /> admin@aurotech.co.id</li>
            <li><FiMapPin /> Permata Depok, Jawa Barat</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom border-t border-border mt-12 pt-8 text-center text-muted">
        <p className="mb-2">PT Swaraya Naraya Indonesia</p>
        <p>&copy; {currentYear} Aurotech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
