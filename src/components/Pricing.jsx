import { useState, useEffect, useCallback } from 'react';
import { FiCheck, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import './Pricing.css';

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState('web');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { language } = useLanguage();
  const { openWhatsAppModal } = useWhatsAppModal();

  const mainPlansId = [
    {
      name: "Basic",
      price: "Rp999.000",
      originalPrice: "Rp1.500.000",
      desc: "Cocok untuk Starter & UMKM Basic",
      features: [
        { name: "Up to 5 Halaman Website", included: true },
        { name: "Revisi Unlimited", included: true },
        { name: "3 Email Perusahaan", included: true },
        { name: "Integrasi WhatsApp", included: true },
        { name: "🎁 Hosting & Domain .com 1 Tahun", included: true },
        { name: "SEO Google", included: false },
        { name: "3 Artikel SEO", included: false },
        { name: "Maintenance 1 Bulan", included: false }
      ],
      featured: false,
      btnText: "Pilih Paket Basic"
    },
    {
      name: "Profesional",
      price: "Rp1.999.000",
      originalPrice: "Rp2.500.000",
      desc: "Pilihan Terpopuler untuk Bisnis",
      features: [
        { name: "Up to 10 Halaman Website", included: true },
        { name: "Revisi Unlimited", included: true },
        { name: "5 Email Perusahaan", included: true },
        { name: "Integrasi WhatsApp", included: true },
        { name: "🎁 Hosting & Domain .com 1 Tahun", included: true },
        { name: "SEO Google", included: true },
        { name: "3 Artikel SEO", included: true },
        { name: "🎁 Maintenance & Update 1 Bulan", included: true }
      ],
      featured: true,
      btnText: "Pilih Paket Profesional"
    },
    {
      name: "Premium",
      price: "Rp3.999.000",
      originalPrice: "Rp4.500.000",
      desc: "Untuk Skala Bisnis Besar & Kompleks",
      features: [
        { name: "10+ Halaman Website", included: true },
        { name: "Revisi Unlimited", included: true },
        { name: "5 Email Perusahaan", included: true },
        { name: "Integrasi WhatsApp", included: true },
        { name: "Integrasi Database", included: true },
        { name: "Form Pendaftaran Online", included: true },
        { name: "🎁 Hosting & Domain .com 1 Tahun", included: true },
        { name: "SEO Google", included: true },
        { name: "10 Artikel SEO", included: true },
        { name: "Fitur Admin dan Dashboard", included: true },
        { name: "🎁 Maintenance & Update 1 Tahun", included: true }
      ],
      featured: false,
      btnText: "Pilih Paket Premium"
    }
  ];

  const mainPlansEn = [
    {
      name: "Basic",
      price: "Rp999.000",
      originalPrice: "Rp1.500.000",
      desc: "Perfect for Starters & Small Businesses",
      features: [
        { name: "Up to 5 Website Pages", included: true },
        { name: "Unlimited Revisions", included: true },
        { name: "3 Business Emails", included: true },
        { name: "WhatsApp Integration", included: true },
        { name: "🎁 1-Year Hosting & .com Domain", included: true },
        { name: "Google SEO", included: false },
        { name: "3 SEO Articles", included: false },
        { name: "1-Month Maintenance", included: false }
      ],
      featured: false,
      btnText: "Choose Basic Plan"
    },
    {
      name: "Professional",
      price: "Rp1.999.000",
      originalPrice: "Rp2.500.000",
      desc: "Most Popular Choice for Businesses",
      features: [
        { name: "Up to 10 Website Pages", included: true },
        { name: "Unlimited Revisions", included: true },
        { name: "5 Business Emails", included: true },
        { name: "WhatsApp Integration", included: true },
        { name: "🎁 1-Year Hosting & .com Domain", included: true },
        { name: "Google SEO", included: true },
        { name: "3 SEO Articles", included: true },
        { name: "🎁 1-Month Maintenance & Updates", included: true }
      ],
      featured: true,
      btnText: "Choose Professional Plan"
    },
    {
      name: "Premium",
      price: "Rp3.999.000",
      originalPrice: "Rp4.500.000",
      desc: "For Large & Complex Business Scale",
      features: [
        { name: "10+ Website Pages", included: true },
        { name: "Unlimited Revisions", included: true },
        { name: "5 Business Emails", included: true },
        { name: "WhatsApp Integration", included: true },
        { name: "Database Integration", included: true },
        { name: "Online Registration Form", included: true },
        { name: "🎁 1-Year Hosting & .com Domain", included: true },
        { name: "Google SEO", included: true },
        { name: "10 SEO Articles", included: true },
        { name: "Admin & Dashboard Features", included: true },
        { name: "🎁 1-Year Maintenance & Updates", included: true }
      ],
      featured: false,
      btnText: "Choose Premium Plan"
    }
  ];

  const seoPlansId = [
    {
      name: "Starter",
      price: "Rp999.000",
      originalPrice: "Rp1.500.000",
      desc: "Ideal untuk Bisnis Lokal & UMKM",
      features: [
        { name: "Up to 10 Keyword Utama", included: true },
        { name: "Optimasi Google My Business / Maps", included: true },
        { name: "Audit Konten yang Sudah Ada", included: true },
        { name: "Audit Dasar & Perbaikan Error Link", included: true },
        { name: "Profiling Dasar Backlink", included: true },
        { name: "Laporan Bulanan (Email/PDF)", included: true },
        { name: "Analisis Kompetitor mendalam", included: false }
      ],
      featured: false,
      btnText: "Pilih Paket Starter"
    },
    {
      name: "Growth",
      price: "Rp1.750.000",
      originalPrice: "Rp2.500.000",
      desc: "Untuk Perusahaan Berkembang",
      features: [
        { name: "Up to 30 Keyword Komprehensif", included: true },
        { name: "Optimasi Maps Cabang (Jika ada)", included: true },
        { name: "4 – 6 Artikel SEO per bulan", included: true },
        { name: "Optimasi Struktur & Kecepatan Website", included: true },
        { name: "Content Placement (Media Skala Medium)", included: true },
        { name: "Bedah Strategi 3 Kompetitor Utama", included: true },
        { name: "Laporan Bulanan + Sesi Zoom (30 mnt)", included: true }
      ],
      featured: true,
      btnText: "Pilih Paket Growth"
    },
    {
      name: "Enterprise",
      price: "Rp3.500.000",
      originalPrice: "Rp4.500.000",
      desc: "Untuk Perusahaan Nasional & E-Commerce",
      features: [
        { name: "Tidak Terbatas (All Funnel Keyword)", included: true },
        { name: "Multi-lokasi / Cabang Maps", included: true },
        { name: "10 – 15 Artikel Mendalam per bulan", included: true },
        { name: "Advanced SEO (CWV & Schema Markup)", included: true },
        { name: "Premium Backlink (Media Nasional Utama)", included: true },
        { name: "Analisis Kompetitor Menyeluruh & Berkala", included: true },
        { name: "Live Dashboard + Dedicated Manager", included: true }
      ],
      featured: false,
      btnText: "Pilih Paket Enterprise"
    }
  ];

  const seoPlansEn = [
    {
      name: "Starter",
      price: "Rp999.000",
      originalPrice: "Rp1.500.000",
      desc: "Ideal for Local Business & SMEs",
      features: [
        { name: "Up to 10 Primary Keywords", included: true },
        { name: "Google My Business / Maps Setup", included: true },
        { name: "Existing Content Audit", included: true },
        { name: "Basic Technical & Link Error Fixing", included: true },
        { name: "Basic Backlink Profiling", included: true },
        { name: "Monthly Reports (Email/PDF)", included: true },
        { name: "In-depth Competitor Analysis", included: false }
      ],
      featured: false,
      btnText: "Choose Starter Plan"
    },
    {
      name: "Growth",
      price: "Rp1.750.000",
      originalPrice: "Rp2.500.000",
      desc: "For Growing Companies",
      features: [
        { name: "Up to 30 Comprehensive Keywords", included: true },
        { name: "Branch Maps Optimization (If any)", included: true },
        { name: "4 – 6 SEO Articles per month", included: true },
        { name: "Website Structure & Speed Optimization", included: true },
        { name: "Content Placement (Medium Scale Media)", included: true },
        { name: "Strategy Breakdown of 3 Competitors", included: true },
        { name: "Monthly Report + Zoom (30 mins)", included: true }
      ],
      featured: true,
      btnText: "Choose Growth Plan"
    },
    {
      name: "Enterprise",
      price: "Rp3.500.000",
      originalPrice: "Rp4.500.000",
      desc: "For National Brands & Large E-Commerce",
      features: [
        { name: "Unlimited Keywords (All Funnel)", included: true },
        { name: "Multi-location / Branch Maps", included: true },
        { name: "10 – 15 In-depth Articles per month", included: true },
        { name: "Advanced SEO (CWV & Schema Markup)", included: true },
        { name: "Premium Backlinks (Major National Media)", included: true },
        { name: "Continuous Competitor Analysis", included: true },
        { name: "Live Dashboard + Dedicated Manager", included: true }
      ],
      featured: false,
      btnText: "Choose Enterprise Plan"
    }
  ];

  const sosmedPlansId = [
    {
      name: "Basic",
      price: "Rp750.000",
      originalPrice: "Rp1.000.000",
      desc: "Citra Digital Awal",
      features: [
        { name: "10 Feed Desain Grafis", included: true },
        { name: "3 Video Pendek (Reels/TikTok)", included: true },
        { name: "3 Story Interaktif", included: true },
        { name: "2x Revisi Minor", included: true },
        { name: "Optimasi Bio & Highlight", included: false },
        { name: "Setup Kampanye Iklan (Ads)", included: false },
        { name: "Optimasi/Riset Akun Menyeluruh", included: false },
        { name: "Laporan Kinerja Bulanan", included: false }
      ],
      featured: false,
      btnText: "Pilih Paket Basic"
    },
    {
      name: "Medium",
      price: "Rp1.350.000",
      originalPrice: "Rp1.800.000",
      desc: "Terbaik untuk UMKM Bertumbuh",
      features: [
        { name: "24 Feed Desain Grafis", included: true },
        { name: "8 Video Pendek (Reels/TikTok)", included: true },
        { name: "8 Story Interaktif", included: true },
        { name: "3x Revisi Minor", included: true },
        { name: "Optimasi Bio & Highlight", included: true },
        { name: "Setup Kampanye Iklan (Ads)", included: true },
        { name: "Optimasi/Riset Akun Menyeluruh", included: false },
        { name: "Laporan Kinerja Bulanan", included: false }
      ],
      featured: true,
      btnText: "Pilih Paket Medium"
    },
    {
      name: "Profesional",
      price: "Rp2.490.000",
      originalPrice: "Rp3.200.000",
      desc: "Otomasi & Reputasi Premium",
      features: [
        { name: "45 Feed Desain Grafis", included: true },
        { name: "12 Video Pendek (Reels/TikTok)", included: true },
        { name: "12 Story Interaktif", included: true },
        { name: "Unlimited Revisi Minor", included: true },
        { name: "Optimasi Bio & Highlight", included: true },
        { name: "Setup Kampanye Iklan (Ads)", included: true },
        { name: "Optimasi/Riset Akun Menyeluruh", included: true },
        { name: "Laporan Kinerja Bulanan (Monthly)", included: true }
      ],
      featured: false,
      btnText: "Pilih Paket Profesional"
    },
    {
      name: "Custom Package",
      price: "Kustom",
      desc: "Sesuai Kebutuhan Bisnis",
      features: [
        { name: "Jumlah Konten Kustom Bulanan", included: true },
        { name: "Sesi Brainstorming Khusus", included: true },
        { name: "Custom Copywriting & Talent", included: true },
        { name: "Dedicated Content Specialist", included: true },
        { name: "Integrasi Strategi Multi-Platform", included: true }
      ],
      featured: false,
      btnText: "Diskusikan Paket Kustom"
    }
  ];

  const sosmedPlansEn = [
    {
      name: "Basic",
      price: "Rp750.000",
      originalPrice: "Rp1.000.000",
      desc: "Initial Digital Image",
      features: [
        { name: "10 Graphic Design Feeds", included: true },
        { name: "3 Short Videos (Reels/TikTok)", included: true },
        { name: "3 Interactive Stories", included: true },
        { name: "2x Minor Revisions", included: true },
        { name: "Bio & Highlight Optimization", included: false },
        { name: "Ad Campaign Setup (Ads)", included: false },
        { name: "Full Account Audit & Optimization", included: false },
        { name: "Monthly Performance Report", included: false }
      ],
      featured: false,
      btnText: "Choose Basic Plan"
    },
    {
      name: "Medium",
      price: "Rp1.350.000",
      originalPrice: "Rp1.800.000",
      desc: "Best for Growing Small Businesses",
      features: [
        { name: "24 Graphic Design Feeds", included: true },
        { name: "8 Short Videos (Reels/TikTok)", included: true },
        { name: "8 Interactive Stories", included: true },
        { name: "3x Minor Revisions", included: true },
        { name: "Bio & Highlight Optimization", included: true },
        { name: "Ad Campaign Setup (Ads)", included: true },
        { name: "Full Account Audit & Optimization", included: false },
        { name: "Monthly Performance Report", included: false }
      ],
      featured: true,
      btnText: "Choose Medium Plan"
    },
    {
      name: "Professional",
      price: "Rp2.490.000",
      originalPrice: "Rp3.200.000",
      desc: "Premium Reputability & Automation",
      features: [
        { name: "45 Graphic Design Feeds", included: true },
        { name: "12 Short Videos (Reels/TikTok)", included: true },
        { name: "12 Interactive Stories", included: true },
        { name: "Unlimited Minor Revisions", included: true },
        { name: "Bio & Highlight Optimization", included: true },
        { name: "Ad Campaign Setup (Ads)", included: true },
        { name: "Full Account Audit & Optimization", included: true },
        { name: "Monthly Performance Report", included: true }
      ],
      featured: false,
      btnText: "Choose Professional Plan"
    },
    {
      name: "Custom Package",
      price: "Custom",
      desc: "Tailored to Your Scope & Budget",
      features: [
        { name: "Custom Content Counts", included: true },
        { name: "Dedicated Brainstorming Session", included: true },
        { name: "Custom Copywriting & Talent", included: true },
        { name: "Dedicated Content Specialist", included: true },
        { name: "Multi-Platform Integrated Strategy", included: true }
      ],
      featured: false,
      btnText: "Discuss Custom Package"
    }
  ];

  const maintenancePlansListId = [
    {
      name: "Perpanjangan",
      category: "Management",
      price: "Rp350.000 / thn",
      desc: "Khusus Hosting & Domain",
      isRenewal: true,
      features: [
        "Perpanjangan Domain (.com)",
        "Sewa Tempat Data (Hosting)",
        "Website Tetap Aktif & Aman"
      ],
      btnText: "Pilih Paket",
      targetId: "renewal-detail"
    },
    {
      name: "Pembuatan Logo",
      category: "Design",
      price: "Rp300.000",
      features: [
        "3 Konsep Desain",
        "Revisi Maksimal 2x",
        "Pengerjaan 3 Hari Kerja",
        "File Master (AI/EPS/SVG)"
      ],
      featured: false,
      btnText: "Pilih Paket",
      targetId: "design-logo"
    },
    {
      name: "Basic",
      category: "Maintenance",
      price: "Rp150.000 / bln",
      features: [
        "Produksi Artikel 1/bulan",
        "Fast Response Support",
        "Monitoring Uptime",
        "Backup Mingguan",
        "Perbaikan Error"
      ],
      featured: false,
      btnText: "Pilih Paket",
      targetId: "maintenance-Basic"
    },
    {
      name: "Profesional",
      category: "Maintenance",
      price: "Rp300.000 / bln",
      features: [
        "Produksi Artikel 4/bulan",
        "Update Konten Halaman",
        "Fast Response Support",
        "Monitoring Uptime",
        "Backup Mingguan",
        "Perbaikan Error",
        "Optimasi Keyword"
      ],
      featured: false,
      btnText: "Pilih Paket",
      targetId: "maintenance-Profesional"
    },
    {
      name: "Premium",
      category: "Maintenance",
      price: "Rp750.000 / bln",
      features: [
        "Produksi Artikel 8/bulan",
        "Penambahan Halaman Baru",
        "Update Konten Halaman",
        "Fast Response Support",
        "Monitoring Uptime",
        "Backup Mingguan",
        "Optimasi SEO Lanjutan",
        "Audit SEO Mingguan"
      ],
      featured: false,
      btnText: "Pilih Paket",
      targetId: "maintenance-Premium"
    }
  ];

  const maintenancePlansListEn = [
    {
      name: "Renewal",
      category: "Management",
      price: "Rp350.000 / yr",
      desc: "Hosting & Domain Only",
      isRenewal: true,
      features: [
        "Domain Renewal (.com)",
        "Data Storage Rent (Hosting)",
        "Website Stays Active & Secure"
      ],
      btnText: "Choose Plan",
      targetId: "renewal-detail"
    },
    {
      name: "Logo Design",
      category: "Design",
      price: "Rp300.000",
      features: [
        "3 Design Concepts",
        "Max 2x Revisions",
        "3 Working Days Turnaround",
        "Master Files (AI/EPS/SVG)"
      ],
      featured: false,
      btnText: "Choose Plan",
      targetId: "design-logo"
    },
    {
      name: "Basic",
      category: "Maintenance",
      price: "Rp150.000 / mo",
      features: [
        "1 Article Production/mo",
        "Fast Response Support",
        "Uptime Monitoring",
        "Weekly Backup",
        "Error Fixing"
      ],
      featured: false,
      btnText: "Choose Plan",
      targetId: "maintenance-Basic"
    },
    {
      name: "Professional",
      category: "Maintenance",
      price: "Rp300.000 / mo",
      features: [
        "4 Article Production/mo",
        "Page Content Updates",
        "Fast Response Support",
        "Uptime Monitoring",
        "Weekly Backup",
        "Error Fixing",
        "Keyword Optimization"
      ],
      featured: false,
      btnText: "Choose Plan",
      targetId: "maintenance-Profesional"
    },
    {
      name: "Premium",
      category: "Maintenance",
      price: "Rp750.000 / mo",
      features: [
        "8 Article Production/mo",
        "New Page Additions",
        "Page Content Updates",
        "Fast Response Support",
        "Uptime Monitoring",
        "Weekly Backup",
        "Advanced SEO Optimization",
        "Weekly SEO Audit"
      ],
      featured: false,
      btnText: "Choose Plan",
      targetId: "maintenance-Premium"
    }
  ];

  const monitoringPlans = [
    { name: "BASIC NEWS", price: "Rp10.500.000" },
    { name: "SOSMED", price: "Rp13.500.000" },
    { name: "PROFESIONAL", price: "Rp14.500.000" },
    { name: "ENTERPRISE", price: "Rp16.500.000" },
    { name: "ULTIMATE", price: "Rp18.500.000" },
    { name: "DIAMOND", price: "Rp29.900.000" }
  ];

  const monitoringFeaturesId = [
    { label: "Jumlah User", values: ["1 User", "1 User", "1 User", "3 User", "5 User", "5 User"] },
    { label: "Jumlah Topik", values: ["5", "5", "5", "8", "10", "12"] },
    { label: "Online News", values: [true, false, true, true, true, true] },
    { label: "Social Media Dedicated (IG, X, YT, FB)", values: [false, true, "X Only", true, true, true] },
    { label: "Media Cetak (100 Media)", values: [false, false, false, false, true, true] },
    { label: "TV (10 Stasiun TV)", values: [false, false, false, false, false, true] },
    { label: "Analisis Sentimen", values: [true, true, true, true, true, true] },
    { label: "Top Person & Organisasi", values: [true, true, true, true, true, true] },
    { label: "Ekstraksi Data", values: [true, true, true, true, true, true] },
    { label: "Komparasi Data", values: [true, true, true, true, true, true] },
    { label: "Analisis Tren", values: [true, true, true, true, true, true] },
    { label: "Wordcloud / Hashtag", values: [true, true, true, true, true, true] },
    { label: "Redaksi Media", values: [true, false, true, true, true, true] },
    { label: "Pelacakan Lokasi", values: [true, false, true, true, true, true] },
    { label: "Listening Akun IG (max 3 akun)", values: [false, true, false, false, true, true] },
    { label: "Daily Summary", values: [false, false, false, false, true, true] },
    { label: "Monthly Report", values: [false, false, false, true, true, true] }
  ];

  const monitoringFeaturesEn = [
    { label: "Number of Users", values: ["1 User", "1 User", "1 User", "3 Users", "5 Users", "5 Users"] },
    { label: "Number of Topics", values: ["5", "5", "5", "8", "10", "12"] },
    { label: "Online News Coverage", values: [true, false, true, true, true, true] },
    { label: "Dedicated Social Media (IG, X, YT, FB)", values: [false, true, "X Only", true, true, true] },
    { label: "Print Media (100 Outlets)", values: [false, false, false, false, true, true] },
    { label: "Television (10 Channels)", values: [false, false, false, false, false, true] },
    { label: "Sentiment Profiling", values: [true, true, true, true, true, true] },
    { label: "Top Person & Organisation Identification", values: [true, true, true, true, true, true] },
    { label: "Data Extraction", values: [true, true, true, true, true, true] },
    { label: "Data Comparison Matrices", values: [true, true, true, true, true, true] },
    { label: "Trend Analysis Engine", values: [true, true, true, true, true, true] },
    { label: "Wordcloud / Hashtag Tracking", values: [true, true, true, true, true, true] },
    { label: "News Editorial Checks", values: [true, false, true, true, true, true] },
    { label: "Location/Geo Tracking", values: [true, false, true, true, true, true] },
    { label: "IG Listening (Max 3 accounts)", values: [false, true, false, false, true, true] },
    { label: "Daily Summary Feed", values: [false, false, false, false, true, true] },
    { label: "Monthly Dynamic Report", values: [false, false, false, true, true, true] }
  ];

  const translations = {
    id: {
      promo: "🎉 PROMO TERBATAS: Gratis Domain & Hosting Super Cepat 1 Tahun Penuh!",
      title: "Daftar Paket Jasa Kami",
      subtitle: "Pilih paket yang paling relevan untuk mengakselerasi pertumbuhan bisnis Anda.",
      guarantee: "🛡️ Garansi Penuh Pengerjaan Sampai Deal",
      addonTitle: "Add-on Service",
      addonSubtitle: "Layanan tambahan untuk mendukung pertumbuhan dan performa aset digital Anda.",
      tabWeb: "Pembuatan Website",
      tabSEO: "SEO Google",
      tabSosmed: "Kelola Sosmed",
      tabMonitoring: "Media Monitoring",
      extraBonus: "🔥 BONUS TAMBAHAN (DISEMUA PAKET SOSMED):",
      bonuses: [
        "Free Copywriting Caption",
        "Private Grup Diskusi WhatsApp",
        "Free Content Planner Bulanan",
        "Free Admin Posting Konten",
        "Pengisi Suara / Voice Over (Opsional)",
        "Free Brainstorming 1x via Zoom"
      ],
      customPrompt: "Butuh paket media sosial yang disesuaikan khusus?",
      discussBtn: "Diskusikan Kebutuhan Anda",
      monitoringAddon: "Biaya Tambahan (Add-on Services)",
      monitoringOneTime: "Laporan Satu Kali (One Time Report)",
      monitoringTerms: "Syarat & Ketentuan",
      monAddons: [
        { item: "Topik Tambahan", price: "Rp1.000.000 / topik" },
        { item: "TV/Radio Tambahan", price: "Rp1.500.000 / channel" },
        { item: "Laporan Mingguan", price: "Rp3.000.000 / bulan" },
        { item: "Laporan Harian", price: "Rp3.000.000 / bulan" },
        { item: "Listening Akun Tambahan", price: "Rp500.000 / akun" },
        { item: "Laporan Insidental", price: "Rp1.500.000 / laporan" },
        { item: "Media Cetak Tambahan", price: "Rp5.000.000 / 30 media" },
        { item: "Tambah User", price: "Rp300.000 / user" },
        { item: "SNA (Social Network Analysis)", price: "Rp2.000.000 / bulan" },
        { item: "Data Tiktok", price: "Rp3.000.000 / bulan" },
        { item: "Data Linkedin", price: "Rp3.000.000 / bulan" }
      ],
      monOneTimes: [
        { item: "Data Historis 1 Bulan", price: "Rp8.000.000" },
        { item: "Data Historis 3 Bulan", price: "Rp15.000.000" },
        { item: "Data Historis 6 Bulan", price: "Rp25.000.000" },
        { item: "Data Historis 12 Bulan", price: "Rp40.000.000" },
        { item: "Data Historis 24 Bulan", price: "Rp60.000.000" }
      ],
      monTermsList: [
        "Masa kontrak berlangganan minimal 6 bulan.",
        "Mendapatkan diskon 10% apabila pembayaran dilakukan 100% di awal.",
        "Untuk Paket Custom / Khusus, biaya akan disesuaikan dengan scope pengerjaan."
      ]
    },
    en: {
      promo: "🎉 LIMITED PROMO: Free Super Fast Domain & Hosting for 1 Full Year!",
      title: "Our Specialized Services Packages",
      subtitle: "Choose the package most relevant to accelerating your business growth.",
      guarantee: "🛡️ Production Guarantee Till Agreement",
      addonTitle: "Add-on Services",
      addonSubtitle: "Additional services to support the growth and performance of your digital assets.",
      tabWeb: "Web Development",
      tabSEO: "Google SEO",
      tabSosmed: "Social Media",
      tabMonitoring: "Media Monitoring",
      extraBonus: "🔥 EXTRA BONUSES (INCLUDED IN ALL SOCIAL PACKAGES):",
      bonuses: [
        "Free Caption Copywriting",
        "Private WhatsApp Discussion Group",
        "Free Monthly Content Planner",
        "Free Admin Content Posting",
        "Voice Over / Narrator (Optional)",
        "1x Free Zoom Brainstorming Session"
      ],
      customPrompt: "Need a specifically tailored social media package?",
      discussBtn: "Discuss Your Requirements",
      monitoringAddon: "Add-on Services Fees",
      monitoringOneTime: "One Time Historical Report",
      monitoringTerms: "Terms & Conditions",
      monAddons: [
        { item: "Additional Topic", price: "Rp1.000.000 / topic" },
        { item: "Additional TV/Radio", price: "Rp1.500.000 / channel" },
        { item: "Weekly Report", price: "Rp3.000.000 / month" },
        { item: "Daily Report", price: "Rp3.000.000 / month" },
        { item: "Additional Listening Account", price: "Rp500.000 / account" },
        { item: "Incidental Special Report", price: "Rp1.500.000 / report" },
        { item: "Additional Print Media", price: "Rp5.000.000 / 30 outlets" },
        { item: "User Increment", price: "Rp300.000 / user" },
        { item: "SNA (Social Network Analysis)", price: "Rp2.000.000 / month" },
        { item: "Tiktok Feeds Data", price: "Rp3.000.000 / month" },
        { item: "Linkedin Profile Data", price: "Rp3.000.000 / month" }
      ],
      monOneTimes: [
        { item: "1-Month Historical Data", price: "Rp8.000.000" },
        { item: "3-Month Historical Data", price: "Rp15.000.000" },
        { item: "6-Month Historical Data", price: "Rp25.000.000" },
        { item: "12-Month Historical Data", price: "Rp40.000.000" },
        { item: "24-Month Historical Data", price: "Rp60.000.000" }
      ],
      monTermsList: [
        "Minimum contract subscription duration of 6 months.",
        "Get a 10% discount if payment is settled 100% in advance.",
        "Custom packages will be adjusted based on detailed requirements and scope."
      ]
    }
  };

  const mainPlans = language === 'en' ? mainPlansEn : mainPlansId;
  const seoPlans = language === 'en' ? seoPlansEn : seoPlansId;
  const sosmedPlans = language === 'en' ? sosmedPlansEn : sosmedPlansId;
  const maintenancePlansList = language === 'en' ? maintenancePlansListEn : maintenancePlansListId;
  const monitoringFeatures = language === 'en' ? monitoringFeaturesEn : monitoringFeaturesId;
  const t = translations[language] || translations.id;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maintenancePlansList.length - 3 : prev - 1));
  }, [maintenancePlansList.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maintenancePlansList.length - 3 ? 0 : prev + 1));
  }, [maintenancePlansList.length]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isPaused || isMobile) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [handleNext, isPaused, currentIndex]);

  return (
    <section
      id="pricing"
      className="section pricing-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Scarcity Banner Hook */}
        <div className="promo-banner text-center mb-8">
          <div className="inline-block bg-primary text-black px-6 py-3 rounded-full font-bold shadow-lg animate-pulse">
            {t.promo}
          </div>
        </div>

        <div className="section-header text-center mt-6">
          <h2 className="section-title text-white">{t.title}</h2>
          <p className="text-gray-300">{t.subtitle}</p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="pricing-tabs-container mb-12">
          <div className="pricing-tabs glass">
            <button
              className={`pricing-tab ${activeCategory === 'web' ? 'active' : ''}`}
              onClick={() => setActiveCategory('web')}
            >
              {t.tabWeb}
            </button>
            <button
              className={`pricing-tab ${activeCategory === 'seo' ? 'active' : ''}`}
              onClick={() => setActiveCategory('seo')}
            >
              {t.tabSEO}
            </button>
            <button
              className={`pricing-tab ${activeCategory === 'sosmed' ? 'active' : ''}`}
              onClick={() => setActiveCategory('sosmed')}
            >
              {t.tabSosmed}
            </button>
            <button
              className={`pricing-tab ${activeCategory === 'monitoring' ? 'active' : ''}`}
              onClick={() => setActiveCategory('monitoring')}
            >
              {t.tabMonitoring}
            </button>
          </div>
        </div>

        {/* Tab 1: Web Development Packages */}
        {activeCategory === 'web' && (
          <div className="pricing-grid animate-entrance">
            {mainPlans.map((plan, index) => (
              <div key={index} className={`pricing-card glass-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <div className="featured-badge gold-ribbon">POPULAR</div>}

                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price-container">
                    {plan.originalPrice && (
                      <span className="original-price">{plan.originalPrice}</span>
                    )}
                    <div className="plan-price gold-text">
                      {plan.price}
                    </div>
                  </div>
                </div>

                <div className="pricing-features">
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={feature.included ? 'clean-list' : 'clean-list not-included'}>
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-action">
                  <button 
                    onClick={() => openWhatsAppModal(`Website - Paket ${plan.name}`)}
                    className="btn w-full btn-blue"
                  >
                    {plan.btnText}
                  </button>
                  <p className="text-center mt-4 text-sm text-gray-400 font-medium" style={{ opacity: 0.8 }}>{t.guarantee}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: SEO Services */}
        {activeCategory === 'seo' && (
          <div className="pricing-grid animate-entrance">
            {seoPlans.map((plan, index) => (
              <div key={index} className={`pricing-card glass-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <div className="featured-badge gold-ribbon">BEST VALUE</div>}

                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price-container">
                    {plan.originalPrice && (
                      <span className="original-price">{plan.originalPrice}</span>
                    )}
                    <div className="plan-price gold-text">
                      {plan.price} <span className="price-period" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/bln</span>
                    </div>
                  </div>
                </div>

                <div className="pricing-features">
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={feature.included ? 'clean-list' : 'clean-list not-included'}>
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-action">
                  <button 
                    onClick={() => openWhatsAppModal(`SEO Google - Paket ${plan.name}`)}
                    className="btn w-full btn-blue"
                  >
                    {plan.btnText}
                  </button>
                  <p className="text-center mt-4 text-sm text-gray-400 font-medium" style={{ opacity: 0.8 }}>{t.guarantee}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Social Media Management */}
        {activeCategory === 'sosmed' && (
          <div className="animate-entrance">
            <div className="pricing-grid">
              {sosmedPlans.map((plan, index) => (
                <div key={index} className={`pricing-card glass-card ${plan.featured ? 'featured' : ''}`}>
                  {plan.featured && <div className="featured-badge gold-ribbon">POPULAR</div>}

                  <div className="pricing-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-price-container">
                      {plan.originalPrice && (
                        <span className="original-price">{plan.originalPrice}</span>
                      )}
                      <div className="plan-price gold-text">
                        {plan.price}
                        {plan.price !== 'Kustom' && plan.price !== 'Custom' && (
                          <span className="price-period" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/bln</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pricing-features">
                    <ul>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className={feature.included ? 'clean-list' : 'clean-list not-included'}>
                          {feature.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-action">
                    <button 
                      onClick={() => openWhatsAppModal(`Kelola Sosmed - Paket ${plan.name}`)}
                      className="btn w-full btn-blue"
                    >
                      {plan.btnText}
                    </button>
                    <p className="text-center mt-4 text-sm text-gray-400 font-medium" style={{ opacity: 0.8 }}>{t.guarantee}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Extra Bonuses Callout */}
            <div className="extra-bonuses-panel glass mt-12 p-8 rounded-3xl text-center border-glow">
              <h3 className="gold-text font-heading text-lg mb-6">{t.extraBonus}</h3>
              <div className="bonuses-grid">
                {t.bonuses.map((bonus, idx) => (
                  <div key={idx} className="bonus-pill glass">
                    <FiCheck className="text-emerald-400 flex-shrink-0" />
                    <span>{bonus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Media Monitoring */}
        {activeCategory === 'monitoring' && (
          <div className="animate-entrance">
            <div className="monitoring-table-container glass p-4 md:p-8 rounded-3xl overflow-x-auto">
              <table className="monitoring-table">
                <thead>
                  <tr>
                    <th className="feature-col">Fitur / Komponen</th>
                    {monitoringPlans.map((plan, idx) => (
                      <th key={idx} className="pkg-col">
                        <div className="pkg-header">
                          <span className="pkg-title">{plan.name}</span>
                          <span className="pkg-price gold-text">{plan.price}</span>
                          <span className="pkg-period">/bln</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monitoringFeatures.map((feat, idx) => (
                    <tr key={idx} className="feature-row">
                      <td className="feature-label">{feat.label}</td>
                      {feat.values.map((val, vIdx) => (
                        <td key={vIdx} className="feature-val">
                          {typeof val === 'boolean' ? (
                            val ? (
                              <FiCheck className="val-icon yes" />
                            ) : (
                              <FiX className="val-icon no" />
                            )
                          ) : (
                            <span className="text-val">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Call to action row inside table */}
                  <tr className="action-row">
                    <td></td>
                    {monitoringPlans.map((plan, idx) => (
                      <td key={idx} className="pkg-action-cell">
                        <button 
                          onClick={() => openWhatsAppModal(`Media Monitoring - Paket ${plan.name}`)}
                          className="btn btn-sm btn-outline"
                        >
                          Order
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Media Monitoring Additional Info */}
            <div className="monitoring-additional-grid mt-12">
              {/* Left Column: Addon Fees */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="gold-text font-heading text-lg mb-4">{t.monitoringAddon}</h3>
                <ul className="details-list">
                  {t.monAddons.map((addon, idx) => (
                    <li key={idx} className="flex justify-between border-b py-2 text-sm">
                      <span className="text-gray-300">{addon.item}</span>
                      <span className="gold-text font-bold">{addon.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: One Time Report & Terms */}
              <div className="space-y-6">
                <div className="glass p-6 rounded-2xl">
                  <h3 className="gold-text font-heading text-lg mb-4">{t.monitoringOneTime}</h3>
                  <ul className="details-list">
                    {t.monOneTimes.map((ot, idx) => (
                      <li key={idx} className="flex justify-between border-b py-2 text-sm">
                        <span className="text-gray-300">{ot.item}</span>
                        <span className="gold-text font-bold">{ot.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass p-6 rounded-2xl border-glow">
                  <h3 className="gold-text font-heading text-lg mb-4">{t.monitoringTerms}</h3>
                  <ul className="terms-list text-sm space-y-2">
                    {t.monTermsList.map((term, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="gold-text">•</span>
                        <span className="text-gray-300">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add-on Service Slider for Web Development */}
        {activeCategory === 'web' && (
          <>
            <div className="section-header text-center" style={{ marginTop: '8rem' }}>
              <h2 className="section-title text-white">{t.addonTitle}</h2>
              <p className="text-gray-300">{t.addonSubtitle}</p>
            </div>

            <div className="maintenance-slider-outer">
              <button className="slider-arrow prev" onClick={handlePrev} aria-label="Previous">
                <FiChevronLeft size={32} />
              </button>

              <div className="maintenance-slider-window">
                <div
                  className="maintenance-slider-track"
                  style={{ transform: `translateX(-${currentIndex * (100 / maintenancePlansList.length)}%)` }}
                >
                  {maintenancePlansList.map((plan, index) => (
                    <div key={index} className="maintenance-slide">
                      <div className={`pricing-card glass-card maintenance-card ${plan.isRenewal ? 'renewal-card' : ''}`}>
                        <div className="pricing-header">
                          <span className="card-category">{plan.category}</span>
                          <h3 className="plan-name">{plan.name}</h3>
                          <div className="plan-price gold-text">
                            {plan.price}
                          </div>
                        </div>

                        <div className="pricing-features">
                          <ul>
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="clean-list text-center">
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pricing-action">
                          <button 
                            onClick={() => openWhatsAppModal(`Add-on Service - ${plan.name}`)}
                            className={`btn w-full ${plan.isRenewal ? 'btn-primary' : 'btn-blue'}`}
                          >
                            {plan.btnText}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="slider-arrow next" onClick={handleNext} aria-label="Next">
                <FiChevronRight size={32} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Pricing;

