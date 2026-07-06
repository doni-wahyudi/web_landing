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

  const translations = {
    id: {
      loading: "Memuat artikel...",
      notFound: "Artikel tidak ditemukan.",
      back: "← Kembali ke Blog"
    },
    en: {
      loading: "Loading article...",
      notFound: "Article not found.",
      back: "← Back to Blog"
    },
    de: {
      loading: "Artikel wird geladen...",
      notFound: "Artikel nicht gefunden.",
      back: "← Zurück zum Blog"
    }
  };
  const t = translations[language] || translations.id;

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
    
    const lines = text.split('\n');
    const elements = [];
    let activeCard = null;

    const flushCard = () => {
      if (activeCard) {
        const colorIndex = (activeCard.num - 1) % 4; 
        const colorClass = ['card-pink', 'card-green', 'card-purple', 'card-peach'][colorIndex];
        
        elements.push(
          <div key={`card-${activeCard.id}`} className={`article-colored-card ${colorClass}`}>
            <h4 className="article-card-title">{activeCard.num}. {parseInline(activeCard.title)}</h4>
            {activeCard.body.map((bodyLine, i) => (
              <p key={i} className="article-card-p">{parseInline(bodyLine)}</p>
            ))}
          </div>
        );
        activeCard = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check for numbered list to start a card
      const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (olMatch) {
        flushCard(); // close previous card if any
        
        let titleText = olMatch[2];
        if (titleText.startsWith('**') && titleText.endsWith('**')) {
           titleText = titleText.substring(2, titleText.length - 2);
        }
        
        activeCard = {
          id: index,
          num: parseInt(olMatch[1], 10),
          title: titleText,
          body: []
        };
        return;
      }

      // If we are currently inside a card building its body
      if (activeCard) {
        if (trimmed === '') {
          flushCard();
          elements.push(<div key={`space-${index}`} className="article-spacing" />);
        } else {
          activeCard.body.push(trimmed);
        }
        return;
      }

      if (trimmed === '') {
        elements.push(<div key={`space-${index}`} className="article-spacing" />);
        return;
      }

      // Horizontal Rule
      if (trimmed === '---') {
        elements.push(<hr key={`hr-${index}`} className="article-hr" />);
        return;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        elements.push(<h1 key={`h1-${index}`} className="article-h1">{parseInline(trimmed.substring(2))}</h1>);
        return;
      }
      if (trimmed.startsWith('## ')) {
        elements.push(<h2 key={`h2-${index}`} className="article-h2">{parseInline(trimmed.substring(3))}</h2>);
        return;
      }
      if (trimmed.startsWith('### ')) {
        elements.push(<h3 key={`h3-${index}`} className="article-h3">{parseInline(trimmed.substring(4))}</h3>);
        return;
      }

      // Unordered list item (* or -)
      const ulMatch = trimmed.match(/^[-*]\s+(.*)/);
      if (ulMatch) {
        elements.push(
          <div key={`li-ul-${index}`} className="article-li-flat bullet">
            <span className="article-marker">•</span>
            <span className="article-li-content">{parseInline(ulMatch[1])}</span>
          </div>
        );
        return;
      }

      // Normal paragraph
      elements.push(<p key={`p-${index}`} className="article-p">{parseInline(line)}</p>);
    });

    flushCard();

    return elements.flat(Infinity);
  };

  if (isLoading) return <div className="blog-loading text-center">{t.loading}</div>;
  if (!article) return <div className="blog-empty text-center">{t.notFound}</div>;

  return (
    <article className="article-detail section animate-fade-in">
      <div className="container">
        <Link to="/blog" className="btn-back">{t.back}</Link>
        
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
