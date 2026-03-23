import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer section">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="logo">
            <span className="logo-icon">▲</span>
            <span className="logo-text">WeBuild<span className="text-gradient">Premium</span></span>
          </Link>
          <p className="footer-desc">
            Mitra terbaik Anda dalam mewujudkan identitas digital yang profesional, estetik, dan berorientasi pada hasil penjualan.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <h3>Layanan Kami</h3>
          <ul>
            <li><a href="#">Pembuatan Website Company Profile</a></li>
            <li><a href="#">Website Toko Online</a></li>
            <li><a href="#">Landing Page Premium</a></li>
            <li><a href="#">SEO & Digital Marketing</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h3>Perusahaan</h3>
          <ul>
            <li><a href="#">Tentang Kami</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#">Syarat & Ketentuan</a></li>
            <li><a href="#">Kebijakan Privasi</a></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h3>Hubungi Kami</h3>
          <ul>
            <li><FiPhone /> +62 812-3456-7890</li>
            <li><FiMail /> hello@webuildpremium.com</li>
            <li><FiMapPin /> Sudirman Central Business District, Jakarta</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom border-t border-border mt-12 pt-8 text-center text-muted">
        <p>&copy; {currentYear} WeBuildPremium. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
