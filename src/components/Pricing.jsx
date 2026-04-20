import { useState, useEffect, useCallback } from 'react';
import { FiCheck, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const mainPlans = [
    {
      name: "Basic",
      price: "Mulai Rp1.000.000",
      desc: "Cocok untuk Starter & UMKM Basic",
      features: [
        { name: "Up to 5 Halaman Website", included: true },
        { name: "Revisi Unlimited", included: true },
        { name: "3 Email Perusahaan", included: true },
        { name: "Integrasi WhatsApp", included: true },
        { name: "🎁 Hosting & Domain .com 1 Tahun", included: true },
        { name: "SEO Google", included: false },
        { name: "3 Artikel SEO", included: false },
        { name: "Maintenance 1 Bulan", included: false }
      ],
      featured: false,
      btnText: "Pilih Paket"
    },
    {
      name: "Profesional",
      price: "Mulai Rp2.200.000",
      desc: "Pilihan Terpopuler untuk Bisnis",
      features: [
        { name: "Up to 10 Halaman Website", included: true },
        { name: "Revisi Unlimited", included: true },
        { name: "5 Email Perusahaan", included: true },
        { name: "Integrasi WhatsApp", included: true },
        { name: "🎁 Hosting & Domain .com 1 Tahun", included: true },
        { name: "SEO Google", included: true },
        { name: "3 Artikel SEO", included: true },
        { name: "🎁 Maintenance & Update 1 Bulan", included: true }
      ],
      featured: true,
      btnText: "Pilih Paket"
    },
    {
      name: "Premium",
      price: "Mulai Rp4.500.000",
      desc: "Untuk Skala Bisnis Besar & Kompleks",
      features: [
        { name: "10+ Halaman Website", included: true },
        { name: "Revisi Unlimited", included: true },
        { name: "5 Email Perusahaan", included: true },
        { name: "Integrasi WhatsApp", included: true },
        { name: "Integrasi Database", included: true },
        { name: "Form Pendaftaran Online", included: true },
        { name: "🎁 Hosting & Domain .com 1 Tahun", included: true },
        { name: "SEO Google", included: true },
        { name: "10 Artikel SEO", included: true },
        { name: "Fitur Admin dan Dashboard", included: true },
        { name: "🎁 Maintenance & Update 1 Tahun", included: true }
      ],
      featured: false,
      btnText: "Pilih Paket"
    }
  ];

  const maintenancePlansList = [
    {
      name: "Perpanjangan",
      category: "Management",
      price: "Rp350.000 / thn",
      desc: "Khusus Hosting & Domain",
      isRenewal: true,
      features: [
        "Perpanjangan Domain (.com)",
        "Sewa Tempat Data (Hosting)",
        "Website Tetap Aktif & Aman"
      ],
      btnText: "Pilih Paket",
      targetId: "renewal-detail"
    },
    {
      name: "Pembuatan Logo",
      category: "Design",
      price: "Rp300.000",
      features: [
        "3 Konsep Desain",
        "Revisi Maksimal 2x",
        "Pengerjaan 3 Hari Kerja",
        "File Master (AI/EPS/SVG)"
      ],
      featured: false,
      btnText: "Pilih Paket",
      targetId: "design-logo"
    },
    {
      name: "Basic",
      category: "Maintenance",
      price: "Rp150.000 / bln",
      features: [
        "Produksi Artikel 1/bulan",
        "Fast Response Support",
        "Monitoring Uptime",
        "Backup Mingguan",
        "Perbaikan Error"
      ],
      featured: false,
      btnText: "Pilih Paket",
      targetId: "maintenance-Basic"
    },
    {
      name: "Profesional",
      category: "Maintenance",
      price: "Rp300.000 / bln",
      features: [
        "Produksi Artikel 4/bulan",
        "Update Konten Halaman",
        "Fast Response Support",
        "Monitoring Uptime",
        "Backup Mingguan",
        "Perbaikan Error",
        "Optimasi Keyword"
      ],
      featured: false,
      btnText: "Pilih Paket",
      targetId: "maintenance-Profesional"
    },
    {
      name: "Premium",
      category: "Maintenance",
      price: "Rp750.000 / bln",
      features: [
        "Produksi Artikel 8/bulan",
        "Penambahan Halaman Baru",
        "Update Konten Halaman",
        "Fast Response Support",
        "Monitoring Uptime",
        "Backup Mingguan",
        "Optimasi SEO Lanjutan",
        "Audit SEO Mingguan"
      ],
      featured: false,
      btnText: "Pilih Paket",
      targetId: "maintenance-Premium"
    }
  ];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maintenancePlansList.length - 3 : prev - 1));
  }, [maintenancePlansList.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maintenancePlansList.length - 3 ? 0 : prev + 1));
  }, [maintenancePlansList.length]);

  useEffect(() => {
    // Disable auto-play on mobile where native touch scrolling is used
    const isMobile = window.innerWidth <= 768;
    if (isPaused || isMobile) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [handleNext, isPaused, currentIndex]);

  return (
    <section
      id="pricing"
      className="section pricing-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Scarcity Banner Hook */}
        <div className="promo-banner text-center mb-8">
          <div className="inline-block bg-primary text-black px-6 py-3 rounded-full font-bold shadow-lg animate-pulse">
            🎉 PROMO TERBATAS: Gratis Domain & Hosting Super Cepat 1 Tahun Penuh!
          </div>
        </div>

        <div className="section-header text-center mt-6">
          <h2 className="section-title text-white">Paket Pembuatan Website</h2>
          <p className="text-gray-300">Pilih rentang harga yang sesuai dengan skala bisnis Anda.</p>
        </div>

        <div className="pricing-grid">
          {mainPlans.map((plan, index) => (
            <div key={index} className={`pricing-card glass-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="featured-badge gold-ribbon">POPULAR</div>}

              <div className="pricing-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price gold-text">
                  {plan.price}
                </div>
              </div>

              <div className="pricing-features">
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={feature.included ? 'clean-list' : 'clean-list not-included'}>
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pricing-action">
                <a href={`https://wa.me/6282182252766?text=Halo,%20saya%20tertarik%20dengan%20Paket%20Website%20${plan.name}`} className="btn w-full btn-blue">
                  {plan.btnText}
                </a>
                <p className="text-center mt-4 text-sm text-gray-400 font-medium" style={{ opacity: 0.8 }}>🛡️ Garansi Revisi Desain Sampai Deal</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Add-on Service Slider */}
        <div className="section-header text-center" style={{ marginTop: '8rem' }}>
          <h2 className="section-title text-white">Add-on Service</h2>
          <p className="text-gray-300">Layanan tambahan untuk mendukung pertumbuhan dan performa aset digital Anda.</p>
        </div>

        <div className="maintenance-slider-outer">
          <button className="slider-arrow prev" onClick={handlePrev} aria-label="Previous">
            <FiChevronLeft size={32} />
          </button>

          <div className="maintenance-slider-window">
            <div
              className="maintenance-slider-track"
              style={{ transform: `translateX(-${currentIndex * (100 / maintenancePlansList.length)}%)` }}
            >
              {maintenancePlansList.map((plan, index) => (
                <div key={index} className="maintenance-slide">
                  <div className={`pricing-card glass-card maintenance-card ${plan.isRenewal ? 'renewal-card' : ''}`}>
                    <div className="pricing-header">
                      <span className="card-category">{plan.category}</span>
                      <h3 className="plan-name">{plan.name}</h3>
                      <div className="plan-price gold-text">
                        {plan.price}
                      </div>
                    </div>

                    <div className="pricing-features">
                      <ul>
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="clean-list text-center">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pricing-action">
                      <a href={`https://wa.me/6282182252766?text=Halo,%20saya%20tertarik%20dengan%20${plan.name}`} className={`btn w-full ${plan.isRenewal ? 'btn-primary' : 'btn-blue'}`}>
                        {plan.btnText}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="slider-arrow next" onClick={handleNext} aria-label="Next">
            <FiChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
