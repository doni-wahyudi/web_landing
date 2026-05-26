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

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://aurotech.co.id${url}`;
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
    });
  };

  const parseMarkdown = (text) => {
    if (!text) return '';
    
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    let currentListType = null; // 'ul' or 'ol'

    const flushList = (key) => {
      if (currentList.length > 0) {
        if (currentListType === 'ul') {
          elements.push(<ul key={`ul-${key}`} className="article-ul">{currentList}</ul>);
        } else if (currentListType === 'ol') {
          elements.push(<ol key={`ol-${key}`} className="article-ol">{currentList}</ol>);
        }
        currentList = [];
        currentListType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Horizontal Rule
      if (trimmed === '---') {
        flushList(index);
        elements.push(<hr key={index} className="article-hr" />);
        return;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        flushList(index);
        elements.push(<h1 key={index} className="article-h1">{parseInline(trimmed.substring(2))}</h1>);
        return;
      }
      if (trimmed.startsWith('## ')) {
        flushList(index);
        elements.push(<h2 key={index} className="article-h2">{parseInline(trimmed.substring(3))}</h2>);
        return;
      }
      if (trimmed.startsWith('### ')) {
        flushList(index);
        elements.push(<h3 key={index} className="article-h3">{parseInline(trimmed.substring(4))}</h3>);
        return;
      }

      // Unordered list item (* or -)
      const ulMatch = trimmed.match(/^[-*]\s+(.*)/);
      if (ulMatch) {
        if (currentListType && currentListType !== 'ul') {
          flushList(index);
        }
        currentListType = 'ul';
        currentList.push(<li key={`li-${index}`} className="article-li">{parseInline(ulMatch[1])}</li>);
        return;
      }

      // Ordered list item (number.)
      const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (olMatch) {
        if (currentListType && currentListType !== 'ol') {
          flushList(index);
        }
        currentListType = 'ol';
        currentList.push(<li key={`li-${index}`} className="article-li">{parseInline(olMatch[2])}</li>);
        return;
      }

      // Empty line
      if (trimmed === '') {
        flushList(index);
        return;
      }

      // Normal paragraph
      flushList(index);
      elements.push(<p key={index} className="article-p">{parseInline(line)}</p>);
    });

    flushList('final');
    return elements;
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
      </div>
    </article>
  );
};

export default ArticleDetail;
