import putrakaryaImg from '../assets/portfolio/putrakarya.webp';
import aurobarbersImg from '../assets/portfolio/aurobarbers.webp';
import bimbelWebImg from '../assets/portfolio/bimbel_web.webp';
import clinicImg from '../assets/portfolio/clinic.webp';
import rentalImg from '../assets/portfolio/rental.webp';
import bakeryImg from '../assets/portfolio/bakery.webp';
import glowmartImg from '../assets/portfolio/glowmart.webp';

export const projects = [
  {
    id: 1,
    title: "Putra Karya Pallet",
    category: {
      id: "Profil Perusahaan & B2B",
      en: "Company Profile & B2B"
    },
    url: "https://putrakaryapallet.com/",
    image: putrakaryaImg,
    challenge: {
      id: "Klien membutuhkan profil perusahaan profesional untuk menjangkau pasar B2B berskala nasional dan internasional yang kredibel.",
      en: "The client needed a professional company profile to reach a credible national and international B2B market."
    },
    solution: {
      id: "Kami merancang website profesional dengan tata letak yang menampilkan kapasitas pabrik, katalog produk berstandar ekspor, dan form penawaran yang terintegrasi (Call-to-Action).",
      en: "We designed a professional website with a layout showcasing factory capacity, export-standard product catalogs, and an integrated request-for-quote form (Call-to-Action)."
    },
techStack: ["React", "Custom CSS", "Vite", "SEO Optimization"]
  },
  {
    id: 2,
    title: "Auro Barbers",
    category: {
      id: "Halaman Bisnis & Pemesanan",
      en: "Business & Booking Page"
    },
    url: "https://aurobarbers.web.id/",
    image: aurobarbersImg,
    challenge: {
      id: "Barbershop premium yang kesulitan mengatur antrean pelanggan dan ingin membangun merek yang modern dan maskulin di dunia digital.",
      en: "A premium barbershop struggling to manage customer queues and wanting to build a modern, masculine brand in the digital world."
    },
    solution: {
      id: "Website dengan desain estetika gelap, elegan, dan informatif yang menampilkan layanan, harga, dan fitur pemesanan / integrasi kontak secara mudah.",
      en: "A website with a dark, elegant, and informative aesthetic design showcasing services, pricing, and easy booking/contact integration features."
    },
    techStack: ["HTML5/CSS3", "JavaScript", "Mobile-First Design"]
  },
  {
    id: 3,
    title: "Bimbel Web",
    category: {
      id: "Landing Page Pendidikan",
      en: "Education Landing Page"
    },
    url: "https://aurotechbimbel.my.id/",
    image: bimbelWebImg,
    challenge: {
      id: "Lembaga bimbingan belajar yang membutuhkan landing page dengan konversi tinggi untuk program penerimaan siswa baru.",
      en: "A tutoring institution requiring a high-conversion landing page for their new student admission program."
    },
    solution: {
      id: "Desain UI modern yang menonjolkan fitur unggulan, testimoni, dan bagian CTA yang kuat untuk pendaftaran kelas langsung.",
      en: "A modern UI design highlighting key features, testimonials, and a strong CTA section for direct class registration."
    },
    techStack: ["React", "Framer Motion", "Tailwind CSS"]
  },
  {
    id: 4,
    title: "KlinikSehat",
    category: {
      id: "Kesehatan & Reservasi",
      en: "Healthcare & Reservation"
    },
    url: "https://aurotechklinik.my.id/",
    image: clinicImg,
    challenge: {
      id: "Pasien seringkali kesulitan menemukan fasilitas kesehatan modern yang menyediakan informasi dokter spesialis yang transparan dan proses booking yang cepat.",
      en: "Patients often struggle to find modern healthcare facilities providing transparent specialist doctor information and a fast booking process."
    },
    solution: {
      id: "Kami membangun portal kesehatan dengan sistem reservasi online terintegrasi, profil dokter lengkap, dan integrasi WhatsApp untuk dukungan pasien instan.",
      en: "We built a healthcare portal with an integrated online reservation system, comprehensive doctor profiles, and WhatsApp integration for instant patient support."
    },
    techStack: ["React", "Bootstrap", "Health-Tech SEO", "Responsive Design"]
  },
  {
    id: 5,
    title: "RentalKu",
    category: {
      id: "Transportasi & Rental Mobil",
      en: "Transportation & Car Rental"
    },
    url: "https://aurotechrental.my.id/",
    image: rentalImg,
    challenge: {
      id: "Pasar penyewaan mobil yang terfragmentasi seringkali menyulitkan pelanggan dalam menemukan layanan yang terpercaya dengan harga transparan dan kendaraan yang terawat.",
      en: "A fragmented car rental market often makes it difficult for customers to find trusted services with transparent pricing and well-maintained vehicles."
    },
    solution: {
      id: "Landing page konversi tinggi dengan katalog armada yang elegan, sistem booking WhatsApp sekali klik, dan detail layanan profesional untuk kebutuhan harian maupun acara khusus.",
      en: "A high-conversion landing page with an elegant fleet catalog, one-click WhatsApp booking system, and professional service details for daily needs or special events."
    },
    techStack: ["Vite", "React", "Modern Fleet UI", "Mobile-First Design"]
  },
  {
    id: 6,
    title: "Sweet Delights Bakery",
    category: {
      id: "Makanan & Minuman",
      en: "Food & Beverage"
    },
    url: "https://aurotechbakery.my.id/",
    image: bakeryImg,
    challenge: {
      id: "Toko kue lokal yang memiliki produk estetik seringkali kesulitan menampilkan visual produk mereka secara digital sehingga melewatkan potensi pesanan online.",
      en: "A local bakery with aesthetic products often struggles to display product visuals digitally, missing out on potential online orders."
    },
    solution: {
      id: "Desain web yang mengutamakan visual produk (appetizing design) with katalog menu yang terorganisir dan CTA pemesanan langsung yang memudahkan konversi pelanggan.",
      en: "A web design prioritizing product visuals (appetizing design) with an organized menu catalog and direct ordering CTAs for easy customer conversion."
    },
    techStack: ["React", "High-Fidelity Imagery", "Animated UI", "F&B Marketing"]
  },
  {
    id: 7,
    title: "GlowMart",
    category: {
      id: "E-Commerce & Kecantikan",
      en: "E-Commerce & Beauty"
    },
    url: "https://doni-wahyudi.github.io/web_beauty_commerce/",
    image: glowmartImg,
    challenge: {
      id: "Platform kecantikan yang membutuhkan antarmuka e-commerce yang responsif dan estetis untuk meningkatkan pengalaman belanja pelanggan di berbagai perangkat.",
      en: "A beauty platform requiring a responsive and aesthetic e-commerce interface to enhance the customer shopping experience across various devices."
    },
    solution: {
      id: "Kami mengembangkan website e-commerce modern dengan desain elegan, katalog produk yang tertata, dan navigasi yang dioptimalkan untuk mobile.",
      en: "We developed a modern e-commerce website with an elegant design, organized product catalog, and mobile-optimized navigation."
    },
    techStack: ["HTML5/CSS3", "JavaScript", "Vite", "Mobile-First Design"]
  }
];
