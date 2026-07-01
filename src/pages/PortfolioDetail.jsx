import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import { FiArrowLeft, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';
import './PortfolioDetail.css';

const PortfolioDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const project = projects.find(p => p.id === parseInt(id));

  const translations = {
    en: {
      notFoundTitle: "Project Not Found",
      notFoundDesc: "The portfolio project you are looking for is not available.",
      notFoundHeader: "Project not found",
      backToPortfolio: "Back to Portfolio",
      visitLive: "Visit Live Website",
      challenge: "The Challenge",
      solution: "Our Solution",
      outcome: "Measurable Outcome",
      tech: "Technologies Used"
    },
    id: {
      notFoundTitle: "Project Tidak Ditemukan",
      notFoundDesc: "Project portfolio yang Anda cari tidak tersedia.",
      notFoundHeader: "Project tidak ditemukan",
      backToPortfolio: "Kembali ke Portfolio",
      visitLive: "Kunjungi Website Live",
      challenge: "Tantangan",
      solution: "Solusi Kami",
      outcome: "Hasil yang Terukur",
      tech: "Teknologi yang Digunakan"
    },
    de: {
      notFoundTitle: "Projekt nicht gefunden",
      notFoundDesc: "Das gesuchte Portfolio-Projekt ist nicht verfügbar.",
      notFoundHeader: "Projekt nicht gefunden",
      backToPortfolio: "Zurück zum Portfolio",
      visitLive: "Live-Website besuchen",
      challenge: "Die Herausforderung",
      solution: "Unsere Lösung",
      outcome: "Messbares Ergebnis",
      tech: "Verwendete Technologien"
    }
  };

  const t = translations[language] || translations.id;

  if (!project) {
    return (
      <div className="portfolio-detail not-found pt-24 text-center">
        <SEO title={t.notFoundTitle} description={t.notFoundDesc} />
        <h2>{t.notFoundHeader}</h2>
        <Link to="/portfolio" className="btn btn-primary mt-4">{t.backToPortfolio}</Link>
      </div>
    );
  }

  // Schema.org Breadcrumb JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://vahyudi.github.io/web_landing/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://vahyudi.github.io/web_landing/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://vahyudi.github.io/web_landing/portfolio/${project.id}`
      }
    ]
  };

  const projectChallenge = project.challenge ? (project.challenge[language] || project.challenge.id || project.challenge) : '';
  const projectSolution = project.solution ? (project.solution[language] || project.solution.id || project.solution) : '';
  const projectOutcome = project.outcome ? (project.outcome[language] || project.outcome.id || project.outcome) : '';
  const isPhoneProject = project.category.en === "Social Media Management";
  const visitButtonText = isPhoneProject
    ? (language === 'en' ? 'Visit Instagram' : language === 'de' ? 'Instagram besuchen' : 'Kunjungi Instagram')
    : t.visitLive;

  return (
    <div className="portfolio-detail pt-24 pb-16">
      <SEO 
        title={project.title}
        description={`Portfolio project Aurotech: ${project.title}. ${(project.challenge[language] || project.challenge.id || project.challenge || '').substring(0, 150)}...`}
        ogImage={project.image}
        canonical={`portfolio/${project.id}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <div className="container">
        <Link to="/portfolio" className="back-link">
          <FiArrowLeft /> {t.backToPortfolio}
        </Link>
        
        <div className="detail-header text-center mt-8 mb-12">
          <h1 className="detail-title hero-title">{project.title}</h1>
          <div className="detail-meta mb-8">
            <span className="badge">{project.category[language]}</span>
          </div>
          <div className="detail-actions">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg btn-glint">
              {visitButtonText} <FiExternalLink />
            </a>
          </div>
        </div>

        <div className="portfolio-showcase">
          {/* Left Column: Visuals */}
          <div className="portfolio-visual-col">
            <div className={`detail-visual ${isPhoneProject ? 'is-phone' : ''} glass animate-entrance delay-200`}>
              {isPhoneProject ? (
                <div className="phone-mockup-frame detail-page-phone">
                  <div className="phone-speaker-camera"></div>
                  <div className="phone-screen-image">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="portfolio-browser-header">
                    <div className="browser-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                  <div className="detail-image">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="portfolio-content-col animate-entrance delay-300">
            <div className="detail-section glass">
              <h3>
                <FiCheckCircle /> {t.challenge}
              </h3>
              <p>{projectChallenge}</p>
            </div>

            <div className="detail-section glass">
              <h3>
                <FiCheckCircle /> {t.solution}
              </h3>
              <p>{projectSolution}</p>
            </div>
            
            {projectOutcome && (
              <div className="detail-section glass outcome-section">
                <h3>
                  <span style={{fontSize: '1.5rem'}}>📈</span> {t.outcome}
                </h3>
                <p style={{color: '#f8fafc', fontWeight: '500'}}>{projectOutcome}</p>
              </div>
            )}

            {project.techStack && (
              <div className="detail-section tech-section">
                <h3 style={{color: 'var(--text-muted)'}}>
                  <FiCheckCircle style={{opacity: 0.5}} /> {t.tech}
                </h3>
                <div className="tech-stack-container">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;

