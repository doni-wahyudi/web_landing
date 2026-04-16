import { useState, useEffect, useCallback, useRef } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "CEO, Perusahaan Logistik",
      content: "Aurotech benar-benar memahami visi brand kami. Website yang mereka bangun bukan sekadar estetik, tapi juga meningkatkan konversi hingga 40% dalam 3 bulan pertama.",
      rating: 5
    },
    {
      id: 2,
      name: "Siska Wijaya",
      role: "Founder, Perusahaan Fashion",
      content: "Proses pengerjaannya sangat profesional. Tim Aurotech sangat detail dalam urusan UI/UX. Sekarang website kami terasa jauh lebih premium dan dipercaya pelanggan.",
      rating: 5
    },
    {
      id: 3,
      name: "Andi Pratama",
      role: "Direktur Operasional, Perusahaan Properti",
      content: "Layanan support-nya luar biasa. Setiap kali ada kendala, mereka merespon dengan cepat. Investasi terbaik untuk aset digital perusahaan kami.",
      rating: 5
    },
    {
      id: 4,
      name: "Hendra Kusuma",
      role: "Owner, Perusahaan FnB",
      content: "Aurotech membantu kami mendigitalkan menu dan sistem reservasi. Sangat membantu operasional harian kami dan terlihat sangat berkelas.",
      rating: 5
    },
    {
      id: 5,
      name: "Rina Melati",
      role: "Manajer, Perusahaan Retail",
      content: "Desain website yang sangat sleek dan performa yang sangat cepat. Penjualan online kami meningkat signifikan sejak rilis.",
      rating: 5
    },
    {
      id: 6,
      name: "Fahmi Idris",
      role: "CEO, Perusahaan Konstruksi",
      content: "Partner digital yang sangat terpercaya. Hasil kerjanya selalu melampaui ekspektasi kami dalam hal fungsionalitas dan desain.",
      rating: 5
    }
  ];

  const totalSlides = isMobile ? testimonials.length : Math.ceil(testimonials.length / 3);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = () => {
    nextSlide();
    setIsAutoPlaying(false);
  };

  const handlePrev = () => {
    prevSlide();
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, isAutoPlaying]);

  return (
    <section className="section testimonials-section bg-secondary overflow-hidden">
      <div className="container">
        <div className="section-header text-center animate-entrance">
          <h2 className="section-title">Apa Kata <span className="text-gradient">Klien Kami</span></h2>
          <p className="section-subtitle">Kepercayaan Anda adalah prioritas utama kami dalam menghadirkan kualitas terbaik.</p>
        </div>

        <div className="testimonials-carousel-container">
          <button className="nav-btn prev desktop-nav" onClick={handlePrev} aria-label="Previous">
            <FiChevronLeft />
          </button>

          <div className="testimonials-carousel" ref={carouselRef}>
            <div 
              className="testimonials-track"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / (isMobile ? 1 : 1))}%)` 
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card-wrapper">
                  <div className="testimonial-card glass">
                    <FaQuoteLeft className="quote-icon" />
                    <div className="stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="star-filled" />
                      ))}
                    </div>
                    <p className="testimonial-content">"{testimonial.content}"</p>
                    <div className="testimonial-author">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="nav-btn next desktop-nav" onClick={handleNext} aria-label="Next">
            <FiChevronRight />
          </button>
        </div>

        <div className="testimonials-controls">
          <button className="nav-btn prev mobile-nav" onClick={handlePrev} aria-label="Previous">
            <FiChevronLeft />
          </button>
          
          <div className="carousel-dots">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                className={`dot ${currentIndex === i ? 'active' : ''}`}
                onClick={() => {
                  setCurrentIndex(i);
                  setIsAutoPlaying(false);
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button className="nav-btn next mobile-nav" onClick={handleNext} aria-label="Next">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
