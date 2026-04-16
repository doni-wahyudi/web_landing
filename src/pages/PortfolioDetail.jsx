import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { FiArrowLeft, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';
import './PortfolioDetail.css';

const PortfolioDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="portfolio-detail not-found pt-24 text-center">
        <SEO title="Project Tidak Ditemukan" description="Project portfolio yang Anda cari tidak tersedia." />
        <h2>Project tidak ditemukan</h2>
        <Link to="/portfolio" className="btn btn-primary mt-4">Kembali ke Portfolio</Link>
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
        description={`Portfolio project Aurotech: ${project.title}. ${project.challenge.substring(0, 150)}...`}
        ogImage={project.image}
        canonical={`portfolio/${project.id}`}
      />
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <div className="container">
        <Link to="/portfolio" className="back-link">
          <FiArrowLeft /> Kembali ke Portfolio
        </Link>
        
        <div className="detail-header text-center mt-8 mb-12">
          <h1 className="detail-title">{project.title}</h1>
          <span className="badge">{project.category}</span>
        </div>

        <div className="detail-grid">
          <div className="detail-visual glass">
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

          <div className="detail-content">
            <div className="content-block glass p-6 mb-6">
              <h3>Tantangan (Challenge)</h3>
              <p>{project.challenge}</p>
            </div>
            
            <div className="content-block glass p-6 mb-6">
              <h3>Solusi (Solution)</h3>
              <p>{project.solution}</p>
            </div>

            <div className="content-block glass p-6 mb-8">
              <h3>Teknologi (Tech Stack)</h3>
              <ul className="tech-stack-list">
                {project.techStack.map((tech, idx) => (
                  <li key={idx}><FiCheckCircle className="text-primary" /> {tech}</li>
                ))}
              </ul>
            </div>

            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg w-full text-center">
              Kunjungi Website Live <FiExternalLink />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
