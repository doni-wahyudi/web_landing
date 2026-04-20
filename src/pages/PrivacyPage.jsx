import SEO from '../components/SEO';

const PrivacyPage = () => {
  return (
    <div className="privacy-page pt-32 pb-20">
      <SEO title="Kebijakan Privasi" description="Kebijakan privasi data di Aurotech Digital Agency." />
      <div className="container max-w-4xl">
        <div className="section-header text-center mb-16">
          <h1 className="h1 animate-entrance">Kebijakan <span className="text-gradient">Privasi</span></h1>
          <p className="text-muted animate-entrance delay-100">Terakhir diperbarui: 20 April 2026</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-3xl animate-entrance delay-200 prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-muted leading-relaxed mb-4">
              Kami mengumpulkan informasi yang Anda berikan langsung saat Anda menghubungi kami melalui WhatsApp atau formulir lainnya, termasuk namun tidak terbatas pada:
            </p>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>Nama dan detail kontak (nomor telepon, email).</li>
              <li>Detail proyek dan kebutuhan bisnis.</li>
              <li>Aset media yang diberikan untuk materi website.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">2. Cara Kami Menggunakan Informasi</h2>
            <p className="text-muted leading-relaxed mb-4">
              Informasi yang Anda berikan digunakan untuk:
            </p>
            <ul className="list-disc pl-6 text-muted space-y-2">
              <li>Menyediakan layanan konsultasi dan penawaran harga.</li>
              <li>Pengerjaan proyek website dan integrasi fitur.</li>
              <li>Komunikasi terkait status proyek dan dukungan teknis.</li>
              <li>Mengirimkan informasi pembaruan atau penawaran layanan baru.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">3. Keamanan Data</h2>
            <p className="text-muted leading-relaxed">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang wajar untuk melindungi data pribadi klien dari akses yang tidak sah, pengungkapan, atau kerusakan. Data pendaftaran domain dan hosting akan dikelola secara aman sesuai dengan protokol provider terkait.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">4. Berbagi Informasi dengan Pihak Ketiga</h2>
            <p className="text-muted leading-relaxed">
              Kami tidak akan menjual data Anda kepada pihak luar. Kami hanya berbagi data dengan mitra pihak ketiga yang diperlukan untuk penyediaan layanan (seperti registrar domain atau provider hosting) yang memiliki kebijakan privasi serupa.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">5. Cookie dan Analitik</h2>
            <p className="text-muted leading-relaxed">
              Website kami mungkin menggunakan cookie untuk meningkatkan pengalaman navigasi dan menganalisis trafik menggunakan layanan pihak ketiga seperti Google Analytics untuk keperluan evaluasi internal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Hak Anda</h2>
            <p className="text-muted leading-relaxed">
              Anda berhak untuk meminta akses ke informasi pribadi yang kami simpan, meminta koreksi data yang tidak akurat, atau meminta penghapusan data Anda dari sistem komunikasi pemasaran kami kapan saja.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
