import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  FiCheck, FiX, FiChevronLeft, FiChevronRight,
  FiLayout, FiDatabase, FiDollarSign, FiPackage, FiLock, FiServer, FiPieChart, FiShield,
  FiSmartphone, FiCreditCard, FiBell, FiMapPin, FiCloud, FiAward,
  FiTrendingUp, FiEdit3, FiPenTool, FiShare2, FiUsers, FiMail, FiVideo, FiSearch,
  FiClock, FiSettings, FiSliders, FiLink, FiGlobe, FiFileText, FiMessageSquare, FiZap, FiLayers, FiTarget
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import './Pricing.css';
import tierBasicImg from '../assets/pricing_basic.png';
import tierProImg from '../assets/pricing_pro.png';
import tierPremiumImg from '../assets/pricing_premium.png';
import tierCustomImg from '../assets/pricing_custom.png';

const getPlanIcon = (name) => {
  const lowercase = name.toLowerCase();
  if (lowercase.includes('basic') || lowercase.includes('starter') || lowercase.includes('perpanjangan') || lowercase.includes('renewal')) return tierBasicImg;
  if (lowercase.includes('profesional') || lowercase.includes('professional') || lowercase.includes('medium') || lowercase.includes('growth') || lowercase.includes('logo')) return tierProImg;
  if (lowercase.includes('premium') || lowercase.includes('enterprise') || lowercase.includes('apps') || lowercase.includes('ultimate') || lowercase.includes('diamond')) return tierPremiumImg;
  return tierCustomImg;
};

const getFeatureIcon = (name) => {
  const lowercase = name.toLowerCase();
  
  // Dashboard, Admin, Layout
  if (lowercase.includes('dashboard') || lowercase.includes('layout') || lowercase.includes('admin')) return <FiLayout />;
  
  // Database, Storage
  if (lowercase.includes('database') || lowercase.includes('stok') || lowercase.includes('inventaris') || lowercase.includes('stock') || lowercase.includes('erp') || lowercase.includes('package')) return <FiDatabase />;
  
  // Finance, Money, Payment, Price
  if (lowercase.includes('keuangan') || lowercase.includes('finance') || lowercase.includes('pencatatan') || lowercase.includes('dollar') || lowercase.includes('payment') || lowercase.includes('pembayaran') || lowercase.includes('gateway') || lowercase.includes('credit') || lowercase.includes('biaya')) return <FiDollarSign />;
  
  // Security, Shield, Guarantee, License
  if (lowercase.includes('garansi') || lowercase.includes('warranty') || lowercase.includes('shield') || lowercase.includes('security') || lowercase.includes('ssl') || lowercase.includes('aman') || lowercase.includes('secure')) return <FiShield />;
  
  // User, Profile, Access Control
  if (lowercase.includes('user') || lowercase.includes('access') || lowercase.includes('multi-level') || lowercase.includes('lock') || lowercase.includes('login') || lowercase.includes('hak akses')) return <FiLock />;
  
  // Server, API, Cloud, Domain, Hosting
  if (lowercase.includes('server') || lowercase.includes('cloud') || lowercase.includes('api') || lowercase.includes('hosting')) return <FiServer />;
  
  // Analytics, Chart, Reporting, PDF, Laporan
  if (lowercase.includes('analitik') || lowercase.includes('analytical') || lowercase.includes('visualisasi') || lowercase.includes('chart') || lowercase.includes('laporan') || lowercase.includes('report') || lowercase.includes('pdf')) return <FiPieChart />;
  
  // App, Smartphone, Mobile
  if (lowercase.includes('aplikasi') || lowercase.includes('app') || lowercase.includes('flutter') || lowercase.includes('smartphone') || lowercase.includes('mobile')) return <FiSmartphone />;
  
  // Maps, Location, GPS, Address
  if (lowercase.includes('maps') || lowercase.includes('map') || lowercase.includes('gps') || lowercase.includes('kamera') || lowercase.includes('pin') || lowercase.includes('lokasi') || lowercase.includes('cabang')) return <FiMapPin />;
  
  // Cloud Upload, App Store, Play Store
  if (lowercase.includes('play store') || lowercase.includes('app store') || lowercase.includes('publikasi') || lowercase.includes('submission')) return <FiCloud />;
  
  // Award, Best, Main
  if (lowercase.includes('award') || lowercase.includes('utama') || lowercase.includes('premium')) return <FiAward />;
  
  // Email, Message, Contact
  if (lowercase.includes('email') || lowercase.includes('surat')) return <FiMail />;
  
  // WhatsApp, Chat, Discussion
  if (lowercase.includes('whatsapp') || lowercase.includes('wa') || lowercase.includes('diskusi') || lowercase.includes('grup') || lowercase.includes('chat') || lowercase.includes('brainstorming')) return <FiMessageSquare />;
  
  // SEO, Google, Keyword, Competitor, Search
  if (lowercase.includes('seo') || lowercase.includes('google') || lowercase.includes('keyword') || lowercase.includes('audit') || lowercase.includes('kompetitor') || lowercase.includes('riset') || lowercase.includes('search') || lowercase.includes('analisis')) return <FiSearch />;
  
  // Content, Article, Design, Copywriting, Video, Feed, Post, Story
  if (lowercase.includes('artikel') || lowercase.includes('konten') || lowercase.includes('content') || lowercase.includes('copywriting') || lowercase.includes('caption') || lowercase.includes('desain') || lowercase.includes('design') || lowercase.includes('logo') || lowercase.includes('feed') || lowercase.includes('post') || lowercase.includes('revisi')) return <FiEdit3 />;
  
  // Video, Reels, TikTok, Zoom
  if (lowercase.includes('video') || lowercase.includes('reels') || lowercase.includes('tiktok') || lowercase.includes('zoom')) return <FiVideo />;
  
  // Link, Backlink
  if (lowercase.includes('link') || lowercase.includes('backlink')) return <FiLink />;
  
  // Speed, Fast, Performance, Uptime, Optimization
  if (lowercase.includes('cepat') || lowercase.includes('speed') || lowercase.includes('optimasi') || lowercase.includes('uptime') || lowercase.includes('performance') || lowercase.includes('fast') || lowercase.includes('zap')) return <FiZap />;
  
  // Maintenance, Support, Setup, Configuration, Automation
  if (lowercase.includes('maintenance') || lowercase.includes('support') || lowercase.includes('dukungan') || lowercase.includes('setup') || lowercase.includes('otomatisasi') || lowercase.includes('perbaikan') || lowercase.includes('backup')) return <FiSettings />;
  
  // Multi-Platform, Channels
  if (lowercase.includes('platform') || lowercase.includes('channel') || lowercase.includes('sosmed') || lowercase.includes('media')) return <FiLayers />;
  
  // Default checkmark
  return <FiCheck />;
};

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState('web');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { language } = useLanguage();
  const { openWhatsAppModal } = useWhatsAppModal();

  const sosmedScrollRef = useRef(null);

  const scrollSosmed = (direction) => {
    if (sosmedScrollRef.current) {
      const container = sosmedScrollRef.current;
      const card = container.querySelector('.pricing-card');
      if (card) {
        const cardWidth = card.clientWidth + 24;
        const targetScroll = direction === 'left'
          ? container.scrollLeft - cardWidth
          : container.scrollLeft + cardWidth;
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  };

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
      price: "$69",
      originalPrice: "$99",
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
      price: "$129",
      originalPrice: "$159",
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
      price: "$249",
      originalPrice: "$279",
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

  const mainPlansDe = [
    {
      name: "Basic",
      price: "€63",
      originalPrice: "€89",
      desc: "Ideal für Einsteiger & Kleinunternehmer",
      features: [
        { name: "Bis zu 5 Website-Seiten", included: true },
        { name: "Unbegrenzte Revisions", included: true },
        { name: "3 Business-E-Mails", included: true },
        { name: "WhatsApp-Integration", included: true },
        { name: "🎁 1 Jahr Hosting & .com-Domain", included: true },
        { name: "Google-SEO", included: false },
        { name: "3 SEO-Artikel", included: false },
        { name: "1 Monat Wartung", included: false }
      ],
      featured: false,
      btnText: "Basic-Paket wählen"
    },
    {
      name: "Professionell",
      price: "€119",
      originalPrice: "€149",
      desc: "Die beliebteste Wahl für Unternehmen",
      features: [
        { name: "Bis zu 10 Website-Seiten", included: true },
        { name: "Unbegrenzte Revisions", included: true },
        { name: "5 Business-E-Mails", included: true },
        { name: "WhatsApp-Integration", included: true },
        { name: "🎁 1 Jahr Hosting & .com-Domain", included: true },
        { name: "Google-SEO", included: true },
        { name: "3 SEO-Artikel", included: true },
        { name: "🎁 1 Monat Wartung & Updates", included: true }
      ],
      featured: true,
      btnText: "Professional-Paket wählen"
    },
    {
      name: "Premium",
      price: "€229",
      originalPrice: "€259",
      desc: "Für große & komplexe Geschäftsskalen",
      features: [
        { name: "10+ Website-Seiten", included: true },
        { name: "Unbegrenzte Revisions", included: true },
        { name: "5 Business-E-Mails", included: true },
        { name: "WhatsApp-Integration", included: true },
        { name: "Datenbank-Integration", included: true },
        { name: "Online-Anmeldeformular", included: true },
        { name: "🎁 1 Jahr Hosting & .com-Domain", included: true },
        { name: "Google-SEO", included: true },
        { name: "10 SEO-Artikel", included: true },
        { name: "Admin- & Dashboard-Funktionen", included: true },
        { name: "🎁 1 Jahr Wartung & Updates", included: true }
      ],
      featured: false,
      btnText: "Premium-Paket wählen"
    }
  ];


  const appPlansId = [
    {
      name: "Information System (IS)",
      price: "Hubungi Kami",
      desc: "Sistem internal (ERP, CRM, Keuangan, Inventaris) untuk efisiensi bisnis.",
      features: [
        { name: "Custom Dashboard & Database", included: true },
        { name: "Otomatisasi Pencatatan Keuangan", included: true },
        { name: "Manajemen Stok & Inventaris ERP", included: true },
        { name: "Multi-Level User Access Control", included: true },
        { name: "Integrasi API Pihak Ketiga & Cloud Server", included: true },
        { name: "Dashboard Analitik & Visualisasi Data", included: true },
        { name: "🎁 Dukungan Teknis & Maintenance 1 Tahun", included: true }
      ],
      featured: false,
      btnText: "Konsultasi Sistem IS"
    },
    {
      name: "Apps Development",
      price: "Hubungi Kami",
      desc: "Aplikasi mobile (Android & iOS) dan Web Apps kustom khusus.",
      features: [
        { name: "Aplikasi Kustom (React Native / Flutter)", included: true },
        { name: "Integrasi Payment Gateway & Pembayaran", included: true },
        { name: "Fitur Notifikasi Push & Akses GPS/Kamera", included: true },
        { name: "Desain UI/UX Kustom Sesuai Alur Bisnis", included: true },
        { name: "Server Setup, Security Hardening & SSL", included: true },
        { name: "🎁 Publikasi Play Store & App Store", included: true },
        { name: "Dukungan Teknis Penuh & Garansi 6 Bulan", included: true }
      ],
      featured: false,
      btnText: "Konsultasi App Dev"
    }
  ];

  const appPlansEn = [
    {
      name: "Information System (IS)",
      price: "Contact Us",
      desc: "Internal systems (ERP, CRM, Finance, Stock) to maximize business efficiency.",
      features: [
        { name: "Custom Dashboard & Database", included: true },
        { name: "Financial Recording & Invoicing Automation", included: true },
        { name: "Stock & Inventory Management (ERP)", included: true },
        { name: "Multi-Level User Access Control", included: true },
        { name: "Third-Party API & Cloud Server Integration", included: true },
        { name: "Analytical Dashboards & Data Visualization", included: true },
        { name: "🎁 Priority Support & 1-Year Maintenance", included: true }
      ],
      featured: false,
      btnText: "Consult Systems IS"
    },
    {
      name: "Apps Development",
      price: "Contact Us",
      desc: "Bespoke interactive mobile apps (Android & iOS) and web applications.",
      features: [
        { name: "Custom App Building (React Native / Flutter)", included: true },
        { name: "Payment Gateway & Subscriptions Integration", included: true },
        { name: "Push Notifications, Camera & GPS Features", included: true },
        { name: "Fully Custom UI/UX Tailored to Business Workflows", included: true },
        { name: "Secure Server Hosting Setup & SSL", included: true },
        { name: "🎁 App Store & Play Store Submissions", included: true },
        { name: "Full Technical Support & 6-Month Warranty", included: true }
      ],
      featured: false,
      btnText: "Consult App Dev"
    }
  ];

  const appPlansDe = [
    {
      name: "Informationssystem (IS)",
      price: "Kontaktieren Sie uns",
      desc: "Interne Systeme (ERP, CRM, Finanzen, Lager) zur Maximierung der Unternehmenseffizienz.",
      features: [
        { name: "Custom Dashboard & Datenbank", included: true },
        { name: "Automatisierung der Finanzbuchhaltung", included: true },
        { name: "Bestands- & Lagerverwaltung (ERP)", included: true },
        { name: "Multi-Level-Benutzerzugriffskontrolle", included: true },
        { name: "Drittanbieter-API & Cloud-Server-Integration", included: true },
        { name: "Analytische Dashboards & Datenvisualisierung", included: true },
        { name: "🎁 Priorisierter Support & 1 Jahr Wartung", included: true }
      ],
      featured: false,
      btnText: "IS-Systemberatung"
    },
    {
      name: "App-Entwicklung",
      price: "Kontaktieren Sie uns",
      desc: "Maßgeschneiderte interaktive mobile Apps (Android & iOS) und Webanwendungen.",
      features: [
        { name: "Custom App-Entwicklung (React Native / Flutter)", included: true },
        { name: "Zahlungsgateway- & Abonnement-Integration", included: true },
        { name: "Push-Benachrichtigungen, Kamera- & GPS-Funktionen", included: true },
        { name: "Vollständig individuelles UI/UX für Workflows", included: true },
        { name: "Sichere Server-Hosting-Einrichtung & SSL", included: true },
        { name: "🎁 App Store- & Play Store-Einreichungen", included: true },
        { name: "Voller technischer Support & 6 Monate Garantie", included: true }
      ],
      featured: false,
      btnText: "App-Entwicklungsberatung"
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
      price: "$69",
      originalPrice: "$99",
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
      price: "$109",
      originalPrice: "$159",
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
      price: "$219",
      originalPrice: "$279",
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

  const seoPlansDe = [
    {
      name: "Starter",
      price: "€63",
      originalPrice: "€89",
      desc: "Ideal für lokale Unternehmen & KKMU",
      features: [
        { name: "Bis zu 10 primäre Keywords", included: true },
        { name: "Google My Business- & Maps-Optimierung", included: true },
        { name: "Bestehendes Inhaltsaudit", included: true },
        { name: "Technische Grundlagen- & Linkfehlerbehebung", included: true },
        { name: "Basis-Backlink-Profiling", included: true },
        { name: "Monatliche Berichte (E-Mail/PDF)", included: true },
        { name: "Eingehende Wettbewerbsanalyse", included: false }
      ],
      featured: false,
      btnText: "Starter-Paket wählen"
    },
    {
      name: "Wachstum",
      price: "€99",
      originalPrice: "€149",
      desc: "Für wachsende Unternehmen",
      features: [
        { name: "Bis zu 30 umfassende Keywords", included: true },
        { name: "Optimierung von Filialkarten (falls vorhanden)", included: true },
        { name: "4 – 6 SEO-Artikel pro Monat", included: true },
        { name: "Website-Struktur & Geschwindigkeitsoptimierung", included: true },
        { name: "Content-Platzierung (mittlere Medien)", included: true },
        { name: "Strategieanalyse von 3 Hauptkonkurrenten", included: true },
        { name: "Monatlicher Bericht + Zoom (30 Min.)", included: true }
      ],
      featured: true,
      btnText: "Growth-Paket wählen"
    },
    {
      name: "Enterprise",
      price: "€199",
      originalPrice: "€259",
      desc: "Für nationale Marken & E-Commerce",
      features: [
        { name: "Unbegrenzte Keywords (All-Funnel)", included: true },
        { name: "Multi-Standort / Filial-Optimierung", included: true },
        { name: "10 – 15 ausführliche Artikel pro Monat", included: true },
        { name: "Erweitertes SEO (CWV & Schema-Markup)", included: true },
        { name: "Premium-Backlinks (nationale Hauptmedien)", included: true },
        { name: "Kontinuierliche Wettbewerbsanalyse", included: true },
        { name: "Live-Dashboard + Dedizierter Manager", included: true }
      ],
      featured: false,
      btnText: "Enterprise-Paket wählen"
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
      price: "$49",
      originalPrice: "$65",
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
      price: "$89",
      originalPrice: "$115",
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
      price: "$159",
      originalPrice: "$199",
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

  const sosmedPlansDe = [
    {
      name: "Basic",
      price: "€45",
      originalPrice: "€59",
      desc: "Erstes digitales Image",
      features: [
        { name: "10 Grafikdesign-Feeds", included: true },
        { name: "3 Kurzvideos (Reels/TikTok)", included: true },
        { name: "3 interaktive Stories", included: true },
        { name: "2x kleinere Revisions", included: true },
        { name: "Bio- & Highlight-Optimierung", included: false },
        { name: "Setup von Werbekampagnen (Ads)", included: false },
        { name: "Umfassendes Kontoaudit", included: false },
        { name: "Monatlicher Leistungsbericht", included: false }
      ],
      featured: false,
      btnText: "Basic-Paket wählen"
    },
    {
      name: "Medium",
      price: "€79",
      originalPrice: "€105",
      desc: "Bestes Paket für wachsende KKMU",
      features: [
        { name: "24 Grafikdesign-Feeds", included: true },
        { name: "8 Kurzvideos (Reels/TikTok)", included: true },
        { name: "8 interaktive Stories", included: true },
        { name: "3x kleinere Revisions", included: true },
        { name: "Bio- & Highlight-Optimierung", included: true },
        { name: "Setup von Werbekampagnen (Ads)", included: true },
        { name: "Umfassendes Kontoaudit", included: false },
        { name: "Monatlicher Leistungsbericht", included: false }
      ],
      featured: true,
      btnText: "Medium-Paket wählen"
    },
    {
      name: "Professionell",
      price: "€149",
      originalPrice: "€185",
      desc: "Premium-Reputation & Automatisierung",
      features: [
        { name: "45 Grafikdesign-Feeds", included: true },
        { name: "12 Kurzvideos (Reels/TikTok)", included: true },
        { name: "12 interaktive Stories", included: true },
        { name: "Unbegrenzte kleinere Revisions", included: true },
        { name: "Bio- & Highlight-Optimierung", included: true },
        { name: "Setup von Werbekampagnen (Ads)", included: true },
        { name: "Umfassendes Kontoaudit", included: true },
        { name: "Monatlicher Leistungsbericht (Monthly)", included: true }
      ],
      featured: false,
      btnText: "Professional-Paket wählen"
    },
    {
      name: "Custom Package",
      price: "Individuell",
      desc: "Auf Ihren Umfang & Ihr Budget zugeschnitten",
      features: [
        { name: "Individuelle Inhaltsanzahl pro Monat", included: true },
        { name: "Dedizierte Brainstorming-Sitzung", included: true },
        { name: "Custom Copywriting & Talent", included: true },
        { name: "Dedizierter Content-Spezialist", included: true },
        { name: "Integrierte Multi-Platform-Strategie", included: true }
      ],
      featured: false,
      btnText: "Individuelles Paket besprechen"
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
      price: "$25 / yr",
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
      price: "$19",
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
      price: "$9 / mo",
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
      price: "$19 / mo",
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
      price: "$49 / mo",
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

  const maintenancePlansListDe = [
    {
      name: "Verlängerung",
      category: "Management",
      price: "€23 / Jahr",
      desc: "Nur Hosting & Domain",
      isRenewal: true,
      features: [
        "Domain-Verlängerung (.com)",
        "Speicherplatzmiete (Hosting)",
        "Website bleibt aktiv & sicher"
      ],
      btnText: "Paket wählen",
      targetId: "renewal-detail"
    },
    {
      name: "Logo-Design",
      category: "Design",
      price: "€17",
      features: [
        "3 Designkonzepte",
        "Max. 2x Revisions",
        "3 Werktage Bearbeitungszeit",
        "Master-Dateien (AI/EPS/SVG)"
      ],
      featured: false,
      btnText: "Paket wählen",
      targetId: "design-logo"
    },
    {
      name: "Basic",
      category: "Maintenance",
      price: "€8 / Monat",
      features: [
        "Produktion von 1 Artikel/Monat",
        "Schneller Reaktionssupport",
        "Uptime-Überwachung",
        "Wöchentliches Backup",
        "Fehlerbehebung"
      ],
      featured: false,
      btnText: "Paket wählen",
      targetId: "maintenance-Basic"
    },
    {
      name: "Professionell",
      category: "Maintenance",
      price: "€17 / Monat",
      features: [
        "Produktion von 4 Artikeln/Monat",
        "Aktualisierung von Seiteninhalten",
        "Schneller Reaktionssupport",
        "Uptime-Überwachung",
        "Wöchentliches Backup",
        "Fehlerbehebung",
        "Keyword-Optimierung"
      ],
      featured: false,
      btnText: "Paket wählen",
      targetId: "maintenance-Profesional"
    },
    {
      name: "Premium",
      category: "Maintenance",
      price: "€45 / Monat",
      features: [
        "Produktion von 8 Artikeln/Monat",
        "Hinzufügen neuer Seiten",
        "Aktualisierung von Seiteninhalten",
        "Schneller Reaktionssupport",
        "Uptime-Überwachung",
        "Wöchentliches Backup",
        "Erweiterte SEO-Optimierung",
        "Wöchentliches SEO-Audit"
      ],
      featured: false,
      btnText: "Paket wählen",
      targetId: "maintenance-Premium"
    }
  ];


  const monitoringPlansId = [
    { name: "BASIC NEWS", price: "Rp10.500.000" },
    { name: "SOSMED", price: "Rp13.500.000" },
    { name: "PROFESIONAL", price: "Rp14.500.000" },
    { name: "ENTERPRISE", price: "Rp16.500.000" },
    { name: "ULTIMATE", price: "Rp18.500.000" },
    { name: "DIAMOND", price: "Rp29.900.000" }
  ];

  const monitoringPlansEn = [
    { name: "BASIC NEWS", price: "$699" },
    { name: "SOSMED", price: "$899" },
    { name: "PROFESSIONAL", price: "$949" },
    { name: "ENTERPRISE", price: "$1,099" },
    { name: "ULTIMATE", price: "$1,249" },
    { name: "DIAMOND", price: "$1,999" }
  ];

  const monitoringPlansDe = [
    { name: "BASIC NEWS", price: "€639" },
    { name: "SOSMED", price: "€819" },
    { name: "PROFESSIONELL", price: "€869" },
    { name: "ENTERPRISE", price: "€999" },
    { name: "ULTIMATE", price: "€1.139" },
    { name: "DIAMOND", price: "€1.829" }
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

  const monitoringFeaturesDe = [
    { label: "Anzahl der Benutzer", values: ["1 Benutzer", "1 Benutzer", "1 Benutzer", "3 Benutzer", "5 Benutzer", "5 Benutzer"] },
    { label: "Anzahl der Themen", values: ["5", "5", "5", "8", "10", "12"] },
    { label: "Online-News-Abdeckung", values: [true, false, true, true, true, true] },
    { label: "Dedizierte soziale Medien (IG, X, YT, FB)", values: [false, true, "Nur X", true, true, true] },
    { label: "Printmedien (100 Outlets)", values: [false, false, false, false, true, true] },
    { label: "Fernsehen (10 Kanäle)", values: [false, false, false, false, false, true] },
    { label: "Sentiment-Profilierung", values: [true, true, true, true, true, true] },
    { label: "Identifikation von Top-Personen & Organisationen", values: [true, true, true, true, true, true] },
    { label: "Datenextraktion", values: [true, true, true, true, true, true] },
    { label: "Datenvergleichsmatrizen", values: [true, true, true, true, true, true] },
    { label: "Trendanalyse-Engine", values: [true, true, true, true, true, true] },
    { label: "Wordcloud- / Hashtag-Tracking", values: [true, true, true, true, true, true] },
    { label: "Redaktionelle Überprüfung von News", values: [true, false, true, true, true, true] },
    { label: "Standort- / Geotargeting", values: [true, false, true, true, true, true] },
    { label: "IG-Listening (max. 3 Konten)", values: [false, true, false, false, true, true] },
    { label: "Tägliches Zusammenfassungs-Feed", values: [false, false, false, false, true, true] },
    { label: "Monatlicher dynamischer Bericht", values: [false, false, false, true, true, true] }
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
      tabApps: "Pembuatan Aplikasi",
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
      tabApps: "App Development",
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
        { item: "Additional Topic", price: "$65 / topic" },
        { item: "Additional TV/Radio", price: "$95 / channel" },
        { item: "Weekly Report", price: "$195 / month" },
        { item: "Daily Report", price: "$195 / month" },
        { item: "Additional Listening Account", price: "$35 / account" },
        { item: "Incidental Special Report", price: "$95 / report" },
        { item: "Additional Print Media", price: "$325 / 30 outlets" },
        { item: "User Increment", price: "$19 / user" },
        { item: "SNA (Social Network Analysis)", price: "$129 / month" },
        { item: "Tiktok Feeds Data", price: "$195 / month" },
        { item: "Linkedin Profile Data", price: "$195 / month" }
      ],
      monOneTimes: [
        { item: "1-Month Historical Data", price: "$499" },
        { item: "3-Month Historical Data", price: "$949" },
        { item: "6-Month Historical Data", price: "$1,549" },
        { item: "12-Month Historical Data", price: "$2,499" },
        { item: "24-Month Historical Data", price: "$3,749" }
      ],
      monTermsList: [
        "Minimum contract subscription duration of 6 months.",
        "Get a 10% discount if payment is settled 100% in advance.",
        "Custom packages will be adjusted based on detailed requirements and scope."
      ]
    },
    de: {
      promo: "🎉 BEGRENZTES ANGEBOT: Kostenlose Domain & ultraschnelles Hosting für 1 ganzes Jahr!",
      title: "Unsere spezialisierten Leistungspakete",
      subtitle: "Wählen Sie das Paket, das für die Beschleunigung Ihres Geschäftswachstums am relevantesten ist.",
      guarantee: "🛡️ Umsetzungsgarantie bis zur vollen Zufriedenheit",
      addonTitle: "Zusatzleistungen (Add-ons)",
      addonSubtitle: "Zusätzliche Dienstleistungen zur Unterstützung des Wachstums und der Performance Ihrer digitalen Assets.",
      tabWeb: "Webentwicklung",
      tabApps: "App-Entwicklung",
      tabSEO: "Google SEO",
      tabSosmed: "Social Media",
      tabMonitoring: "Media Monitoring",
      extraBonus: "🔥 EXTRA-BONI (IN ALLEN SOCIAL-MEDIA-PAKETEN ENTHALTEN):",
      bonuses: [
        "Kostenlose Texterstellung für Captions",
        "Private WhatsApp-Diskussionsgruppe",
        "Kostenloser monatlicher Inhaltsplaner",
        "Kostenloses Posten von Inhalten durch Admins",
        "Voice-Over / Sprecher (Optional)",
        "1x kostenlose Zoom-Brainstorming-Sitzung"
      ],
      customPrompt: "Benötigen Sie ein speziell zugeschnittenes Social-Media-Paket?",
      discussBtn: "Besprechen Sie Ihre Anforderungen",
      monitoringAddon: "Zusatzleistungsgebühren",
      monitoringOneTime: "Einmaliger historischer Bericht",
      monitoringTerms: "Allgemeine Geschäftsbedingungen",
      monAddons: [
        { item: "Zusätzliches Thema", price: "€59 / Thema" },
        { item: "Zusätzliches TV/Radio", price: "€87 / Kanal" },
        { item: "Wöchentlicher Bericht", price: "€179 / Monat" },
        { item: "Täglicher Bericht", price: "€179 / Monat" },
        { item: "Zusätzliches Listening-Konto", price: "€29 / Konto" },
        { item: "Inzidenteller Sonderbericht", price: "€87 / Bericht" },
        { item: "Zusätzliche Printmedien", price: "€295 / 30 Outlets" },
        { item: "Benutzererhöhung", price: "€17 / Benutzer" },
        { item: "SNA (Social Network Analysis)", price: "€115 / Monat" },
        { item: "Tiktok-Feeds-Daten", price: "€175 / Monat" },
        { item: "Linkedin-Profildaten", price: "€175 / Monat" }
      ],
      monOneTimes: [
        { item: "Historische Daten für 1 Monat", price: "€459" },
        { item: "Historische Daten für 3 Monate", price: "€869" },
        { item: "Historische Daten für 6 Monate", price: "€1.415" },
        { item: "Historische Daten für 12 Monate", price: "€2.285" },
        { item: "Historische Daten für 24 Monate", price: "€3.429" }
      ],
      monTermsList: [
        "Mindestvertragslaufzeit des Abonnements 6 Monate.",
        "Erhalten Sie 10% Rabatt bei 100% Vorauszahlung.",
        "Individuelle Pakete werden basierend auf den detaillierten Anforderungen und dem Umfang angepasst."
      ]
    }
  };

  const mainPlans = language === 'en' ? mainPlansEn : language === 'de' ? mainPlansDe : mainPlansId;
  const seoPlans = language === 'en' ? seoPlansEn : language === 'de' ? seoPlansDe : seoPlansId;
  const sosmedPlans = language === 'en' ? sosmedPlansEn : language === 'de' ? sosmedPlansDe : sosmedPlansId;
  const appPlans = language === 'en' ? appPlansEn : language === 'de' ? appPlansDe : appPlansId;
  const maintenancePlansList = language === 'en' ? maintenancePlansListEn : language === 'de' ? maintenancePlansListDe : maintenancePlansListId;
  const monitoringPlans = language === 'en' ? monitoringPlansEn : language === 'de' ? monitoringPlansDe : monitoringPlansId;
  const monitoringFeatures = language === 'en' ? monitoringFeaturesEn : language === 'de' ? monitoringFeaturesDe : monitoringFeaturesId;
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
              className={`pricing-tab ${activeCategory === 'apps' ? 'active' : ''}`}
              onClick={() => setActiveCategory('apps')}
            >
              {t.tabApps}
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
                {plan.featured && <div className="featured-badge gold-ribbon">{language === 'en' ? 'POPULAR' : language === 'de' ? 'BELIEBT' : 'POPULER'}</div>}

                <div className="pricing-header">
                  <img src={getPlanIcon(plan.name)} alt="" className="pricing-tier-icon" />
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
                  <div className="app-feature-badges-container">
                    {plan.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className={`app-feature-badge ${!feature.included ? 'not-included' : ''}`}
                      >
                        <span className="badge-icon">
                          {feature.included ? getFeatureIcon(feature.name) : <FiX />}
                        </span>
                        <span>{feature.name}</span>
                      </div>
                    ))}
                  </div>
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

        {/* Tab 5: App Development Packages */}
        {activeCategory === 'apps' && (
          <div className="animate-entrance">
            <div className="pricing-grid max-w-4xl mx-auto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', justifyContent: 'center' }}>
              {appPlans.map((plan, index) => (
                <div key={index} className={`pricing-card glass-card ${plan.featured ? 'featured' : ''}`}>
                  {plan.featured && <div className="featured-badge gold-ribbon">{language === 'en' ? 'POPULAR' : language === 'de' ? 'BELIEBT' : 'POPULER'}</div>}

                  <div className="pricing-header">
                    <img src={getPlanIcon(plan.name)} alt="" className="pricing-tier-icon" />
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-price-container">
                      {plan.originalPrice && (
                        <span className="original-price">{plan.originalPrice}</span>
                      )}
                      <div className="plan-price gold-text" style={{ fontSize: '1.8rem', minHeight: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {plan.price}
                      </div>
                    </div>
                  </div>

                  <div className="pricing-features">
                    <div className="app-feature-badges-container">
                      {plan.features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className={`app-feature-badge ${!feature.included ? 'not-included' : ''}`}
                        >
                          <span className="badge-icon">
                            {feature.included ? getFeatureIcon(feature.name) : <FiX />}
                          </span>
                          <span>{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pricing-action">
                    <button 
                      onClick={() => openWhatsAppModal(`IS & Apps Dev - ${plan.name}`)}
                      className="btn w-full btn-blue"
                    >
                      {plan.btnText}
                    </button>
                    <p className="text-center mt-4 text-sm text-gray-400 font-medium" style={{ opacity: 0.8 }}>{t.guarantee}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: SEO Services */}
        {activeCategory === 'seo' && (
          <div className="pricing-grid animate-entrance">
            {seoPlans.map((plan, index) => (
              <div key={index} className={`pricing-card glass-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <div className="featured-badge gold-ribbon">{language === 'en' ? 'BEST VALUE' : language === 'de' ? 'BESTES ANGEBOT' : 'TERBAIK'}</div>}

                <div className="pricing-header">
                  <img src={getPlanIcon(plan.name)} alt="" className="pricing-tier-icon" />
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price-container">
                    {plan.originalPrice && (
                      <span className="original-price">{plan.originalPrice}</span>
                    )}
                    <div className="plan-price gold-text">
                      {plan.price} <span className="price-period" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{language === 'en' ? '/mo' : language === 'de' ? '/Monat' : '/bln'}</span>
                    </div>
                  </div>
                </div>

                <div className="pricing-features">
                  <div className="app-feature-badges-container">
                    {plan.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className={`app-feature-badge ${!feature.included ? 'not-included' : ''}`}
                      >
                        <span className="badge-icon">
                          {feature.included ? getFeatureIcon(feature.name) : <FiX />}
                        </span>
                        <span>{feature.name}</span>
                      </div>
                    ))}
                  </div>
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
            <div className="sosmed-slider-outer">
              <button 
                className="slider-arrow prev" 
                onClick={() => scrollSosmed('left')} 
                aria-label="Previous"
              >
                <FiChevronLeft size={32} />
              </button>

              <div className="sosmed-scroll-container" ref={sosmedScrollRef}>
                {sosmedPlans.map((plan, index) => (
                  <div key={index} className={`pricing-card glass-card sosmed-card ${plan.featured ? 'featured' : ''}`}>
                    {plan.featured && <div className="featured-badge gold-ribbon">{language === 'en' ? 'POPULAR' : language === 'de' ? 'BELIEBT' : 'POPULER'}</div>}

                    <div className="pricing-header">
                      <img src={getPlanIcon(plan.name)} alt="" className="pricing-tier-icon" />
                      <h3 className="plan-name">{plan.name}</h3>
                      <div className="plan-price-container">
                        {plan.originalPrice && (
                          <span className="original-price">{plan.originalPrice}</span>
                        )}
                        <div className="plan-price gold-text">
                          {plan.price}
                          {plan.price !== 'Kustom' && plan.price !== 'Custom' && plan.price !== 'Individuell' && (
                            <span className="price-period" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{language === 'en' ? '/mo' : language === 'de' ? '/Monat' : '/bln'}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pricing-features">
                      <div className="app-feature-badges-container">
                        {plan.features.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className={`app-feature-badge ${!feature.included ? 'not-included' : ''}`}
                          >
                            <span className="badge-icon">
                              {feature.included ? getFeatureIcon(feature.name) : <FiX />}
                            </span>
                            <span>{feature.name}</span>
                          </div>
                        ))}
                      </div>
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
                {/* Spacer to prevent final card cropping */}
                <div className="sosmed-scroll-spacer" style={{ flex: '0 0 5rem', width: '5rem', minWidth: '5rem', height: '1px', pointerEvents: 'none' }}></div>
              </div>

              <button 
                className="slider-arrow next" 
                onClick={() => scrollSosmed('right')} 
                aria-label="Next"
              >
                <FiChevronRight size={32} />
              </button>
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
                    <th className="feature-col">{language === 'en' ? 'Features / Components' : language === 'de' ? 'Features / Komponenten' : 'Fitur / Komponen'}</th>
                    {monitoringPlans.map((plan, idx) => (
                      <th key={idx} className="pkg-col">
                        <div className="pkg-header">
                          <span className="pkg-title">{plan.name}</span>
                          <span className="pkg-price gold-text">{plan.price}</span>
                          <span className="pkg-period">{language === 'en' ? '/mo' : language === 'de' ? '/Monat' : '/bln'}</span>
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
                          {language === 'en' ? 'Order' : language === 'de' ? 'Bestellen' : 'Pesan'}
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
                          <img src={getPlanIcon(plan.name)} alt="" className="pricing-tier-icon" />
                          <span className="card-category">{plan.category}</span>
                          <h3 className="plan-name">{plan.name}</h3>
                          <div className="plan-price gold-text">
                            {plan.price}
                          </div>
                        </div>

                        <div className="pricing-features">
                          <div className="app-feature-badges-container" style={{ minHeight: 'auto' }}>
                            {plan.features.map((feature, idx) => (
                              <div key={idx} className="app-feature-badge">
                                <span className="badge-icon">
                                  {getFeatureIcon(feature)}
                                </span>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
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

