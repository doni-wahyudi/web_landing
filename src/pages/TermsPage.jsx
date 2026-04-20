import SEO from '../components/SEO';

const TermsPage = () => {
  return (
    <div className="terms-page pt-32 pb-20">
      <SEO title="Syarat & Ketentuan" description="Syarat dan ketentuan layanan Aurotech Digital Agency." />
      <div className="container max-w-4xl">
        <div className="section-header text-center mb-16">
          <h1 className="h1 animate-entrance">Syarat & <span className="text-gradient">Ketentuan</span></h1>
          <p className="text-muted animate-entrance delay-100">Terakhir diperbarui: 20 April 2026</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-3xl animate-entrance delay-200 prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">1. Penerimaan Ketentuan</h2>
            <p className="text-muted leading-relaxed">
              Dengan mengakses dan menggunakan layanan Aurotech, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui bagian apa pun dari ketentuan ini, Anda tidak diperbolehkan menggunakan layanan kami.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">2. Ruang Lingkup Layanan</h2>
            <p className="text-muted leading-relaxed">
              Aurotech menyediakan jasa pembuatan website, desain UI/UX, dan optimasi SEO. Detail spesifik dari layanan akan diuraikan dalam proposal atau invoice yang disepakati bersama.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">3. Hak Kekayaan Intelektual</h2>
            <p className="text-muted leading-relaxed">
              Setelah pembayaran penuh diterima, hak milik atas desain akhir dan kode website akan dialihkan kepada klien. Namun, Aurotech berhak untuk menampilkan karya tersebut dalam portfolio kami untuk tujuan promosi, kecuali disepakati sebaliknya secara tertulis.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">4. Kewajiban Klien</h2>
            <p className="text-muted leading-relaxed">
              Klien bertanggung jawab untuk menyediakan konten (teks, gambar, logo) yang diperlukan tepat waktu. Keterlambatan dalam penyediaan konten dapat menyebabkan penundaan jadwal peluncuran website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">5. Pembatalan & Pengembalian Dana</h2>
            <p className="text-muted leading-relaxed">
              Kebijakan pengembalian dana akan didasarkan pada tahap pengerjaan yang telah diselesaikan. Biaya setup awal atau deposit biasanya bersifat non-refundable (tidak dapat dikembalikan) karena mencakup biaya riset dan perencanaan awal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Batasan Tanggung Jawab</h2>
            <p className="text-muted leading-relaxed">
              Aurotech tidak bertanggung jawab atas kerugian tidak langsung atau kehilangan data yang disebabkan oleh penggunaan produk kami setelah masa garansi atau akibat intervensi pihak ketiga yang tidak sah.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
