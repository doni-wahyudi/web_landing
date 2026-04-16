import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Portfolio />
      <Services />
      <Pricing />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Home;
