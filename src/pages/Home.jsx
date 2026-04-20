import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SEO from '../components/SEO';

const Home = () => {
  useScrollReveal();

  return (
    <div className="home">
      <SEO 
        title="Jasa Pembuatan Website Profesional & Premium"
        description="Tingkatkan omset bisnis Anda dengan website profesional & elegan dari Aurotech. Garansi kepuasan 100%, gratis domain, dan hosting."
      />
      <Hero />
      <div className="reveal-on-scroll">
        <Portfolio />
      </div>
      <div className="reveal-on-scroll delay-100">
        <Pricing />
      </div>
      <div className="reveal-on-scroll delay-200">
        <Services />
      </div>
      {/* 
      <div className="reveal-on-scroll delay-300">
        <Testimonials />
      </div> 
      */}
      <div className="reveal-on-scroll delay-400">
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
