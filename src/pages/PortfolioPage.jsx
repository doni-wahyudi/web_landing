import Portfolio from '../components/Portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PortfolioPage = () => {
  useScrollReveal();

  return (
    <div className="page-wrapper pt-20">
      <Portfolio isHomepage={false} />
    </div>
  );
};

export default PortfolioPage;
