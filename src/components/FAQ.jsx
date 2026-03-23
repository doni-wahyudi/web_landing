import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Berapa lama proses pembuatan website?",
      answer: "Waktu pengerjaan bervariasi tergantung kompleksitas website. Untuk paket Basic dan Profesional biasanya memakan waktu 3-7 hari kerja setelah seluruh materi (teks, foto, logo) kami terima. Untuk sistem Custom, biasanya 2-4 minggu."
    },
    {
      question: "Apakah saya harus menyiapkan hosting & domain sendiri?",
      answer: "Tidak perlu. Seluruh paket kami sudah termasuk gratis Domain (.com, .id, atau .co.id) dan Hosting berkecepatan tinggi selama 1 tahun pertama."
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
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Pertanyaan Umum <span className="text-gradient">(FAQ)</span></h2>
          <p className="section-subtitle">
            Beberapa pertanyaan yang sering diajukan klien sebelum memutuskan untuk menggunakan jasa kami.
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
