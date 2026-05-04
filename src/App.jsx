import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import PortfolioDetail from './pages/PortfolioDetail';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import Preloader from './components/Preloader';

// Admin Components
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import CpanelAccounts from './pages/admin/CpanelAccounts';
import LeadsTracker from './pages/admin/LeadsTracker';
import LeadsDashboard from './pages/admin/LeadsDashboard';

function App() {
  return (
    <HelmetProvider>
      <Preloader />
      <ScrollToTop />
      
      {/* 
        We conditionally render Header/Footer or we can just let AdminLayout 
        override the screen. Since Header/Footer are outside Routes, they will 
        appear on Admin pages unless we hide them. 
        Actually, the cleanest way is to move Header/Footer inside a PublicLayout 
        if we want to hide them from Admin, OR we can conditionally hide them 
        based on the pathname. Let's use useLocation to conditionally hide them.
      */}
      <AppContent />
    </HelmetProvider>
  );
}

// We extract the main content to use useLocation hook
import { useLocation } from 'react-router-dom';

import BlogGrid from './pages/blog/BlogGrid';
import ArticleDetail from './pages/blog/ArticleDetail';
import ArticlesManager from './pages/admin/ArticlesManager';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Visitor Tracking
  useEffect(() => {
    if (!isAdminRoute) {
      fetch('https://aurotech.co.id/api/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: location.pathname,
          referrer: document.referrer
        })
      }).catch(err => console.error('Tracking error:', err));
    }
  }, [location.pathname, isAdminRoute]);

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/blog" element={<BlogGrid />} />
          <Route path="/blog/:slug" element={<ArticleDetail />} />


          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLogin />} />
            <Route path="cpanel" element={<CpanelAccounts />} />
            <Route path="articles" element={<ArticlesManager />} />
            <Route path="leads" element={<LeadsTracker />} />
            <Route path="dashboard" element={<LeadsDashboard />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}


export default App;

