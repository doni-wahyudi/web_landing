import { FiUsers, FiTarget, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <div className="about-page pt-32 pb-20">
      <SEO 
        title="Tentang Kami - Digital Agency Premium" 
        description="Pelajari lebih lanjut tentang Aurotech, mitra digital Anda dalam membangun website kelas dunia."
      />
      <div className="container">
        <div className="section-header text-center mb-16">
          <h1 className="h1 animate-entrance">Tentang <span className="text-gradient">Aurotech</span></h1>
          <p className="lg animate-entrance delay-100">
            Kami adalah tim ahli yang berdedikasi untuk menciptakan pengalaman digital yang luar biasa melalui desain premium dan teknologi mutakhir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 animate-entrance delay-200">
          <div className="about-image glass p-4 rounded-3xl">
            <div className="bg-secondary rounded-2xl p-12 aspect-square flex items-center justify-center">
              <FiUsers size={120} className="text-primary opacity-20" />
            </div>
          </div>
          <div className="about-text">
            <h2 className="h2 mb-6">Misi <span className="text-gradient">Kami</span></h2>
            <p className="text-muted lg mb-8">
              Di Aurotech, misi kami sederhana: memberdayakan bisnis dengan website yang bukan sekadar ada, tetapi website yang bekerja untuk tujuan bisnis Anda—meningkatkan kredibilitas, konversi, dan pertumbuhan.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FiCheckCircle className="text-primary" /> 
                <span>Kualitas desain tanpa kompromi.</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheckCircle className="text-primary" /> 
                <span>Teknologi mutakhir untuk performa maksimal.</span>
              </li>
              <li className="flex items-center gap-3">
                <FiCheckCircle className="text-primary" /> 
                <span>Dukungan berkelanjutan pasca-peluncuran.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="glass p-12 rounded-3xl animate-entrance delay-300">
          <div className="text-center max-w-3xl mx-auto">
            <FiTarget size={48} className="text-primary mx-auto mb-6" />
            <h2 className="h2 mb-6">Visi <span className="text-gradient">Masa Depan</span></h2>
            <p className="lg text-muted">
              Menjadi standar emas dalam agensi digital di Indonesia, dikenal karena estetika visual yang kuat dan integritas teknis yang tak tertandingi. Kami percaya bahwa setiap bisnis, besar maupun kecil, berhak memiliki kehadiran digital kelas dunia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
