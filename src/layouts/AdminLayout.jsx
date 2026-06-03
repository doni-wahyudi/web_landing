import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FiServer, FiLogOut, FiHome, FiFileText, FiTarget, FiTrendingUp, FiUsers, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './AdminLayout.css';
import { useEffect } from 'react';

const translations = {
  id: {
    cpanel: 'Akun cPanel',
    articles: 'Kelola Artikel',
    leads: 'Pelacak Lead',
    stats: 'Statistik Akuisisi',
    visitors: 'Analisis Pengunjung',
    backToSite: 'Kembali ke Situs',
    logout: 'Keluar',
    langLabel: 'Bahasa'
  },
  en: {
    cpanel: 'cPanel Accounts',
    articles: 'Manage Articles',
    leads: 'Leads Tracker',
    stats: 'Acquisition Stats',
    visitors: 'Visitor Analytics',
    backToSite: 'Back to Site',
    logout: 'Logout',
    langLabel: 'Language'
  }
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const t = translations[language] || translations.id;

  // Simple mock auth check
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('admin_logged_in');
    if (!isLoggedIn && window.location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    navigate('/admin/login');
  };

  // If on login page, don't show sidebar
  if (window.location.pathname === '/admin/login') {
    return <div className="admin-root"><Outlet /></div>;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar glass">
        <div className="admin-sidebar-header">
          <h2>Aurotech Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/cpanel" className="admin-nav-link">
            <FiServer /> {t.cpanel}
          </Link>
          <Link to="/admin/articles" className="admin-nav-link">
            <FiFileText /> {t.articles}
          </Link>
          <Link to="/admin/leads" className="admin-nav-link">
            <FiTarget /> {t.leads}
          </Link>
          <Link to="/admin/dashboard" className="admin-nav-link">
            <FiTrendingUp /> {t.stats}
          </Link>
          <Link to="/admin/visitors" className="admin-nav-link">
            <FiUsers /> {t.visitors}
          </Link>
          <Link to="/" className="admin-nav-link">
            <FiHome /> {t.backToSite}
          </Link>
        </nav>
        <div className="admin-sidebar-footer">
          {/* Language Switcher */}
          <div className="admin-lang-switcher" style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <FiGlobe /> {t.langLabel}
            </label>
            <select 
              value={language === 'de' ? 'en' : language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="lang-select"
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '6px',
                outline: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              <option value="id" style={{ background: '#111', color: 'white' }}>🇮🇩 Bahasa Indonesia</option>
              <option value="en" style={{ background: '#111', color: 'white' }}>🇺🇸 English</option>
            </select>
          </div>
          
          <button onClick={handleLogout} className="btn-logout">
            <FiLogOut /> {t.logout}
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
