import { Link } from 'react-router-dom';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/projects';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section id="portfolio" className="section portfolio bg-secondary">
      <div className="container">
        <div className="section-header text-center animate-entrance">
          <h2 className="section-title">Karya <span className="text-gradient">Terbaik</span> Kami</h2>
          <p className="section-subtitle lg">
            Lihat langsung hasil kerja kami. Klik pada portfolio untuk melihat detail proyek.
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
                      alt={`Website Portfolio Aurotech - ${project.title} (${project.category})`}
                      loading="lazy"
                    />
                </div>
                <div className="portfolio-overlay">
                  <div className="portfolio-buttons">
                    <Link to={`/portfolio/${project.id}`} className="btn btn-primary btn-sm">
                      Lihat Detail <FiArrowRight />
                    </Link>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      Visit Web <FiExternalLink />
                    </a>
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <span>{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
