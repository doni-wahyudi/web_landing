import { FiCheck, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
  const mainPlans = [
    {
      name: "Basic",
      price: "Mulai Rp1.000.000",
      desc: "Cocok untuk Starter & UMKM Basic",
      features: [
        { name: "5 Halaman Website", included: true },
        { name: "Integrasi WhatsApp", included: true },
        { name: "Form Pendaftaran Online", included: true },
        { name: "Blog SEO", included: false },
        { name: "SEO Google", included: false },
        { name: "3 Artikel SEO", included: false }
      ],
      featured: false,
      btnText: "Pilih Paket"
    },
    {
      name: "Profesional",
      price: "Mulai Rp2.200.000",
      desc: "Pilihan Terpopuler untuk Bisnis",
      features: [
        { name: "10 Halaman Website", included: true },
        { name: "Integrasi WhatsApp", included: true },
        { name: "Form Pendaftaran Online", included: true },
        { name: "Blog SEO", included: true },
        { name: "SEO Google", included: true },
        { name: "3 Artikel SEO", included: true },
        { name: "🎁 GRATIS Maintenance Bulan 1", included: true } // Upsell Hook
      ],
      featured: true,
      btnText: "Pilih Paket"
    },
    {
      name: "Premium",
      price: "Mulai Rp4.500.000",
      desc: "Untuk Skala Bisnis Besar & Kompleks",
      features: [
        { name: "10 Halaman Website", included: true },
        { name: "Integrasi WhatsApp", included: true },
        { name: "Form Pendaftaran Online", included: true },
        { name: "Blog SEO", included: true },
        { name: "SEO Google", included: true },
        { name: "Dashboard", included: true },
        { name: "Sistem Membership", included: true },
        { name: "10 Artikel SEO", included: true }
      ],
      featured: false,
      btnText: "Pilih Paket"
    }
  ];

  const maintenancePlans = [
    {
      name: "Basic",
      price: "Mulai Rp150.000",
      features: [
        "Update & Backup",
        "Pengecekan Keamanan"
      ],
      featured: false,
      btnText: "Pilih Paket"
    },
    {
      name: "Profesional",
      price: "Mulai Rp300.000",
      features: [
        "Update & Backup",
        "Perbaikan Error",
        "Update Konten",
        "Artikel SEO 4/bln",
        "Optimasi SEO"
      ],
      featured: true,
      btnText: "Pilih Paket"
    },
    {
      name: "Premium",
      price: "Mulai Rp1.000.000",
      features: [
        "Update & Backup",
        "Perbaikan Error",
        "Update Konten",
        "Artikel SEO 4/bln",
        "Optimasi SEO",
        "Analisa Website",
        "Development"
      ],
      featured: false,
      btnText: "Pilih Paket"
    }
  ];

  return (
    <section id="pricing" className="section pricing-wrapper">
      <div className="container">
        {/* Scarcity Banner Hook */}
        <div className="promo-banner text-center mb-8">
          <div className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg animate-pulse" style={{backgroundColor: '#ff3366'}}>
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
                <a href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20Paket%20Website%20${plan.name}`} className={`btn w-full ${plan.featured ? 'btn-blue' : 'btn-blue'}`}>
                  {plan.btnText}
                </a>
                <Link to="/pricing" state={{ targetId: `develop-${plan.name}` }} className="btn btn-outline w-full mt-4">
                  Lihat Detail Paket &rarr;
                </Link>
                {/* Risk Reversal Hook */}
                <p className="text-center mt-4 text-sm text-gray-400 font-medium" style={{ opacity: 0.8 }}>🛡️ Garansi Revisi Desain Sampai Deal</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Paket Maintenance */}
        <div className="section-header text-center" style={{ marginTop: '8rem' }}>
          <h2 className="section-title text-white">Paket Maintenance</h2>
          <p className="text-gray-300">Fokus pada bisnis Anda biarkan kami merawat website secara teknis.</p>
        </div>

        <div className="pricing-grid">
          {maintenancePlans.map((plan, index) => (
            <div key={index} className={`pricing-card glass-card maintenance-card ${plan.featured ? 'featured' : ''}`}>
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
                    <li key={idx} className="clean-list text-center">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pricing-action">
                <a href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20Paket%20Maintenance%20${plan.name}`} className="btn btn-blue w-full">
                  {plan.btnText}
                </a>
                <Link to="/pricing" state={{ targetId: `maintenance-${plan.name}` }} className="btn btn-outline w-full mt-4">
                  Lihat Detail Paket &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
