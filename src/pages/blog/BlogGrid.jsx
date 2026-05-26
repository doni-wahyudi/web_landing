import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getArticles } from '../../services/articleService';
import './BlogGrid.css';

const BlogGrid = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const translations = {
    id: {
      title: "Artikel & Berita",
      subtitle: "Wawasan terbaru mengenai pengembangan digital dan tren industri.",
      readMore: "Baca Selengkapnya",
      noArticles: "Belum ada artikel yang dipublikasikan.",
      loading: "Memuat artikel..."
    },
    en: {
      title: "Articles & News",
      subtitle: "The latest insights on digital development and industry trends.",
      readMore: "Read More",
      noArticles: "No articles published yet.",
      loading: "Loading articles..."
    }
  };

  const t = translations[language] || translations.id;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to load blog posts", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, []);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return url.startsWith('/') ? `https://aurotech.co.id${url}` : `https://aurotech.co.id/${url}`;
  };

  return (
    <section className="section blog-section bg-primary">
      <div className="container animate-fade-in">
        <div className="section-header text-center">
          <h1 className="section-title">{t.title}</h1>
          <p className="section-subtitle lg">{t.subtitle}</p>
        </div>

        {isLoading ? (
          <div className="blog-loading text-center">{t.loading}</div>
        ) : articles.length === 0 ? (
          <div className="blog-empty text-center">
            <p>{t.noArticles}</p>
          </div>
        ) : (
          <div className="blog-grid">
            {articles.map((article) => (
              <article key={article.id} className="blog-card glass">
                {article.image_url && (
                  <div className="blog-card-img">
                    <img src={getImageUrl(article.image_url)} alt={article.title} loading="lazy" />
                  </div>
                )}
                <div className="blog-card-body">
                  <span className="blog-card-category">{article.category}</span>
                  <h2 className="blog-card-title">
                    <Link to={`/blog/${article.slug || article.id}`}>{article.title}</Link>
                  </h2>
                  <p className="blog-card-excerpt">
                    {article.content && article.content.substring(0, 120)}...
                  </p>
                  <Link to={`/blog/${article.slug || article.id}`} className="blog-card-link">
                    {t.readMore} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
