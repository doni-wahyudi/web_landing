import Pricing from '../components/Pricing';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiGlobe, FiSettings, FiAward, FiGift, FiMonitor, FiTrendingUp, FiFileText, FiSearch, FiHeadphones } from 'react-icons/fi';
import '../components/Pricing.css'; // ensuring the CSS loads

const PricingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.targetId) {
      setTimeout(() => {
        const element = document.getElementById(location.state.targetId);
        if (element) {
          const yOffset = -100; 
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const maintenanceDetails = [
    {
      name: "Basic",
      subtitle: "Cocok untuk Bimbel yang hanya butuh website tetap aman & stabil",
      gridClass: "grid-basic",
      sections: [
        {
          icon: <FiGlobe />,
          title: "Teknis",
          items: ["Update plugin & sistem website", "Backup website (1x per minggu)", "Monitoring uptime (website tetap online)"]
        },
        {
          icon: <FiMonitor />,
          title: "Support",
          items: ["Perbaikan error ringan", "Support via WhatsApp"]
        },
        {
          icon: <FiAward />,
          title: "Keunggulan",
          items: ["Website aman dari error & bug", "Tidak perlu pusing urus teknis"]
        }
      ]
    },
    {
      name: "Profesional",
      subtitle: "Cocok untuk Bimbel yang ingin website aktif mendatangkan murid",
      subAccent: "Semua fitur Basic + tambahan",
      gridClass: "grid-premium",
      sections: [
        {
          icon: <FiFileText />,
          title: "Content Management",
          items: ["Upload artikel / berita (4x per bulan)", "Update informasi program / jadwal", "Update foto kegiatan"]
        },
        {
          icon: <FiSearch />,
          title: "SEO Basic",
          items: ["Optimasi artikel", "Penambahan keyword", "Monitoring performa Google"]
        },
        {
          icon: <FiHeadphones />,
          title: "Support Prioritas",
          items: ["Respon lebih cepat", "Perbaikan minor tanpa biaya tambahan"]
        },
        {
          icon: <FiAward />,
          title: "Keunggulan",
          items: ["Website tidak \"mati\"", "Mulai menghasilkan traffic dari Google"]
        }
      ]
    },
    {
      name: "Premium",
      subtitle: "Solusi lengkap untuk operasional Website Ekstra Skala Besar",
      subAccent: "Semua fitur Profesional + tambahan eksklusif",
      gridClass: "grid-premium",
      sections: [
        {
          icon: <FiFileText />,
          title: "Full Management",
          items: ["Upload artikel / berita (8x per bulan)", "Desain banner & grafis bulanan", "Update halaman custom sesuai event"]
        },
        {
          icon: <FiTrendingUp />,
          title: "SEO Lanjutan",
          items: ["Optimasi SEO On-Page mendalam", "Pembuatan Backlink High-Quality", "Audit SEO & Technical SEO"]
        },
        {
          icon: <FiHeadphones />,
          title: "Support Prioritas",
          items: ["Respon Instan 24/7 (SLA 1 Jam)", "Revisi konten tanpa batas", "Laporan analitik performa bulanan"]
        },
        {
          icon: <FiAward />,
          title: "Keunggulan",
          items: ["Website menjadi aset bisnis otopilot", "Traffic organik tertarget tinggi"],
          bonus: {
            title: "Bonus",
            items: ["Bebas biaya migrasi server", "Konsultasi strategi digital bulanan"]
          }
        }
      ]
    }
  ];

  const developDetails = [
    {
      name: "Basic",
      subtitle: "Cocok untuk bimbel baru / skala kecil yang ingin mulai online",
      gridClass: "grid-basic",
      sections: [
        {
          icon: <FiGlobe />,
          title: "Halaman Website",
          items: ["Beranda", "Tentang Kami", "Program Bimbel", "Galeri", "Kontak"]
        },
        {
          icon: <FiMonitor />,
          title: "Fitur Utama",
          items: ["Desain profesional & mobile friendly", "Integrasi WhatsApp (chat langsung)", "Form kontak sederhana", "Google Maps lokasi", "Domain + hosting 1 tahun"]
        },
        {
          icon: <FiAward />,
          title: "Keunggulan",
          items: ["Sudah bisa tampil profesional di internet", "Memudahkan orang tua menemukan lokasi"]
        }
      ]
    },
    {
      name: "Profesional",
      subtitle: "Cocok untuk Bimbel yang ingin scale up & sistem digital lengkap",
      subAccent: "Semua fitur Basic + tambahan",
      gridClass: "grid-pro",
      sections: [
        {
          icon: <FiGlobe />,
          title: "Halaman",
          items: ["Program SD, SMP, SMA (dipisah)", "Halaman Testimoni", "Blog / Artikel edukasi", "Landing page pendaftaran"]
        },
        {
          icon: <FiSettings />,
          title: "Fitur Marketing",
          items: ["Form pendaftaran online", "Integrasi WhatsApp otomatis (auto text)", "Basic SEO (agar muncul di Google)", "Optimasi kecepatan website", "Struktur website SEO-friendly"]
        },
        {
          icon: <FiAward />,
          title: "Keunggulan",
          items: ["Website mulai berfungsi sebagai alat marketing", "Bisa mendatangkan calon murid dari Google"]
        },
        {
          icon: <FiGift />,
          title: "Bonus",
          items: ["3 artikel SEO (untuk menarik traffic Google)", "Setup Google Analytics", "Training penggunaan website"]
        }
      ]
    },
    {
      name: "Premium",
      subtitle: "Cocok untuk Bimbel yang ingin scale up & sistem digital lengkap",
      subAccent: "Semua fitur Profesional + tambahan",
      gridClass: "grid-premium",
      sections: [
        {
          icon: <FiGlobe />,
          title: "Fitur Sistem",
          items: ["Dashboard admin", "Sistem pendaftaran siswa lengkap", "Database siswa", "Login siswa / orang tua"]
        },
        {
          icon: <FiTrendingUp />,
          title: "Fitur Unggulan",
          items: ["Progress report siswa", "Sistem jadwal kelas", "Tes diagnostik online", "Landing page iklan (high conversion)"]
        },
        {
          icon: <FiSettings />,
          title: "SEO Optimasi",
          items: ["Setup SEO lanjutan", "Struktur artikel SEO", "Optimasi performa & keamanan"]
        },
        {
          icon: <FiAward />,
          title: "Keunggulan",
          items: ["Mesin pencari murid otomatis", "Digunakan untuk ekspansi"],
          bonus: {
            icon: <FiGift />,
            title: "Bonus",
            items: ["10 artikel SEO", "Setup Google Business Profile", "Konsultasi digital marketing", "Maintenance 1 bulan gratis"]
          }
        }
      ]
    }
  ];

  return (
    <div className="page-wrapper pt-20">
      <Pricing />

      <section className="section pricing-wrapper pt-0" style={{background: 'linear-gradient(135deg, #0a192f 0%, #173f5f 100%)', marginTop: '-5rem'}}>
        <div className="container">
          {/* Detail Paket Develop */}
          <div className="develop-details-container mt-16">
            <h2 className="section-title text-center text-white mb-8">Membedah Fitur <span className="text-gradient">Lebih Dalam</span></h2>
            {developDetails.map((pkg, index) => (
              <div key={index} id={`develop-${pkg.name}`} className="develop-package-block text-center mt-16">
                <h2 className="develop-title">
                  Paket Develop <span className={pkg.name === 'Basic' ? 'gold-text-light' : 'gold-text'}>{pkg.name}</span>
                </h2>
                <p className="develop-subtitle">{pkg.subtitle}</p>
                {pkg.subAccent && <p className="develop-subaccent">{pkg.subAccent}</p>}

                <div className={`details-grid ${pkg.gridClass} mt-8`}>
                  {pkg.sections.map((section, idx) => (
                    <div key={idx} className="detail-column-wrapper">
                      <div className="column-icon-container">
                        <div className="column-icon">{section.icon}</div>
                      </div>
                      <div className="detail-column glass-dark">
                        <div className="column-title-pill">{section.title}</div>
                        <ul className="detail-list">
                          {section.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>

                        {section.bonus && (
                          <>
                            <div className="column-title-pill mt-4">{section.bonus.title}</div>
                            <ul className="detail-list bonus-list">
                              {section.bonus.items.map((bItem, bIdx) => (
                                <li key={bIdx}>{bItem}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Detail Paket Maintenance */}
          <div className="develop-details-container mt-20 mb-20">
            <h2 className="section-title text-center text-white mb-12">Rincian Modul <span className="text-gradient">Maintenance</span></h2>
            {maintenanceDetails.map((pkg, index) => (
              <div key={index} id={`maintenance-${pkg.name}`} className="develop-package-block text-center mt-16">
                <h2 className="develop-title">
                  Paket Maintenance <span className={pkg.name === 'Basic' ? 'gold-text-light' : 'gold-text'}>{pkg.name}</span>
                </h2>
                <p className="develop-subtitle">{pkg.subtitle}</p>
                {pkg.subAccent && <p className="develop-subaccent">{pkg.subAccent}</p>}

                <div className={`details-grid ${pkg.gridClass} mt-8`}>
                  {pkg.sections.map((section, idx) => (
                    <div key={idx} className="detail-column-wrapper">
                      <div className="column-icon-container">
                        <div className="column-icon">{section.icon}</div>
                      </div>
                      <div className="detail-column glass-dark">
                        <div className="column-title-pill">{section.title}</div>
                        <ul className="detail-list">
                          {section.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>

                        {section.bonus && (
                          <>
                            <div className="column-title-pill mt-4">{section.bonus.title}</div>
                            <ul className="detail-list bonus-list">
                              {section.bonus.items.map((bItem, bIdx) => (
                                <li key={bIdx}>{bItem}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
