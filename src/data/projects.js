import putrakaryaImg from '../assets/portfolio/putrakarya.png';
import aurobarbersImg from '../assets/portfolio/aurobarbers.png';
import bimbelWebImg from '../assets/portfolio/bimbel_web.png';
import clinicImg from '../assets/portfolio/clinic.png';
import rentalImg from '../assets/portfolio/rental.png';
import bakeryImg from '../assets/portfolio/bakery.png';

export const projects = [
  {
    id: 1,
    title: "Putra Karya Pallet",
    category: "Company Profile & B2B",
    url: "https://putrakaryapallet.com/",
    image: putrakaryaImg,
    challenge: "Klien membutuhkan profil perusahaan profesional untuk menjangkau pasar B2B berskala nasional dan internasional yang kredibel.",
    solution: "Kami merancang website profesional dengan tata letak yang menampilkan kapasitas pabrik, katalog produk berstandar ekspor, dan form penawaran yang terintegrasi (Call-to-Action).",
    techStack: ["React", "Custom CSS", "Vite", "SEO Optimization"]
  },
  {
    id: 2,
    title: "Auro Barbers",
    category: "Business & Booking Page",
    url: "https://aurobarbers.web.id/",
    image: aurobarbersImg,
    challenge: "Barbershop premium yang kesulitan mengatur antrean pelanggan dan ingin membangun merek yang modern dan maskulin di dunia digital.",
    solution: "Website dengan desain estetika gelap, elegan, dan informatif yang menampilkan layanan, harga, dan fitur pemesanan / integrasi kontak secara mudah.",
    techStack: ["HTML5/CSS3", "JavaScript", "Mobile-First Design"]
  },
  {
    id: 3,
    title: "Bimbel Web",
    category: "Education Landing Page",
    url: "https://aurotechbimbel.my.id/",
    image: bimbelWebImg,
    challenge: "Lembaga bimbingan belajar yang membutuhkan landing page dengan konversi tinggi untuk program penerimaan siswa baru.",
    solution: "Desain UI modern yang menonjolkan fitur unggulan, testimoni, dan bagian CTA yang kuat untuk pendaftaran kelas langsung.",
    techStack: ["React", "Framer Motion", "Tailwind CSS"]
  },
  {
    id: 4,
    title: "KlinikSehat",
    category: "Healthcare & Reservation",
    url: "https://aurotechklinik.my.id/",
    image: clinicImg,
    challenge: "Pasien seringkali kesulitan menemukan fasilitas kesehatan modern yang menyediakan informasi dokter spesialis yang transparan dan proses booking yang cepat.",
    solution: "Kami membangun portal kesehatan dengan sistem reservasi online terintegrasi, profil dokter lengkap, dan integrasi WhatsApp untuk dukungan pasien instan.",
    techStack: ["React", "Bootstrap", "Health-Tech SEO", "Responsive Design"]
  },
  {
    id: 5,
    title: "RentalKu",
    category: "Transportation & Car Rental",
    url: "https://doni-wahyudi.github.io/web_rental/",
    image: rentalImg,
    challenge: "Pasar penyewaan mobil yang terfragmentasi seringkali menyulitkan pelanggan dalam menemukan layanan yang terpercaya dengan harga transparan dan kendaraan yang terawat.",
    solution: "Landing page konversi tinggi dengan katalog armada yang elegan, sistem booking WhatsApp sekali klik, dan detail layanan profesional untuk kebutuhan harian maupun acara khusus.",
    techStack: ["Vite", "React", "Modern Fleet UI", "Mobile-First Design"]
  },
  {
    id: 6,
    title: "Sweet Delights Bakery",
    category: "Food & Beverage",
    url: "https://doni-wahyudi.github.io/web_bakery/",
    image: bakeryImg,
    challenge: "Toko kue lokal yang memiliki produk estetik seringkali kesulitan menampilkan visual produk mereka secara digital sehingga melewatkan potensi pesanan online.",
    solution: "Desain web yang mengutamakan visual produk (appetizing design) with katalog menu yang terorganisir dan CTA pemesanan langsung yang memudahkan konversi pelanggan.",
    techStack: ["React", "High-Fidelity Imagery", "Animated UI", "F&B Marketing"]
  }
];
