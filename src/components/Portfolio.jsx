import { Link } from 'react-router-dom';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import './Portfolio.css';

const Portfolio = () => {
  const { language } = useLanguage();

  const translations = {
    id: {
      title: "Karya",
      titleGradient: "Terbaik",
      titleSuffix: "Kami",
      subtitle: "Lihat langsung hasil kerja kami. Klik pada portfolio untuk melihat detail proyek.",
      viewDetail: "Lihat Detail",
      visitWeb: "Visit Web"
    },
    en: {
      title: "Our",
      titleGradient: "Best",
      titleSuffix: "Work",
      subtitle: "See our work in action. Click on a portfolio item to view project details.",
      viewDetail: "View Details",
      visitWeb: "Visit Web"
    }
  };

  const t = translations[language];

  return (
    <section id="portfolio" className="section portfolio bg-secondary">
      <div className="container">
        <div className="section-header text-center animate-entrance">
          <h2 className="section-title">{t.title} <span className="text-gradient">{t.titleGradient}</span> {t.titleSuffix}</h2>
          <p className="section-subtitle lg">
            {t.subtitle}
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map(project => (
            <div key={project.id} className="portfolio-card glass">
              <div className="portfolio-img-wrapper">
                <div className="portfolio-browser-header">
                  <div className="browser-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                {/* Project Screenshot */}
                <div className="portfolio-image">
                    <img 
                      src={project.image} 
                      alt={`Website Portfolio Aurotech - ${project.title} (${project.category[language] || project.category.id})`}
                      loading="lazy"
                    />
                </div>
                <div className="portfolio-overlay">
                  <div className="portfolio-buttons">
                    <Link to={`/portfolio/${project.id}`} className="btn btn-primary btn-sm">
                      {t.viewDetail} <FiArrowRight />
                    </Link>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      {t.visitWeb} <FiExternalLink />
                    </a>
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <span>{project.category[language] || project.category.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

