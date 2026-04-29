import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getArticles } from '../../services/articleService';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getArticles();
        // Find by slug or ID
        const match = data.find(a => a.slug === slug || a.id.toString() === slug);
        setArticle(match);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) return <div className="blog-loading text-center">Loading article...</div>;
  if (!article) return <div className="blog-empty text-center">Article not found.</div>;

  return (
    <article className="article-detail bg-primary section animate-fade-in">
      <div className="container">
        <Link to="/blog" className="btn-back">← Back to Blog</Link>
        
        <div className="article-header">
          <span className="blog-card-category">{article.category}</span>
          <h1 className="article-title">{article.title}</h1>
        </div>

        {article.image_url && (
          <div className="article-hero-img">
            <img src={article.image_url} alt={article.title} />
          </div>
        )}

        <div className="article-body-content">
          <p>{article.content}</p>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetail;
