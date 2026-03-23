import { FiCheck, FiX } from 'react-icons/fi';
import './Pricing.css';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "Rp 1.499.000",
      desc: "Cocok untuk UMKM & Bisnis Baru",
      features: [
        { name: "Gratis Domain .COM (1 Tahun)", included: true },
        { name: "Gratis Hosting (1 Tahun)", included: true },
        { name: "Desain Premium", included: true },
        { name: "Mobile Responsive", included: true },
        { name: "SEO Basic", included: true },
        { name: "Maksimal 5 Halaman", included: true },
        { name: "Revisi Desain 2x", included: true },
        { name: "Sistem Toko Online", included: false },
        { name: "Prioritas Support 24/7", included: false }
      ],
      featured: false,
      btnText: "Pilih Paket Basic"
    },
    {
      name: "Profesional",
      price: "Rp 2.999.000",
      desc: "Pilihan Terpopuler untuk Perusahaan",
      features: [
        { name: "Gratis Domain .COM (1 Tahun)", included: true },
        { name: "Gratis Hosting NVMe (1 Tahun)", included: true },
        { name: "Desain Premium Custom", included: true },
        { name: "Mobile Responsive", included: true },
        { name: "SEO Advanced", included: true },
        { name: "Maksimal 12 Halaman", included: true },
        { name: "Revisi Desain Unlimited", included: true },
        { name: "Sistem Toko Online Basic", included: true },
        { name: "Prioritas Support 24/7", included: true }
      ],
      featured: true,
      btnText: "Pilih Paket Pro"
    },
    {
      name: "Toko Online / Custom",
      price: "Mulai Rp 4.999.000",
      desc: "Untuk Skala Bisnis Besar & Kompleks",
      features: [
        { name: "Semua Fitur Paket Profesional", included: true },
        { name: "Sistem Toko Online Full Fitur", included: true },
        { name: "Integrasi Payment Gateway", included: true },
        { name: "Integrasi Ongkir Otomatis", included: true },
        { name: "Halaman Unlimited", included: true },
        { name: "Sistem Membership / Login", included: true },
        { name: "Custom Web App Requirements", included: true },
        { name: "Maintenance Bulanan", included: true },
        { name: "Dedicated Account Manager", included: true }
      ],
      featured: false,
      btnText: "Hubungi Kami"
    }
  ];

  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Pilih Paket <span className="text-gradient">Investasi Anda</span></h2>
          <p className="section-subtitle">
            Harga transparan tanpa biaya tersembunyi. Dapatkan fitur maksimal sesuai kebutuhan bisnis Anda dengan garansi 100% kepuasan.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card glass ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="featured-badge">TERPOPULER</div>}
              
              <div className="pricing-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.desc}</p>
                <div className="plan-price">
                  {plan.price}
                </div>
              </div>

              <div className="pricing-features">
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={feature.included ? '' : 'not-included'}>
                      <span className="feature-icon">
                        {feature.included ? <FiCheck className="text-primary" /> : <FiX className="text-muted" />}
                      </span>
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pricing-action">
                <a href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20Paket%20Website%20${plan.name}`} className={`btn w-full ${plan.featured ? 'btn-primary' : 'btn-outline'}`}>
                  {plan.btnText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
