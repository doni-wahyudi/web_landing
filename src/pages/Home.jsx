import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      <FAQ />
    </div>
  );
};

export default Home;
