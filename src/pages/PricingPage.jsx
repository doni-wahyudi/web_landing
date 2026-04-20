import Pricing from '../components/Pricing';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiGlobe, FiSettings, FiAward, FiGift, FiMonitor, FiTrendingUp, FiFileText, FiSearch, FiHeadphones } from 'react-icons/fi';
import '../components/Pricing.css'; // ensuring the CSS loads

const PricingPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="page-wrapper pt-20">
      <Pricing />
    </div>
  );
};

export default PricingPage;
