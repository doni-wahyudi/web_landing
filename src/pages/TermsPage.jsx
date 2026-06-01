import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const TermsPage = () => {
  const { language } = useLanguage();

  const translations = {
    id: {
      seoTitle: "Syarat & Ketentuan",
      seoDesc: "Syarat dan ketentuan layanan Aurotech Digital Agency.",
      title: "Syarat &",
      titleGradient: "Ketentuan",
      updated: "Terakhir diperbarui: 20 April 2026",
      sec1Title: "1. Penerimaan Ketentuan",
      sec1Text: "Dengan mengakses dan menggunakan layanan Aurotech, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui bagian apa pun dari ketentuan ini, Anda tidak diperbolehkan menggunakan layanan kami.",
      sec2Title: "2. Ruang Lingkup Layanan",
      sec2Text: "Aurotech menyediakan jasa pembuatan website, desain UI/UX, dan optimasi SEO. Detail spesifik dari layanan akan diuraikan dalam proposal atau invoice yang disepakati bersama.",
      sec3Title: "3. Hak Kekayaan Intelektual",
      sec3Text: "Setelah pembayaran penuh diterima, hak milik atas desain akhir dan kode website akan dialihkan kepada klien. Namun, Aurotech berhak untuk menampilkan karya tersebut dalam portfolio kami untuk tujuan promosi, kecuali disepakati sebaliknya secara tertulis.",
      sec4Title: "4. Kewajiban Klien",
      sec4Text: "Klien bertanggung jawab untuk menyediakan konten (teks, gambar, logo) yang diperlukan tepat waktu. Keterlambatan dalam penyediaan konten dapat menyebabkan penundaan jadwal peluncuran website.",
      sec5Title: "5. Pembatalan & Pengembalian Dana",
      sec5Text: "Kebijakan pengembalian dana akan didasarkan pada tahap pengerjaan yang telah diselesaikan. Biaya setup awal atau deposit biasanya bersifat non-refundable (tidak dapat dikembalikan) karena mencakup biaya riset dan perencanaan awal.",
      sec6Title: "6. Batasan Tanggung Jawab",
      sec6Text: "Aurotech tidak bertanggung jawab atas kerugian tidak langsung atau kehilangan data yang disebabkan oleh penggunaan produk kami setelah masa garansi atau akibat intervensi pihak ketiga yang tidak sah."
    },
    en: {
      seoTitle: "Terms & Conditions",
      seoDesc: "Terms and conditions of service at Aurotech Digital Agency.",
      title: "Terms &",
      titleGradient: "Conditions",
      updated: "Last updated: April 20, 2026",
      sec1Title: "1. Acceptance of Terms",
      sec1Text: "By accessing and using Aurotech services, you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, you are not permitted to use our services.",
      sec2Title: "2. Scope of Services",
      sec2Text: "Aurotech provides website creation, UI/UX design, and SEO optimization services. Specific details of the service will be outlined in a mutually agreed proposal or invoice.",
      sec3Title: "3. Intellectual Property Rights",
      sec3Text: "Upon receipt of full payment, ownership of the final design and website code will be transferred to the client. However, Aurotech reserves the right to display the work in our portfolio for promotional purposes, unless agreed otherwise in writing.",
      sec4Title: "4. Client Obligations",
      sec4Text: "The client is responsible for providing necessary content (text, images, logos) in a timely manner. Delays in content provision may lead to delays in the website launch schedule.",
      sec5Title: "5. Cancellation & Refunds",
      sec5Text: "The refund policy will be based on the completed stages of work. Initial setup fees or deposits are generally non-refundable as they cover initial research and planning costs.",
      sec6Title: "6. Limitation of Liability",
      sec6Text: "Aurotech is not liable for indirect losses or data loss caused by using our products after the warranty period or due to unauthorized third-party intervention."
    },
    de: {
      seoTitle: "Allgemeine Geschäftsbedingungen",
      seoDesc: "Allgemeine Geschäftsbedingungen für die Dienstleistungen der Aurotech Digital Agency.",
      title: "Allgemeine",
      titleGradient: "Geschäftsbedingungen",
      updated: "Zuletzt aktualisiert: 20. April 2026",
      sec1Title: "1. Anerkennung der Bedingungen",
      sec1Text: "Mit dem Zugriff auf und der Nutzung der Dienste von Aurotech erklären Sie sich mit diesen Allgemeinen Geschäftsbedingungen einverstanden. Wenn Sie einem Teil dieser Bedingungen nicht zustimmen, ist Ihnen die Nutzung unserer Dienste nicht gestattet.",
      sec2Title: "2. Leistungsumfang",
      sec2Text: "Aurotech bietet Dienstleistungen im Bereich Website-Erstellung, UI/UX-Design und SEO-Optimierung an. Spezifische Details der Dienstleistung werden in einem beidseitig vereinbarten Angebot oder einer Rechnung dargelegt.",
      sec3Title: "3. Rechte an geistigem Eigentum",
      sec3Text: "Nach Erhalt der vollständigen Zahlung geht das Eigentum am endgültigen Design und Website-Code auf den Kunden über. Aurotech behält sich jedoch das Recht vor, das Werk zu Werbezwecken in unserem Portfolio zu präsentieren, sofern schriftlich nichts anderes vereinbart wurde.",
      sec4Title: "4. Pflichten des Kunden",
      sec4Text: "Der Kunde ist dafür verantwortlich, die erforderlichen Inhalte (Texte, Bilder, Logos) rechtzeitig bereitzustellen. Verzögerungen bei der Bereitstellung von Inhalten können zu Verzögerungen im Zeitplan für den Website-Launch führen.",
      sec5Title: "5. Stornierung & Rückerstattung",
      sec5Text: "Die Rückerstattungsrichtlinie basiert auf den abgeschlossenen Phasen der Arbeit. Erstmalige Einrichtungsgebühren oder Anzahlungen sind in der Regel nicht erstattungsfähig, da sie die anfänglichen Recherche- und Planungskosten abdecken.",
      sec6Title: "6. Haftungsbeschränkung",
      sec6Text: "Aurotech haftet nicht für indirekte Schäden oder Datenverlust, die durch die Nutzung unserer Produkte nach Ablauf der Garantiezeit oder durch unbefugte Eingriffe Dritter entstehen."
    }
  };

  const t = translations[language] || translations.id;

  return (
    <div className="terms-page pt-32 pb-20">
      <SEO title={t.seoTitle} description={t.seoDesc} />
      <div className="container max-w-4xl">
        <div className="section-header text-center mb-16">
          <h1 className="h1 animate-entrance">{t.title} <span className="text-gradient">{t.titleGradient}</span></h1>
          <p className="text-muted animate-entrance delay-100">{t.updated}</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-3xl animate-entrance delay-200 prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t.sec1Title}</h2>
            <p className="text-muted leading-relaxed">
              {t.sec1Text}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t.sec2Title}</h2>
            <p className="text-muted leading-relaxed">
              {t.sec2Text}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t.sec3Title}</h2>
            <p className="text-muted leading-relaxed">
              {t.sec3Text}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t.sec4Title}</h2>
            <p className="text-muted leading-relaxed">
              {t.sec4Text}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t.sec5Title}</h2>
            <p className="text-muted leading-relaxed">
              {t.sec5Text}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">{t.sec6Title}</h2>
            <p className="text-muted leading-relaxed">
              {t.sec6Text}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

