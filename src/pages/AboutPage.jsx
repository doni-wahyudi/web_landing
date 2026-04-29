import { FiUsers, FiTarget, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const AboutPage = () => {
  const { language } = useLanguage();

  const translations = {
    id: {
      seoTitle: "Tentang Kami - Digital Agency Premium",
      seoDesc: "Pelajari lebih lanjut tentang Aurotech, mitra digital Anda dalam membangun website kelas dunia.",
      title: "Tentang",
      titleGradient: "Aurotech",
      subtitle: "Kami adalah tim ahli yang berdedikasi untuk menciptakan pengalaman digital yang luar biasa melalui desain premium dan teknologi mutakhir.",
      mission: "Misi",
      missionGradient: "Kami",
      missionDesc: "Di Aurotech, misi kami sederhana: memberdayakan bisnis dengan website yang bukan sekadar ada, tetapi website yang bekerja untuk tujuan bisnis Anda—meningkatkan kredibilitas, konversi, dan pertumbuhan.",
      feat1: "Kualitas desain tanpa kompromi.",
      feat2: "Teknologi mutakhir untuk performa maksimal.",
      feat3: "Dukungan berkelanjutan pasca-peluncuran.",
      vision: "Visi",
      visionGradient: "Masa Depan",
      visionDesc: "Menjadi standar emas dalam agensi digital di Indonesia, dikenal karena estetika visual yang kuat dan integritas teknis yang tak tertandingi. Kami percaya bahwa setiap bisnis, besar maupun kecil, berhak memiliki kehadiran digital kelas dunia."
    },
    en: {
      seoTitle: "About Us - Premium Digital Agency",
      seoDesc: "Learn more about Aurotech, your digital partner in building world-class websites.",
      title: "About",
      titleGradient: "Aurotech",
      subtitle: "We are a team of experts dedicated to creating extraordinary digital experiences through premium design and cutting-edge technology.",
      mission: "Our",
      missionGradient: "Mission",
      missionDesc: "At Aurotech, our mission is simple: to empower businesses with websites that don't just exist, but websites that work for your business goals—increasing credibility, conversions, and growth.",
      feat1: "Uncompromising design quality.",
      feat2: "Cutting-edge technology for maximum performance.",
      feat3: "Ongoing support after launch.",
      vision: "Vision for the",
      visionGradient: "Future",
      visionDesc: "To be the gold standard in digital agencies in Indonesia, known for strong visual aesthetics and unparalleled technical integrity. We believe every business, large or small, deserves a world-class digital presence."
    }
  };

  const t = translations[language] || translations.id;

  return (
    <div className="about-page pt-32 pb-20">
      <SEO 
        title={t.seoTitle} 
        description={t.seoDesc}
      />
      <div className="container">
        <div className="section-header text-center mb-16">
          <h1 className="h1 animate-entrance">{t.title} <span className="text-gradient">{t.titleGradient}</span></h1>
          <p className="lg animate-entrance delay-100">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 animate-entrance delay-200">
          <div className="about-image glass p-4 rounded-3xl">
            <div className="bg-secondary rounded-2xl p-12 aspect-square flex items-center justify-center">
              <FiUsers size={120} className="text-primary opacity-20" />
            </div>
          </div>
          <div className="about-text">
            <h2 className="h2 mb-6">{t.mission} <span className="text-gradient">{t.missionGradient}</span></h2>
            <p className="text-muted lg mb-8">
              {t.missionDesc}
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FiCheckCircle className="text-primary" /> 
                <span>{t.feat1}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheckCircle className="text-primary" /> 
                <span>{t.feat2}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheckCircle className="text-primary" /> 
                <span>{t.feat3}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="glass p-12 rounded-3xl animate-entrance delay-300">
          <div className="text-center max-w-3xl mx-auto">
            <FiTarget size={48} className="text-primary mx-auto mb-6" />
            <h2 className="h2 mb-6">{t.vision} <span className="text-gradient">{t.visionGradient}</span></h2>
            <p className="lg text-muted">
              {t.visionDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

