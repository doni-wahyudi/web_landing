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
    title: "Bimbel Web",
    category: {
      id: "Landing Page Pendidikan",
      en: "Education Landing Page"
    },
    url: "https://aurotechbimbel.my.id/",
    image: bimbelWebImg,
    challenge: {
      id: "Lembaga bimbingan belajar yang membutuhkan platform digital profesional untuk program pendaftaran siswa baru dan tes diagnostik.",
      en: "A tutoring institution requiring a professional digital platform for new student registration and diagnostic testing programs."
    },
    solution: {
      id: "Landing page modern dengan fitur pendaftaran online, tes diagnostik terintegrasi, dan dashboard manajemen siswa.",
      en: "A modern landing page with online registration features, integrated diagnostic testing, and a student management dashboard."
    },
    outcome: {
      id: "Memudahkan proses seleksi siswa dan meningkatkan efisiensi pendaftaran hingga 70%.",
      en: "Facilitates student selection and increases registration efficiency by up to 70%."
    },
    techStack: ["React", "TypeScript", "Vite", "React Router", "Context API"]
  },
  {
    id: 2,
    title: "KlinikSehat",
    category: {
      id: "Kesehatan & Reservasi",
      en: "Healthcare & Reservation"
    },
    url: "https://aurotechklinik.my.id/",
    image: clinicImg,
    challenge: {
      id: "Klinik kesehatan yang memerlukan sistem reservasi online yang efisien dan portal informasi layanan medis yang transparan.",
      en: "A healthcare clinic requiring an efficient online reservation system and a transparent medical service information portal."
    },
    solution: {
      id: "Portal kesehatan modern dengan fitur booking dokter, informasi jadwal poli, dan integrasi database untuk manajemen pasien.",
      en: "A modern healthcare portal with doctor booking features, clinic schedule information, and database integration for patient management."
    },
    outcome: {
      id: "Mengurangi waktu tunggu pasien dan meningkatkan akurasi jadwal konsultasi sebesar 50%.",
      en: "Reduces patient waiting time and increases consultation schedule accuracy by 50%."
    },
    techStack: ["React", "TypeScript", "Vite", "Supabase"]
  },
  {
    id: 3,
    title: "Putra Karya Pallet",
    category: {
      id: "Profil Perusahaan & B2B",
      en: "Company Profile & B2B"
    },
    url: "https://putrakaryapallet.com/",
    image: putrakaryaImg,
    challenge: {
      id: "Supplier pallet kayu industri yang memerlukan kehadiran digital untuk menjangkau klien korporasi skala nasional.",
      en: "An industrial wooden pallet supplier requiring a digital presence to reach national-scale corporate clients."
    },
    solution: {
      id: "Website profil perusahaan profesional yang menonjolkan katalog produk industri, standar kualitas, dan form penawaran B2B.",
      en: "A professional company profile website showcasing industrial product catalogs, quality standards, and B2B inquiry forms."
    },
    outcome: {
      id: "Memperluas jangkauan pasar hingga ke luar daerah dan meningkatkan lead B2B sebesar 40%.",
      en: "Expands market reach beyond the region and increases B2B leads by 40%."
    },
    techStack: ["React", "Vite", "SEO Optimized"]
  },
  {
    id: 4,
    title: "Auro Barbers",
    category: {
      id: "Halaman Bisnis & Pemesanan",
      en: "Business & Booking Page"
    },
    url: "https://aurobarbers.web.id/",
    image: aurobarbersImg,
    challenge: {
      id: "Barbershop premium yang ingin mendigitalisasi layanan pemesanan dan membangun identitas brand yang modern.",
      en: "A premium barbershop wanting to digitize booking services and build a modern brand identity."
    },
    solution: {
      id: "Website dengan desain estetika gelap dan elegan, fitur pemesanan jadwal terintegrasi, dan dukungan PWA untuk akses mobile cepat.",
      en: "A website with a dark and elegant aesthetic design, integrated schedule booking features, and PWA support for fast mobile access."
    },
    outcome: {
      id: "Meningkatkan jumlah booking harian dan memperkuat loyalitas pelanggan melalui akses digital yang mudah.",
      en: "Increases daily booking volume and strengthens customer loyalty through easy digital access."
    },
    techStack: ["React", "Vite", "Tailwind CSS", "PWA"]
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
      id: "Penyedia jasa sewa mobil yang membutuhkan platform untuk mempermudah pelanggan dalam memilih armada dan melakukan pemesanan.",
      en: "A car rental service provider needing a platform to make it easier for customers to choose fleets and make bookings."
    },
    solution: {
      id: "Landing page responsif dengan katalog armada lengkap, sistem booking WhatsApp sekali klik, dan detail layanan antar-jemput.",
      en: "A responsive landing page with a complete fleet catalog, one-click WhatsApp booking system, and shuttle service details."
    },
    outcome: {
      id: "Meningkatkan konversi pemesanan armada sebesar 60% melalui proses booking yang lebih ringkas.",
      en: "Increases fleet booking conversion by 60% through a more concise booking process."
    },
    techStack: ["React", "Vite"]
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
      id: "Toko kue artisan yang ingin menampilkan produk visualnya secara menarik untuk meningkatkan pesanan online.",
      en: "An artisan bakery wanting to display its visual products attractively to increase online orders."
    },
    solution: {
      id: "Desain website yang mengedepankan visual produk (appetizing design) dengan katalog menu terorganisir dan CTA pemesanan langsung.",
      en: "A web design prioritizing product visuals (appetizing design) with an organized menu catalog and direct ordering CTAs."
    },
    outcome: {
      id: "Meningkatkan awareness brand dan volume pesanan kue kustom sebesar 45%.",
      en: "Increases brand awareness and custom cake order volume by 45%."
    },
    techStack: ["React", "Vite", "Custom Typography"]
  },
  {
    id: 7,
    title: "GlowMart",
    category: {
      id: "E-Commerce & Kecantikan",
      en: "E-Commerce & Beauty"
    },
    url: "http://glowmart.my.id/",
    image: glowmartImg,
    challenge: {
      id: "Platform retail kecantikan yang membutuhkan antarmuka belanja yang estetik dan navigasi mobile yang lancar.",
      en: "A beauty retail platform requiring an aesthetic shopping interface and smooth mobile navigation."
    },
    solution: {
      id: "Website e-commerce modern dengan katalog produk yang tertata, desain elegan yang selaras dengan brand kecantikan, dan performa loading cepat.",
      en: "A modern e-commerce website with an organized product catalog, elegant design aligned with the beauty brand, and fast loading performance."
    },
    outcome: {
      id: "Memperbaiki pengalaman belanja pelanggan dan menurunkan bounce rate sebesar 20%.",
      en: "Improves the customer shopping experience and reduces bounce rate by 20%."
    },
    techStack: ["React", "Vite"]
  }
];
