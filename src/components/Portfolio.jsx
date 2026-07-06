import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiExternalLink, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import './Portfolio.css';

const Portfolio = ({ isHomepage = false }) => {
  const { language } = useLanguage();
  const sliderRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const translations = {
    id: {
      title: "Karya",
      titleGradient: "Terbaik",
      titleSuffix: "Kami",
      subtitle: "Lihat langsung hasil kerja kami di bidang Pembuatan Website dan Manajemen Media Sosial.",
      viewDetail: "Lihat Detail",
      visitWeb: "Kunjungi",
      webHeading: "Pengembangan Website",
      socialHeading: "Manajemen Media Sosial",
      visitInsta: "Instagram"
    },
    en: {
      title: "Our",
      titleGradient: "Best",
      titleSuffix: "Work",
      subtitle: "See our work first-hand across Website Development and Social Media Management.",
      viewDetail: "View Detail",
      visitWeb: "Visit",
      webHeading: "Website Development",
      socialHeading: "Social Media Management",
      visitInsta: "Instagram"
    },
    de: {
      title: "Unsere",
      titleGradient: "besten",
      titleSuffix: "Arbeiten",
      subtitle: "Überzeugen Sie sich selbst von unseren Ergebnissen im Web-Design und Social-Media-Management.",
      viewDetail: "Details ansehen",
      visitWeb: "Besuchen",
      webHeading: "Web-Entwicklung",
      socialHeading: "Social Media Management",
      visitInsta: "Instagram"
    }
  };

  const t = translations[language] || translations.id;

  const webOrder = isHomepage 
    ? [1, 2, 10, 6, 5, 9] 
    : [1, 2, 10, 6, 5, 9, 3, 4, 7, 8, 11];
    
  const socialOrder = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  const webProjects = webOrder
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean);

  const socialProjects = socialOrder
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollAmount = 260; // 220px card width + 40px gap
      const { scrollLeft, clientWidth, scrollWidth } = container;

      if (direction === 'right') {
        // If we are at the end, wrap back to the start
        if (scrollLeft + clientWidth >= scrollWidth - 25) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      } else {
        // If we are at the start, wrap to the end
        if (scrollLeft <= 25) {
          container.scrollTo({
            left: scrollWidth,
            behavior: 'smooth'
          });
        } else {
          container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <div className="section-header text-center animate-entrance">
          <h2 className="section-title">{t.title} <span className="text-gradient">{t.titleGradient}</span> {t.titleSuffix}</h2>
          <p className="section-subtitle lg">
            {t.subtitle}
          </p>
        </div>

        {/* --- WEB DEVELOPMENT PORTFOLIO GRID --- */}
        <div className="portfolio-section-heading reveal-on-scroll">
          <h3 className="text-gradient">{t.webHeading}</h3>
        </div>

        <div className="portfolio-grid reveal-on-scroll">
          {webProjects.map(project => (
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
                    alt={`Website Portfolio Aurotech - ${project.title} (${project.category[language]})`}
                    loading="lazy"
                  />
                </div>
                <div className="portfolio-overlay">
                  <div className="portfolio-buttons">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="btn btn-primary btn-sm"
                    >
                      {t.viewDetail} <FiArrowRight />
                    </button>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      {t.visitWeb} <FiExternalLink />
                    </a>
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <span>{project.category[language]}</span>
              </div>
            </div>
          ))}
        </div>

        {/* --- SOCIAL MEDIA MANAGEMENT SLIDER --- */}
        <div className="portfolio-section-heading social-heading-wrapper reveal-on-scroll">
          <h3 className="text-gradient">{t.socialHeading}</h3>
          <div className="slider-arrows-desktop">
            <button className="slider-arrow-btn" onClick={() => scroll('left')} aria-label="Previous">
              <FiChevronLeft />
            </button>
            <button className="slider-arrow-btn" onClick={() => scroll('right')} aria-label="Next">
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="social-slider-outer reveal-on-scroll">
          <div className="social-slider-inner" ref={sliderRef}>
            {socialProjects.map(project => (
              <div key={project.id} className="phone-mockup-card">
                <div className="phone-mockup-frame">
                  <div className="phone-speaker-camera"></div>
                  <div className="phone-screen-image">
                    <img 
                      src={project.image} 
                      alt={`Instagram Portfolio Aurotech - ${project.title}`}
                      loading="lazy"
                    />
                    <div className="phone-screen-overlay">
                      <div className="phone-overlay-content">
                        <h4>{project.title}</h4>
                        <span>{t.visitInsta}</span>
                        <div className="phone-overlay-buttons">
                          <button 
                            onClick={() => setSelectedProject(project)}
                            className="btn btn-primary btn-sm"
                          >
                            {t.viewDetail}
                          </button>
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                            {t.visitInsta}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="phone-mockup-label">
                  <h4>{project.title}</h4>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="phone-handle-link">
                    @{project.url.split('?')[0].split('/').pop()}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isHomepage && (
          <div className="text-center mt-12 animate-entrance">
            <Link to="/portfolio" className="btn btn-outline btn-lg btn-glint">
              {language === 'en' ? 'View All Projects' : language === 'de' ? 'Alle Projekte anzeigen' : 'Lihat Semua Portfolio'} <FiArrowRight />
            </Link>
          </div>
        )}
      </div>

      {/* Case Study Modal Overlay */}
      {selectedProject && (
        <div className="case-study-overlay" onClick={() => setSelectedProject(null)}>
          <div className="case-study-modal glass animate-entrance" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
            
            <div className="case-study-layout">
              <div className="case-study-visual">
                <div className="case-study-img-wrapper">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="case-study-hero-img"
                  />
                </div>
                <div className="tech-stack-container mt-6">
                  {selectedProject.techStack && selectedProject.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="case-study-details">
                <span className="case-study-category">{selectedProject.category[language]}</span>
                <h2>{selectedProject.title}</h2>
                
                <div className="case-study-sections">
                  {selectedProject.challenge && (
                    <div className="cs-section">
                      <h4>💡 {language === 'en' ? 'Challenge' : language === 'de' ? 'Herausforderung' : 'Tantangan'}</h4>
                      <p>{selectedProject.challenge[language] || selectedProject.challenge.id || selectedProject.challenge}</p>
                    </div>
                  )}
                  {selectedProject.solution && (
                    <div className="cs-section">
                      <h4>🚀 {language === 'en' ? 'Solution' : language === 'de' ? 'Lösung' : 'Solusi'}</h4>
                      <p>{selectedProject.solution[language] || selectedProject.solution.id || selectedProject.solution}</p>
                    </div>
                  )}
                  {selectedProject.outcome && (
                    <div className="cs-section">
                      <h4>📈 {language === 'en' ? 'Outcome / Results' : language === 'de' ? 'Ergebnis' : 'Hasil / Dampak'}</h4>
                      <p>{selectedProject.outcome[language] || selectedProject.outcome.id || selectedProject.outcome}</p>
                    </div>
                  )}
                </div>
                
                <div className="case-study-actions">
                  <a 
                    href={selectedProject.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline btn-sm"
                  >
                    {language === 'en' ? 'Visit Live' : language === 'de' ? 'Live besuchen' : 'Kunjungi Web'} <FiExternalLink />
                  </a>
                  
                  <a 
                    href={`https://wa.me/628123456789?text=${encodeURIComponent(
                      language === 'en'
                        ? `Hi Aurotech, I am interested in building a project similar to ${selectedProject.title}. Let's discuss!`
                        : language === 'de'
                        ? `Hallo Aurotech, ich habe Interesse an einem Projekt ähnlich wie ${selectedProject.title}. Lassen Sie uns sprechen!`
                        : `Halo Aurotech, saya tertarik untuk membuat projek serupa dengan ${selectedProject.title}. Mari diskusikan!`
                    )}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm btn-glint"
                  >
                    {language === 'en' ? 'Start Similar Project' : language === 'de' ? 'Projekt starten' : 'Mulai Projek Serupa'} <FiArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;

