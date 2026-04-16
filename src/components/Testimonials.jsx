import { useState, useEffect, useCallback } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    // ... data remains same ...
    {
      name: "Budi Santoso",
      role: "CEO, Perusahaan Logistik",
      content: "Aurotech benar-benar memahami visi brand kami. Website yang mereka bangun bukan sekadar estetik, tapi juga meningkatkan konversi hingga 40% dalam 3 bulan pertama.",
      rating: 5
    },
    {
      name: "Siska Wijaya",
      role: "Founder, Perusahaan Fashion",
      content: "Proses pengerjaannya sangat profesional. Tim Aurotech sangat detail dalam urusan UI/UX. Sekarang website kami terasa jauh lebih premium dan dipercaya pelanggan.",
      rating: 5
    },
    {
      name: "Andi Pratama",
      role: "Direktur Operasional, Perusahaan Properti",
      content: "Layanan support-nya luar biasa. Setiap kali ada kendala, mereka merespon dengan cepat. Investasi terbaik untuk aset digital perusahaan kami.",
      rating: 5
    },
    {
      name: "Hendra Kusuma",
      role: "Owner, Perusahaan FnB",
      content: "Aurotech membantu kami mendigitalkan menu dan sistem reservasi. Sangat membantu operasional harian kami dan terlihat sangat berkelas.",
      rating: 5
    },
    {
      name: "Rina Melati",
      role: "Manajer, Perusahaan Retail",
      content: "Desain website yang sangat sleek dan performa yang sangat cepat. Penjualan online kami meningkat signifikan sejak rilis.",
      rating: 5
    },
    {
      name: "Fahmi Idris",
      role: "CEO, Perusahaan Konstruksi",
      content: "Partner digital yang sangat terpercaya. Hasil kerjanya selalu melampaui ekspektasi kami dalam hal fungsionalitas dan desain.",
      rating: 5
    }
  ];

  const totalSlides = Math.ceil(testimonials.length / 3);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="section testimonials-section bg-secondary overflow-hidden">
      <div className="container">
        <div className="section-header text-center animate-entrance">
          <h2 className="section-title">Apa Kata <span className="text-gradient">Klien Kami</span></h2>
          <p className="section-subtitle">Kepercayaan Anda adalah prioritas utama kami dalam menghadirkan kualitas terbaik.</p>
        </div>

        <div className="testimonials-carousel-container">
          <button className="nav-btn prev" onClick={prevSlide} aria-label="Previous slide">
            <FiChevronLeft />
          </button>
          
          <div className="testimonials-carousel">
            <div 
              className="testimonials-track" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((item, index) => (
                <div key={index} className="testimonial-card-wrapper">
                  <div className="testimonial-card glass">
                    <div className="quote-icon">
                      <FaQuoteLeft />
                    </div>
                    <div className="stars">
                      {[...Array(item.rating)].map((_, i) => (
                        <FiStar key={i} className="star-filled" />
                      ))}
                    </div>
                    <p className="testimonial-content">"{item.content}"</p>
                    <div className="testimonial-author">
                      <div className="author-info">
                        <h4>{item.name}</h4>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="nav-btn next" onClick={nextSlide} aria-label="Next slide">
            <FiChevronRight />
          </button>
        </div>

        <div className="carousel-dots">
          {[...Array(totalSlides)].map((_, idx) => (
            <button
              key={idx}
              className={`dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
