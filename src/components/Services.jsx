import { FiMonitor, FiSmartphone, FiTrendingUp, FiShield, FiClock, FiHeadphones } from 'react-icons/fi';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <FiMonitor />,
      title: "Desain Premium & Modern",
      desc: "Website dengan tampilan estetik, responsif, dan mencerminkan profesionalitas bisnis Anda."
    },
    {
      icon: <FiTrendingUp />,
      title: "SEO Friendly",
      desc: "Struktur website yang dioptimasi untuk mesin pencari agar bisnis Anda mudah ditemukan di Google."
    },
    {
      icon: <FiSmartphone />,
      title: "100% Mobile Responsive",
      desc: "Tampil sempurna di semua perangkat: HP, Tablet, maupun Laptop/Desktop."
    },
    {
      icon: <FiClock />,
      title: "Proses Cepat & Tepat",
      desc: "Pengerjaan sesuai deadline tanpa mengorbankan kualitas dan detail website."
    },
    {
      icon: <FiShield />,
      title: "Aman & Kencang",
      desc: "Prioritas pada kecepatan loading dan keamanan data pelanggan Anda."
    },
    {
      icon: <FiHeadphones />,
      title: "Full Support 24/7",
      desc: "Bantuan teknis siap melayani kapan pun Anda mengalami kendala pada website."
    }
  ];

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Mengapa Memilih <span className="text-gradient">Kami?</span></h2>
          <p className="section-subtitle">
            Kami tidak hanya membuat website, tapi membangun aset digital yang menghasilkan konversi untuk bisnis Anda.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card glass">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
