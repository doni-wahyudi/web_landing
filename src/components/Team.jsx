import { useLanguage } from '../context/LanguageContext';
import './Team.css';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import doniImg from '../assets/doni.png';
import ridhoImg from '../assets/ridho.png';
import feniImg from '../assets/feni.png';

const Team = () => {
  const { language } = useLanguage();

  const teamMembersId = [
    {
      id: 1,
      name: "Doni Wahyudi",
      role: "Founder & Lead Developer",
      bio: "Lead Developer & Strategic Visionary dengan lebih dari 5 tahun pengalaman dalam membangun solusi digital premium.",
      image: doniImg,
      scale: 1.4,
      objectPosition: "center 22%",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 2,
      name: "Ridho Saputra",
      role: "Founder & Project Manager",
      bio: "Pakar dalam manajemen proyek strategis dan memastikan pengiriman produk digital yang berkualitas tinggi dan tepat waktu.",
      image: ridhoImg,
      scale: 1.4,
      objectPosition: "center 12%",
      social: {
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Feni Refita",
      role: "Director of Operations & Business Development",
      bio: "Bertanggung jawab atas efisiensi operasional dan pertumbuhan kemitraan strategis Aurotech.",
      image: feniImg,
      scale: 1.1,
      objectPosition: "center 15%",
      social: {
        linkedin: "#"
      }
    }
  ];

  const teamMembersEn = [
    {
      id: 1,
      name: "Doni Wahyudi",
      role: "Founder & Lead Developer",
      bio: "Lead Developer & Strategic Visionary with over 5 years of experience in building premium digital solutions.",
      image: doniImg,
      scale: 1.4,
      objectPosition: "center 22%",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 2,
      name: "Ridho Saputra",
      role: "Founder & Project Manager",
      bio: "Expert in strategic project management, ensuring high-quality and timely delivery of digital products.",
      image: ridhoImg,
      scale: 1.4,
      objectPosition: "center 12%",
      social: {
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Feni Refita",
      role: "Director of Operations & Business Development",
      bio: "Responsible for operational efficiency and strategic partnership growth at Aurotech.",
      image: feniImg,
      scale: 1.1,
      objectPosition: "center 15%",
      social: {
        linkedin: "#"
      }
    }
  ];

  const translations = {
    id: {
      title: "Tim",
      titleGradient: "Kami",
      subtitle: "Profesional di balik kesuksesan proyek digital Anda."
    },
    en: {
      title: "Our",
      titleGradient: "Team",
      subtitle: "The professionals behind the success of your digital projects."
    }
  };

  const t = translations[language] || translations.id;
  const teamMembers = language === 'en' ? teamMembersEn : teamMembersId;

  return (
    <section className="section team-section bg-primary">
      <div className="container">
        <div className="section-header text-center animate-entrance">
          <h2 className="section-title">{t.title} <span className="text-gradient">{t.titleGradient}</span></h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card glass animate-fade-in">
              <div className="team-image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                  loading="lazy"
                  style={{
                    objectPosition: member.objectPosition || 'center 0%',
                    transform: `scale(${member.scale || 1.4})`
                  }}
                />
              </div>
              <div className="team-content">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role text-gradient">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
