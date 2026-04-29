import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const PrivacyPage = () => {
  const { language } = useLanguage();

  const translations = {
    id: {
      seoTitle: "Kebijakan Privasi",
      seoDesc: "Kebijakan privasi data di Aurotech Digital Agency.",
      title: "Kebijakan",
      titleGradient: "Privasi",
      updated: "Terakhir diperbarui: 20 April 2026",
      sec1Title: "1. Informasi yang Kami Kumpulkan",
      sec1Text: "Kami mengumpulkan informasi yang Anda berikan langsung saat Anda menghubungi kami melalui WhatsApp atau formulir lainnya, termasuk namun tidak terbatas pada:",
      sec1Item1: "Nama dan detail kontak (nomor telepon, email).",
      sec1Item2: "Detail proyek dan kebutuhan bisnis.",
      sec1Item3: "Aset media yang diberikan untuk materi website.",
      sec2Title: "2. Cara Kami Menggunakan Informasi",
      sec2Text: "Informasi yang Anda berikan digunakan untuk:",
      sec2Item1: "Menyediakan layanan konsultasi dan penawaran harga.",
      sec2Item2: "Pengerjaan proyek website dan integrasi fitur.",
      sec2Item3: "Komunikasi terkait status proyek dan dukungan teknis.",
      sec2Item4: "Mengirimkan informasi pembaruan atau penawaran layanan baru.",
      sec3Title: "3. Keamanan Data",
      sec3Text: "Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi data pribadi klien dari akses yang tidak sah, pengungkapan, atau kerusakan. Data pendaftaran domain dan hosting akan dikelola secara aman sesuai dengan protokol provider terkait.",
      sec4Title: "4. Berbagi Informasi dengan Pihak Ketiga",
      sec4Text: "Kami tidak akan menjual data Anda kepada pihak luar. Kami hanya berbagi data dengan mitra pihak ketiga yang diperlukan untuk penyediaan layanan (seperti registrar domain atau provider hosting) yang memiliki kebijakan privasi serupa.",
      sec5Title: "5. Cookie dan Analitik",
      sec5Text: "Website kami mungkin menggunakan cookie untuk meningkatkan pengalaman navigasi dan menganalisis trafik menggunakan layanan pihak ketiga seperti Google Analytics untuk keperluan evaluasi internal.",
      sec6Title: "6. Hak Anda",
      sec6Text: "Anda berhak untuk meminta akses ke informasi pribadi yang kami simpan, meminta koreksi data yang tidak akurat, atau meminta penghapusan data Anda dari sistem komunikasi pemasaran kami kapan saja."
    },
    en: {
      seoTitle: "Privacy Policy",
      seoDesc: "Data privacy policy at Aurotech Digital Agency.",
      title: "Privacy",
      titleGradient: "Policy",
      updated: "Last updated: April 20, 2026",
      sec1Title: "1. Information We Collect",
      sec1Text: "We collect information you provide directly when you contact us via WhatsApp or other forms, including but not limited to:",
      sec1Item1: "Name and contact details (phone number, email).",
      sec1Item2: "Project details and business needs.",
      sec1Item3: "Media assets provided for website materials.",
      sec2Title: "2. How We Use Information",
      sec2Text: "The information you provide is used to:",
      sec2Item1: "Provide consultation services and price quotes.",
      sec2Item2: "Execute website projects and feature integration.",
      sec2Item3: "Communicate regarding project status and technical support.",
      sec2Item4: "Send update information or new service offers.",
      sec3Title: "3. Data Security",
      sec3Text: "We implement reasonable technical and organizational security measures to protect client personal data from unauthorized access, disclosure, or damage. Domain and hosting registration data will be managed securely in accordance with relevant provider protocols.",
      sec4Title: "4. Sharing Information with Third Parties",
      sec4Text: "We will not sell your data to outsiders. We only share data with third-party partners required for service provision (such as domain registrars or hosting providers) who have similar privacy policies.",
      sec5Title: "5. Cookies and Analytics",
      sec5Text: "Our website may use cookies to improve navigation experience and analyze traffic using third-party services such as Google Analytics for internal evaluation purposes.",
      sec6Title: "6. Your Rights",
      sec6Text: "You have the right to request access to the personal information we hold, request correction of inaccurate data, or request deletion of your data from our marketing communication systems at any time."
    }
  };

  const t = translations[language] || translations.id;

  return (
    <div className="privacy-page pt-32 pb-20">
      <SEO title={t.seoTitle} description={t.seoDesc} />
      <div className="container max-w-4xl">
        <div className="section-header text-center mb-16">
          <h1 className="h1 animate-entrance">{language === 'id' ? <>{t.title} <span className="text-gradient">{t.titleGradient}</span></> : <><span className="text-gradient">{t.title}</span> {t.titleGradient}</>}</h1>
          <p className="text-muted animate-entrance delay-100">{t.updated}</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-3xl animate-entrance delay-200 prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t.sec1Title}</h2>
            <p className="text-muted leading-relaxed mb-4">
              {t.sec1Text}
            </p>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>{t.sec1Item1}</li>
              <li>{t.sec1Item2}</li>
              <li>{t.sec1Item3}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{t.sec2Title}</h2>
            <p className="text-muted leading-relaxed mb-4">
              {t.sec2Text}
            </p>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>{t.sec2Item1}</li>
              <li>{t.sec2Item2}</li>
              <li>{t.sec2Item3}</li>
              <li>{t.sec2Item4}</li>
            </ul>
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

export default PrivacyPage;

