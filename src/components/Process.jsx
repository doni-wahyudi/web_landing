import { useLanguage } from '../context/LanguageContext';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { FiPenTool } from 'react-icons/fi';
import { MdOutlineAutorenew } from 'react-icons/md';
import { IoRocketSharp } from 'react-icons/io5';
import './Process.css';

const Process = () => {
  const { language } = useLanguage();

  const processStepsId = [
    {
      id: 1,
      title: "Konsultasi",
      description: "Diskusi kebutuhan & brief proyek untuk memahami visi dan target audiens bisnis Anda.",
      time: "Hari 1",
      icon: <IoChatbubblesSharp className="process-step-icon" />
    },
    {
      id: 2,
      title: "Desain",
      description: "Pembuatan wireframe & mockup UI/UX untuk persetujuan sebelum pengembangan.",
      time: "Hari 2–4",
      icon: <FiPenTool className="process-step-icon" />
    },
    {
      id: 3,
      title: "Revisi",
      description: "Penyempurnaan desain dan fungsionalitas berdasarkan feedback Anda.",
      time: "Hari 5–6",
      icon: <MdOutlineAutorenew className="process-step-icon" />
    },
    {
      id: 4,
      title: "Launch",
      description: "Testing menyeluruh, go-live, dan serah terima (handover) aset digital.",
      time: "Hari 7",
      icon: <IoRocketSharp className="process-step-icon" />
    }
  ];

  const processStepsEn = [
    {
      id: 1,
      title: "Consultation",
      description: "Discuss requirements & project brief to understand your business vision and target audience.",
      time: "Day 1",
      icon: <IoChatbubblesSharp className="process-step-icon" />
    },
    {
      id: 2,
      title: "Design",
      description: "Creation of wireframes & UI/UX mockups for approval before development.",
      time: "Days 2–4",
      icon: <FiPenTool className="process-step-icon" />
    },
    {
      id: 3,
      title: "Revision",
      description: "Refining design and functionality based on your feedback.",
      time: "Days 5–6",
      icon: <MdOutlineAutorenew className="process-step-icon" />
    },
    {
      id: 4,
      title: "Launch",
      description: "Thorough testing, go-live, and digital asset handover.",
      time: "Day 7",
      icon: <IoRocketSharp className="process-step-icon" />
    }
  ];

  const processStepsDe = [
    {
      id: 1,
      title: "Beratung",
      description: "Besprechung der Anforderungen & des Projektbriefings, um Ihre Geschäftsvision und Zielgruppe zu verstehen.",
      time: "Tag 1",
      icon: <IoChatbubblesSharp className="process-step-icon" />
    },
    {
      id: 2,
      title: "Design",
      description: "Erstellung von Wireframes & UI/UX-Mockups zur Freigabe vor der Entwicklung.",
      time: "Tag 2–4",
      icon: <FiPenTool className="process-step-icon" />
    },
    {
      id: 3,
      title: "Revision",
      description: "Verfeinerung von Design und Funktionalität basierend auf Ihrem Feedback.",
      time: "Tag 5–6",
      icon: <MdOutlineAutorenew className="process-step-icon" />
    },
    {
      id: 4,
      title: "Launch",
      description: "Umfangreiche Tests, Go-Live und Übergabe der digitalen Assets.",
      time: "Tag 7",
      icon: <IoRocketSharp className="process-step-icon" />
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
    },
    de: {
      title: "Wie",
      titleGradient: "wir arbeiten",
      subtitle: "Ein transparenter und effizienter Prozess, um die besten Ergebnisse pünktlich zu liefern."
    }
  };

  const t = translations[language] || translations.id;
  const steps = language === 'en' ? processStepsEn : language === 'de' ? processStepsDe : processStepsId;

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
              <div className="process-icon-wrapper">
                <span className="process-number">{step.id}</span>
                {step.icon}
              </div>
              <div className="process-content">
                <h3 className="process-title">{step.title}</h3>
                <span className="process-time">{step.time}</span>
                <p className="process-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

};

export default Process;
