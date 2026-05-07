import { useLanguage } from '../context/LanguageContext';
import { FiMessageCircle, FiPenTool, FiRefreshCw, FiSend } from 'react-icons/fi';
import './Process.css';

const Process = () => {
  const { language } = useLanguage();

  const processStepsId = [
    {
      id: 1,
      title: "Konsultasi",
      description: "Diskusi kebutuhan & brief proyek untuk memahami visi dan target audiens bisnis Anda.",
      time: "Hari 1",
      icon: <FiMessageCircle />
    },
    {
      id: 2,
      title: "Desain",
      description: "Pembuatan wireframe & mockup UI/UX untuk persetujuan sebelum pengembangan.",
      time: "Hari 2–4",
      icon: <FiPenTool />
    },
    {
      id: 3,
      title: "Revisi",
      description: "Penyempurnaan desain dan fungsionalitas berdasarkan feedback Anda.",
      time: "Hari 5–6",
      icon: <FiRefreshCw />
    },
    {
      id: 4,
      title: "Launch",
      description: "Testing menyeluruh, go-live, dan serah terima (handover) aset digital.",
      time: "Hari 7",
      icon: <FiSend />
    }
  ];

  const processStepsEn = [
    {
      id: 1,
      title: "Consultation",
      description: "Discuss requirements & project brief to understand your business vision and target audience.",
      time: "Day 1",
      icon: <FiMessageCircle />
    },
    {
      id: 2,
      title: "Design",
      description: "Creation of wireframes & UI/UX mockups for approval before development.",
      time: "Days 2–4",
      icon: <FiPenTool />
    },
    {
      id: 3,
      title: "Revision",
      description: "Refining design and functionality based on your feedback.",
      time: "Days 5–6",
      icon: <FiRefreshCw />
    },
    {
      id: 4,
      title: "Launch",
      description: "Thorough testing, go-live, and digital asset handover.",
      time: "Day 7",
      icon: <FiSend />
    }
  ];

  const translations = {
    id: {
      title: "Cara",
      titleGradient: "Kami Bekerja",
      subtitle: "Proses transparan dan efisien untuk memastikan hasil terbaik tepat waktu."
    },
    en: {
      title: "How",
      titleGradient: "We Work",
      subtitle: "A transparent and efficient process to ensure the best results on time."
    }
  };

  const t = translations[language] || translations.id;
  const steps = language === 'en' ? processStepsEn : processStepsId;

  return (
    <section className="section process-section bg-secondary">
      <div className="container">
        <div className="section-header text-center animate-entrance">
          <h2 className="section-title">{t.title} <span className="text-gradient">{t.titleGradient}</span></h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={step.id} className="process-step animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="process-icon-wrapper glass">
                <span className="process-number">{step.id}</span>
                <div className="process-icon">{step.icon}</div>
              </div>
              <div className="process-content">
                <h3 className="process-title">{step.title}</h3>
                <span className="process-time text-gradient">{step.time}</span>
                <p className="process-desc">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="process-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
