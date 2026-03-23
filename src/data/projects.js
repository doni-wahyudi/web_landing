import putrakaryaImg from '../assets/portfolio/putrakarya.png';
import aurobarbersImg from '../assets/portfolio/aurobarbers.png';
import bimbelWebImg from '../assets/portfolio/bimbel_web.png';

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
    url: "https://doni-wahyudi.github.io/bimbel_web/",
    image: bimbelWebImg,
    challenge: "Lembaga bimbingan belajar yang membutuhkan landing page dengan konversi tinggi untuk program penerimaan siswa baru.",
    solution: "Desain UI modern yang menonjolkan fitur unggulan, testimoni, dan bagian CTA yang kuat untuk pendaftaran kelas langsung.",
    techStack: ["React", "Framer Motion", "Tailwind CSS"]
  }
];
