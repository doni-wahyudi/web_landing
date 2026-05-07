import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { language } = useLanguage();

  const faqsId = [
    {
      question: "Berapa lama proses pembuatan website?",
      answer: "Waktu pengerjaan bervariasi tergantung kompleksitas website. Untuk paket Basic dan Profesional biasanya memakan waktu 3-7 hari kerja setelah seluruh materi (teks, foto, logo) kami terima. Untuk sistem Custom, biasanya 2-4 minggu."
    },
    {
      question: "Apakah saya harus menyiapkan hosting & domain sendiri?",
      answer: "Tidak perlu. Seluruh paket kami sudah termasuk gratis Domain (.com) dan Hosting berkecepatan tinggi selama 1 tahun pertama."
    },
    {
      question: "Bagaimana jika saya ingin melakukan perubahan setelah website selesai?",
      answer: "Kami memberikan garansi revisi sesuai dengan paket yang Anda pilih. Selain itu, kami menggunakan sistem CMS yang ramah pengguna, sehingga Anda pun dapat mengubah teks atau gambar dengan mudah nantinya."
    },
    {
      question: "Apakah website saya akan muncul di Google?",
      answer: "Ya, kami menerapkan praktik on-page SEO sejak awal pengembangan. Kami mendesain struktur website agar mudah dibaca oleh mesin telusur (Google) sehingga performa indeksing lebih optimal."
    },
    {
      question: "Bagaimana sistem pembayaran jasanya?",
      answer: "Pembayaran dilakukan dengan sistem Down Payment (DP) 50% di awal sebelum project dimulai, dan pelunasan 50% setelah website selesai dibangun dan siap dipublikasi sesuai persetujuan."
    },
    {
      question: "Siapa yang memiliki domain dan hosting?",
      answer: "Anda adalah pemilik penuh atas domain dan hosting. Kami mendaftarkannya atas nama Anda atau bisnis Anda. Jika di masa depan Anda ingin mengelola sendiri, kami akan memberikan semua aksesnya."
    },
    {
      question: "Apakah ada garansi purna jual / support setelah launch?",
      answer: "Tentu. Setiap paket sudah termasuk garansi perbaikan bug dan support teknis selama 1 bulan setelah peluncuran. Kami juga menyediakan paket maintenance bulanan jika Anda membutuhkan bantuan pengelolaan konten jangka panjang."
    },
    {
      question: "Apakah saya bisa update konten sendiri?",
      answer: "Sangat bisa! Kami membangun website dengan sistem CMS (Content Management System) yang mudah dipelajari. Kami juga akan memberikan panduan atau sesi training singkat cara menggunakannya."
    },
    {
      question: "Teknologi apa yang digunakan?",
      answer: "Kami menggunakan teknologi modern standar industri terkini seperti React.js, Next.js, atau WordPress kustom (tergantung kebutuhan proyek) untuk memastikan website Anda cepat, aman, dan mudah di-scale."
    }
  ];

  const faqsEn = [
    {
      question: "How long does the website creation process take?",
      answer: "The processing time varies depending on the complexity of the website. For the Basic and Professional packages, it usually takes 3-7 working days after we receive all materials (text, photos, logo). For Custom systems, it usually takes 2-4 weeks."
    },
    {
      question: "Do I need to prepare my own hosting & domain?",
      answer: "No need. All our packages include a free Domain (.com) and high-speed Hosting for the first 1 year."
    },
    {
      question: "What if I want to make changes after the website is finished?",
      answer: "We provide revision guarantees according to the package you choose. In addition, we use a user-friendly CMS system, so you can easily change text or images later."
    },
    {
      question: "Will my website appear on Google?",
      answer: "Yes, we implement on-page SEO practices from the beginning of development. We design the website structure to be easily read by search engines (Google) so indexing performance is more optimal."
    },
    {
      question: "What is the payment system for the service?",
      answer: "Payment is made with a 50% Down Payment (DP) system at the beginning before the project starts, and a 50% payoff after the website is built and ready to be published as agreed."
    },
    {
      question: "Who owns the domain and hosting?",
      answer: "You are the full owner of the domain and hosting. We register them under your name or business. If you wish to manage them yourself in the future, we will hand over all access credentials."
    },
    {
      question: "Is there an after-sales guarantee / support after launch?",
      answer: "Certainly. Every package includes a bug fix guarantee and technical support for 1 month after launch. We also provide monthly maintenance packages if you need long-term content management assistance."
    },
    {
      question: "Can I update the content myself?",
      answer: "Absolutely! We build websites with an easy-to-learn CMS (Content Management System). We will also provide a guide or a short training session on how to use it."
    },
    {
      question: "What technology is used?",
      answer: "We use modern, industry-standard technologies such as React.js, Next.js, or custom WordPress (depending on project needs) to ensure your website is fast, secure, and highly scalable."
    }
  ];

  const translations = {
    id: {
      title: "Pertanyaan Umum",
      titleGradient: "(FAQ)",
      subtitle: "Beberapa pertanyaan yang sering diajukan klien sebelum memutuskan untuk menggunakan jasa kami."
    },
    en: {
      title: "Frequently Asked",
      titleGradient: "Questions",
      subtitle: "Some questions clients frequently ask before deciding to use our services."
    }
  };

  const faqs = language === 'en' ? faqsEn : faqsId;
  const t = translations[language] || translations.id;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Schema.org FAQPage JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="section faq">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">{t.title} <span className="text-gradient">{t.titleGradient}</span></h2>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item glass ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <FiChevronDown className="faq-icon" />
              </button>

              <div
                className="faq-answer-wrapper"
                style={{
                  maxHeight: activeIndex === index ? '500px' : '0',
                  opacity: activeIndex === index ? 1 : 0
                }}
              >
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

