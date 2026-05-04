import { useState, useEffect, useCallback } from 'react';
import { FiCheck, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Pricing.css';

const Pricing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { language } = useLanguage();

  const mainPlansId = [
    {
      name: "Basic",
      price: "Rp999.000",
      originalPrice: "Rp1.500.000",
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
      price: "Rp1.999.000",
      originalPrice: "Rp2.500.000",
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
      price: "Rp3.999.000",
      originalPrice: "Rp4.500.000",
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

  const mainPlansEn = [
    {
      name: "Basic",
      price: "Rp999.000",
      originalPrice: "Rp1.500.000",
      desc: "Perfect for Starters & Small Businesses",
      features: [
        { name: "Up to 5 Website Pages", included: true },
        { name: "Unlimited Revisions", included: true },
        { name: "3 Business Emails", included: true },
        { name: "WhatsApp Integration", included: true },
        { name: "🎁 1-Year Hosting & .com Domain", included: true },
        { name: "Google SEO", included: false },
        { name: "3 SEO Articles", included: false },
        { name: "1-Month Maintenance", included: false }
      ],
      featured: false,
      btnText: "Choose Plan"
    },
    {
      name: "Professional",
      price: "Rp1.999.000",
      originalPrice: "Rp2.500.000",
      desc: "Most Popular Choice for Businesses",
      features: [
        { name: "Up to 10 Website Pages", included: true },
        { name: "Unlimited Revisions", included: true },
        { name: "5 Business Emails", included: true },
        { name: "WhatsApp Integration", included: true },
        { name: "🎁 1-Year Hosting & .com Domain", included: true },
        { name: "Google SEO", included: true },
        { name: "3 SEO Articles", included: true },
        { name: "🎁 1-Month Maintenance & Updates", included: true }
      ],
      featured: true,
      btnText: "Choose Plan"
    },
    {
      name: "Premium",
      price: "Rp3.999.000",
      originalPrice: "Rp4.500.000",
      desc: "For Large & Complex Business Scale",
      features: [
        { name: "10+ Website Pages", included: true },
        { name: "Unlimited Revisions", included: true },
        { name: "5 Business Emails", included: true },
        { name: "WhatsApp Integration", included: true },
        { name: "Database Integration", included: true },
        { name: "Online Registration Form", included: true },
        { name: "🎁 1-Year Hosting & .com Domain", included: true },
        { name: "Google SEO", included: true },
        { name: "10 SEO Articles", included: true },
        { name: "Admin & Dashboard Features", included: true },
        { name: "🎁 1-Year Maintenance & Updates", included: true }
      ],
      featured: false,
      btnText: "Choose Plan"
    }
  ];

  const maintenancePlansListId = [
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

  const maintenancePlansListEn = [
    {
      name: "Renewal",
      category: "Management",
      price: "Rp350.000 / yr",
      desc: "Hosting & Domain Only",
      isRenewal: true,
      features: [
        "Domain Renewal (.com)",
        "Data Storage Rent (Hosting)",
        "Website Stays Active & Secure"
      ],
      btnText: "Choose Plan",
      targetId: "renewal-detail"
    },
    {
      name: "Logo Design",
      category: "Design",
      price: "Rp300.000",
      features: [
        "3 Design Concepts",
        "Max 2x Revisions",
        "3 Working Days Turnaround",
        "Master Files (AI/EPS/SVG)"
      ],
      featured: false,
      btnText: "Choose Plan",
      targetId: "design-logo"
    },
    {
      name: "Basic",
      category: "Maintenance",
      price: "Rp150.000 / mo",
      features: [
        "1 Article Production/mo",
        "Fast Response Support",
        "Uptime Monitoring",
        "Weekly Backup",
        "Error Fixing"
      ],
      featured: false,
      btnText: "Choose Plan",
      targetId: "maintenance-Basic"
    },
    {
      name: "Professional",
      category: "Maintenance",
      price: "Rp300.000 / mo",
      features: [
        "4 Article Production/mo",
        "Page Content Updates",
        "Fast Response Support",
        "Uptime Monitoring",
        "Weekly Backup",
        "Error Fixing",
        "Keyword Optimization"
      ],
      featured: false,
      btnText: "Choose Plan",
      targetId: "maintenance-Profesional"
    },
    {
      name: "Premium",
      category: "Maintenance",
      price: "Rp750.000 / mo",
      features: [
        "8 Article Production/mo",
        "New Page Additions",
        "Page Content Updates",
        "Fast Response Support",
        "Uptime Monitoring",
        "Weekly Backup",
        "Advanced SEO Optimization",
        "Weekly SEO Audit"
      ],
      featured: false,
      btnText: "Choose Plan",
      targetId: "maintenance-Premium"
    }
  ];

  const translations = {
    id: {
      promo: "🎉 PROMO TERBATAS: Gratis Domain & Hosting Super Cepat 1 Tahun Penuh!",
      title: "Paket Pembuatan Website",
      subtitle: "Pilih rentang harga yang sesuai dengan skala bisnis Anda.",
      guarantee: "🛡️ Garansi Revisi Desain Sampai Deal",
      addonTitle: "Add-on Service",
      addonSubtitle: "Layanan tambahan untuk mendukung pertumbuhan dan performa aset digital Anda."
    },
    en: {
      promo: "🎉 LIMITED PROMO: Free Super Fast Domain & Hosting for 1 Full Year!",
      title: "Website Development Packages",
      subtitle: "Choose the price range that suits your business scale.",
      guarantee: "🛡️ Design Revision Guarantee",
      addonTitle: "Add-on Services",
      addonSubtitle: "Additional services to support the growth and performance of your digital assets."
    }
  };

  const mainPlans = language === 'en' ? mainPlansEn : mainPlansId;
  const maintenancePlansList = language === 'en' ? maintenancePlansListEn : maintenancePlansListId;
  const t = translations[language] || translations.id;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maintenancePlansList.length - 3 : prev - 1));
  }, [maintenancePlansList.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maintenancePlansList.length - 3 ? 0 : prev + 1));
  }, [maintenancePlansList.length]);

  useEffect(() => {
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
            {t.promo}
          </div>
        </div>

        <div className="section-header text-center mt-6">
          <h2 className="section-title text-white">{t.title}</h2>
          <p className="text-gray-300">{t.subtitle}</p>
        </div>

        <div className="pricing-grid">
          {mainPlans.map((plan, index) => (
            <div key={index} className={`pricing-card glass-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="featured-badge gold-ribbon">POPULAR</div>}

              <div className="pricing-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price-container">
                  {plan.originalPrice && (
                    <span className="original-price">{plan.originalPrice}</span>
                  )}
                  <div className="plan-price gold-text">
                    {plan.price}
                  </div>
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
                <p className="text-center mt-4 text-sm text-gray-400 font-medium" style={{ opacity: 0.8 }}>{t.guarantee}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Add-on Service Slider */}
        <div className="section-header text-center" style={{ marginTop: '8rem' }}>
          <h2 className="section-title text-white">{t.addonTitle}</h2>
          <p className="text-gray-300">{t.addonSubtitle}</p>
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

