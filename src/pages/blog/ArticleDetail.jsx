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
        if (match && match.keywords) {
          // Update meta keywords dynamically for SEO
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = "keywords";
            document.head.appendChild(metaKeywords);
          }
          metaKeywords.content = match.keywords;
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return url.startsWith('/') ? `https://aurotech.co.id${url}` : `https://aurotech.co.id/${url}`;
  };

  const parseInline = (inlineText) => {
    if (!inlineText) return '';
    // Parse bold markdown "**text**"
    const boldParts = inlineText.split(/\*\*([^*]+)\*\*/g);
    
    return boldParts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={`b-${index}`} className="article-bold">{part}</strong>;
      }
      
      // Parse italic markdown "*text*"
      const italicParts = part.split(/\*([^*]+)\*/g);
      return italicParts.map((subPart, subIndex) => {
        if (subIndex % 2 === 1) {
          return <em key={`i-${subIndex}`} className="article-em">{subPart}</em>;
        }
        return subPart;
      });
    }).flat(Infinity); // Flat rendering array prevents production React build from skipping/halting renders
  };

  const parseMarkdown = (text) => {
    if (!text) return '';
    
    // Split by newlines to process line-by-line flatly (prevents nested list grouping bugs)
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      const trimmed = line.trim();

      // Empty lines -> render elegant vertical spacing
      if (trimmed === '') {
        return <div key={`space-${index}`} className="article-spacing" />;
      }

      // Horizontal Rule
      if (trimmed === '---') {
        return <hr key={`hr-${index}`} className="article-hr" />;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        return <h1 key={`h1-${index}`} className="article-h1">{parseInline(trimmed.substring(2))}</h1>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={`h2-${index}`} className="article-h2">{parseInline(trimmed.substring(3))}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={`h3-${index}`} className="article-h3">{parseInline(trimmed.substring(4))}</h3>;
      }

      // Unordered list item (* or -)
      const ulMatch = trimmed.match(/^[-*]\s+(.*)/);
      if (ulMatch) {
        return (
          <div key={`li-ul-${index}`} className="article-li-flat bullet">
            <span className="article-marker">•</span>
            <span className="article-li-content">{parseInline(ulMatch[1])}</span>
          </div>
        );
      }

      // Ordered list item (number.)
      const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (olMatch) {
        return (
          <div key={`li-ol-${index}`} className="article-li-flat numbered">
            <span className="article-marker">{olMatch[1]}.</span>
            <span className="article-li-content">{parseInline(olMatch[2])}</span>
          </div>
        );
      }

      // Normal paragraph
      return <p key={`p-${index}`} className="article-p">{parseInline(line)}</p>;
    }).flat(Infinity);
  };

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
            <img src={getImageUrl(article.image_url)} alt={article.title} />
          </div>
        )}

        <div className="article-body-content">
          {parseMarkdown(article.content)}
        </div>

        {article.keywords && (
          <div className="article-keywords-container">
            {article.keywords.split(',').map((kw, i) => (
              <span key={i} className="article-keyword-pill">#{kw.trim()}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleDetail;
