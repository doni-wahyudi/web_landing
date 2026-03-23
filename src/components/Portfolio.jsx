import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { projects } from '../data/projects';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section id="portfolio" className="section portfolio bg-secondary">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Karya <span className="text-gradient">Terbaik</span> Kami</h2>
          <p className="section-subtitle">
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
                      alt={project.title}
                      loading="lazy"
                    />
                </div>
                <div className="portfolio-overlay">
                  <Link to={`/portfolio/${project.id}`} className="btn btn-primary">
                    Lihat Detail <FiArrowRight />
                  </Link>
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
