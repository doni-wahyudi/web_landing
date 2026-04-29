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
    id: {
      notFoundTitle: "Project Tidak Ditemukan",
      notFoundDesc: "Project portfolio yang Anda cari tidak tersedia.",
      notFoundHeader: "Project tidak ditemukan",
      backToPortfolio: "Kembali ke Portfolio",
      visitLive: "Kunjungi Website Live"
    },
    en: {
      notFoundTitle: "Project Not Found",
      notFoundDesc: "The portfolio project you are looking for is not available.",
      notFoundHeader: "Project not found",
      backToPortfolio: "Back to Portfolio",
      visitLive: "Visit Live Website"
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

  return (
    <div className="portfolio-detail pt-24 pb-16">
      <SEO 
        title={project.title}
        description={`Portfolio project Aurotech: ${project.title}. ${project.challenge[language].substring(0, 150)}...`}
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
        
        <div className="detail-header text-center mt-8 mb-16">
          <h1 className="detail-title hero-title">{project.title}</h1>
          <div className="detail-meta mb-8">
            <span className="badge">{project.category[language]}</span>
          </div>
          <div className="detail-actions">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg btn-glint">
              {t.visitLive} <FiExternalLink />
            </a>
          </div>
        </div>

        <div className="detail-visual-wrapper mx-auto">
          <div className="detail-visual glass animate-entrance delay-200">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;

