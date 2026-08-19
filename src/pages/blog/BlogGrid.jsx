import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiSearch, 
  FiTag, 
  FiArrowRight, 
  FiCalendar,
  FiX
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { getArticles } from '../../services/articleService';
import SEO from '../../components/SEO';
import './BlogGrid.css';

const BlogGrid = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filtering & Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;
  const sectionRef = useRef(null);

  const translations = {
    id: {
      seoTitle: "Artikel & Berita",
      seoDesc: "Wawasan terbaru mengenai pengembangan digital, sistem informasi, dan tren teknologi modern.",
      title: "Artikel &",
      titleGradient: "Wawasan",
      titleSuffix: "Digital",
      subtitle: "Pelajari tren teknologi, tips pengembangan web & aplikasi, serta strategi transformasi digital terbaik untuk bisnis Anda.",
      readMore: "Baca Selengkapnya",
      allCategories: "Semua Kategori",
      searchPlaceholder: "Cari artikel, topik, atau kata kunci...",
      noArticles: "Belum ada artikel yang dipublikasikan.",
      noFilteredArticles: "Tidak ditemukan artikel yang sesuai dengan pencarian Anda.",
      resetFilter: "Reset Pencarian",
      loading: "Memuat artikel...",
      showing: "Menampilkan",
      of: "dari",
      articlesCount: "artikel",
      prev: "Sebelumnya",
      next: "Selanjutnya",
      page: "Halaman"
    },
    en: {
      seoTitle: "Articles & News",
      seoDesc: "The latest insights on digital development, software systems, and modern technology trends.",
      title: "Articles &",
      titleGradient: "Digital",
      titleSuffix: "Insights",
      subtitle: "Explore technology trends, web & mobile app engineering tips, and proven digital transformation strategies.",
      readMore: "Read More",
      allCategories: "All Categories",
      searchPlaceholder: "Search articles, topics, or keywords...",
      noArticles: "No articles published yet.",
      noFilteredArticles: "No articles found matching your search.",
      resetFilter: "Reset Filter",
      loading: "Loading articles...",
      showing: "Showing",
      of: "of",
      articlesCount: "articles",
      prev: "Previous",
      next: "Next",
      page: "Page"
    },
    de: {
      seoTitle: "Artikel & Neuigkeiten",
      seoDesc: "Aktuelle Einblicke in Softwareentwicklung, Informationssysteme und digitale Trends.",
      title: "Artikel &",
      titleGradient: "Digitale",
      titleSuffix: "Einblicke",
      subtitle: "Erfahren Sie mehr über Technologie-Trends, Web-Engineering und Best Practices für digitale Transformation.",
      readMore: "Weiterlesen",
      allCategories: "Alle Kategorien",
      searchPlaceholder: "Artikel, Themen oder Schlüsselwörter suchen...",
      noArticles: "Noch keine Artikel veröffentlicht.",
      noFilteredArticles: "Keine Artikel gefunden, die Ihrer Suche entsprechen.",
      resetFilter: "Filter zurücksetzen",
      loading: "Artikel werden geladen...",
      showing: "Zeige",
      of: "von",
      articlesCount: "Artikeln",
      prev: "Zurück",
      next: "Weiter",
      page: "Seite"
    }
  };

  const t = translations[language] || translations.id;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getArticles();
        setArticles(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load blog posts", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, []);

  // Distinct categories computed from loaded articles
  const categories = useMemo(() => {
    const unique = new Set();
    articles.forEach(a => {
      if (a.category && a.category.trim()) {
        unique.add(a.category.trim());
      }
    });
    return ['All', ...Array.from(unique)];
  }, [articles]);

  // Filtered articles list based on Category and Search
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchCategory = selectedCategory === 'All' || 
        (article.category && article.category.toLowerCase() === selectedCategory.toLowerCase());
      
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        (article.title && article.title.toLowerCase().includes(q)) ||
        (article.content && article.content.toLowerCase().includes(q)) ||
        (article.category && article.category.toLowerCase().includes(q)) ||
        (article.keywords && article.keywords.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));

  // Current page articles
  const currentArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

  // Reset to page 1 on filter or search change
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleResetAll = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Change page and smooth scroll to top of section
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (sectionRef.current) {
      const topOffset = sectionRef.current.offsetTop - 80;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: 'smooth'
      });
    }
  };

  // Generate pagination buttons with smart ellipsis
  const paginationRange = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }, [totalPages, currentPage]);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return url.startsWith('/') ? `https://aurotech.co.id${url}` : `https://aurotech.co.id/${url}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(language === 'id' ? 'id-ID' : language === 'de' ? 'de-DE' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const startCount = filteredArticles.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endCount = Math.min(currentPage * itemsPerPage, filteredArticles.length);

  return (
    <section className="section blog-section" ref={sectionRef}>
      <SEO 
        title={t.seoTitle} 
        description={t.seoDesc} 
        canonical="blog" 
      />

      <div className="container animate-fade-in">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge-pill mb-3">
            <span className="badge-dot"></span>
            Aurotech Knowledge Base
          </div>
          <h1 className="section-title">
            {t.title} <span className="text-gradient">{t.titleGradient}</span> {t.titleSuffix}
          </h1>
          <p className="section-subtitle lg">{t.subtitle}</p>
        </div>

        {/* Filter & Search Toolbar */}
        {!isLoading && articles.length > 0 && (
          <div className="blog-toolbar glass">
            {/* Search Input */}
            <div className="blog-search-box">
              <FiSearch className="blog-search-icon" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="blog-search-input"
              />
              {searchQuery && (
                <button 
                  className="blog-search-clear" 
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="blog-category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`category-pill ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                >
                  {cat === 'All' ? t.allCategories : cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        {isLoading ? (
          <div className="blog-loading-wrapper text-center">
            <div className="loading-spinner"></div>
            <p className="blog-loading">{t.loading}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="blog-empty text-center glass">
            <p>{t.noArticles}</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="blog-empty text-center glass">
            <p>{t.noFilteredArticles}</p>
            <button className="btn btn-primary mt-3" onClick={handleResetAll}>
              {t.resetFilter}
            </button>
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            <div className="blog-grid">
              {currentArticles.map((article) => (
                <article key={article.id} className="blog-card glass">
                  {article.image_url ? (
                    <div className="blog-card-img">
                      <Link to={`/blog/${article.slug || article.id}`}>
                        <img 
                          src={getImageUrl(article.image_url)} 
                          alt={article.title} 
                          loading="lazy" 
                        />
                      </Link>
                    </div>
                  ) : (
                    <div className="blog-card-img-placeholder">
                      <FiTag />
                    </div>
                  )}

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-card-category">{article.category}</span>
                      {article.created_at && (
                        <span className="blog-card-date">
                          <FiCalendar className="meta-icon" />
                          {formatDate(article.created_at)}
                        </span>
                      )}
                    </div>

                    <h2 className="blog-card-title">
                      <Link to={`/blog/${article.slug || article.id}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p className="blog-card-excerpt">
                      {article.content && article.content.length > 130 
                        ? `${article.content.substring(0, 130).trim()}...` 
                        : article.content}
                    </p>

                    <div className="blog-card-footer">
                      <Link to={`/blog/${article.slug || article.id}`} className="blog-card-link">
                        <span>{t.readMore}</span>
                        <FiArrowRight className="link-arrow" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="blog-pagination-wrapper">
                {/* Result Count Info */}
                <div className="pagination-info">
                  {t.showing} <strong>{startCount}–{endCount}</strong> {t.of} <strong>{filteredArticles.length}</strong> {t.articlesCount}
                </div>

                {/* Pagination Navigation */}
                <nav className="pagination-nav" aria-label="Blog pagination">
                  {/* Previous Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-btn pagination-nav-btn prev"
                    aria-label={t.prev}
                  >
                    <FiChevronLeft />
                    <span className="btn-label-desktop">{t.prev}</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="pagination-numbers">
                    {paginationRange.map((pageNumber, index) => {
                      if (pageNumber === '...') {
                        return (
                          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                            &hellip;
                          </span>
                        );
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`pagination-btn pagination-num ${currentPage === pageNumber ? 'active' : ''}`}
                          aria-label={`${t.page} ${pageNumber}`}
                          aria-current={currentPage === pageNumber ? 'page' : undefined}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-btn pagination-nav-btn next"
                    aria-label={t.next}
                  >
                    <span className="btn-label-desktop">{t.next}</span>
                    <FiChevronRight />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
