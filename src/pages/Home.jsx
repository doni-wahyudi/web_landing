import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Home = () => {
  useScrollReveal();
  const { language } = useLanguage();

  const translations = {
    id: {
      seoTitle: "Jasa Pembuatan Website Profesional & Premium",
      seoDesc: "Tingkatkan omset bisnis Anda dengan website profesional & elegan dari Aurotech. Garansi kepuasan 100%, gratis domain, dan hosting."
    },
    en: {
      seoTitle: "Professional & Premium Website Development Services",
      seoDesc: "Increase your business turnover with a professional & elegant website from Aurotech. 100% satisfaction guarantee, free domain, and hosting."
    }
  };

  const t = translations[language] || translations.id;

  return (
    <div className="home">
      <SEO 
        title={t.seoTitle}
        description={t.seoDesc}
      />
      <Hero />
      <div className="reveal-on-scroll delay-100">
        <Process />
      </div>
      <div className="reveal-on-scroll delay-200">
        <Portfolio isHomepage={true} />
      </div>
      <div className="reveal-on-scroll delay-300">
        <Pricing />
      </div>
      <div className="reveal-on-scroll delay-400">
        <Team />
      </div>
      <div className="reveal-on-scroll delay-500">
        <Testimonials />
      </div>
      <div className="reveal-on-scroll delay-600">
        <FAQ />
      </div>
    </div>
  );
};

export default Home;

