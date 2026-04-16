import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  useScrollReveal();

  return (
    <div className="home">
      <Hero />
      <div className="reveal-on-scroll">
        <Portfolio />
      </div>
      <div className="reveal-on-scroll delay-100">
        <Services />
      </div>
      <div className="reveal-on-scroll delay-200">
        <Testimonials />
      </div>
      <div className="reveal-on-scroll delay-300">
        <Pricing />
      </div>
      <div className="reveal-on-scroll delay-400">
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
