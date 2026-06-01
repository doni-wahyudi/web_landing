import tanyaadvokatImg from '../assets/portfolio/tanyaadvokat.webp';
import bimbelJuniorImg from '../assets/portfolio/bimbel_junior.webp';
import putrakaryaImg from '../assets/portfolio/putrakarya.webp';
import aurobarbersImg from '../assets/portfolio/aurobarbers.webp';
import bimbelWebImg from '../assets/portfolio/bimbel_web.webp';
import clinicImg from '../assets/portfolio/clinic.webp';
import rentalImg from '../assets/portfolio/rental.webp';
import bakeryImg from '../assets/portfolio/bakery.webp';
import glowmartImg from '../assets/portfolio/glowmart.webp';
import intanmiracleImg from '../assets/portfolio/intanmiracle.webp';
import bagaspramonoImg from '../assets/portfolio/bagaspramono.webp';

export const projects = [
  {
    id: 1,
    title: "TanyaAdvokat.id",
    category: {
      id: "Konsultasi & Layanan Hukum",
      en: "Legal Consultation & Services",
      de: "Rechtsberatung & Dienstleistungen"
    },
    url: "https://tanyaadvokat.id",
    image: tanyaadvokatImg,
    challenge: {
      id: "Masyarakat dan UMKM seringkali kesulitan mendapatkan akses konsultasi hukum yang transparan, terpercaya, dan terjangkau secara digital.",
      en: "The public and MSMEs often face difficulties accessing transparent, trustworthy, and affordable legal consultation services digitally.",
      de: "Die Öffentlichkeit und Kleinst-, kleine und mittlere Unternehmen (KKMU) haben oft Schwierigkeiten, digital Zugang zu transparenter, vertrauenswürdiger und erschwinglicher Rechtsberatung zu erhalten."
    },
    solution: {
      id: "Platform portal hukum dinamis dengan fitur direktori advokat, informasi biaya layanan yang transparan, modul khusus UMKM Go, manajemen konten blog hukum, serta integrasi database Supabase.",
      en: "A dynamic legal portal platform featuring a lawyer directory, transparent service fee structures, a dedicated MSME Go module, legal blog content management, and Supabase database integration.",
      de: "Eine dynamische Rechtsportal-Plattform mit einem Anwaltsverzeichnis, transparenten Servicegebührenstrukturen, einem speziellen KKMU-Modul, der Verwaltung von Rechtsblog-Inhalten und der Supabase-Datenbankintegration."
    },
    outcome: {
      id: "Menjembatani pencari keadilan dengan advokat profesional secara mudah, meningkatkan kesadaran hukum UMKM, dan mendigitalisasi manajemen dokumentasi hukum.",
      en: "Easily bridges justice seekers with professional lawyers, increases MSME legal awareness, and digitizes legal documentation management.",
      de: "Verbindet Rechtssuchende unkompliziert mit professionellen Anwälten, stärkt das Rechtsbewusstsein von KKMU und digitalisiert die Verwaltung rechtlicher Dokumente."
    },
    techStack: ["React", "TypeScript", "Vite", "React Router", "Supabase", "Swiper"]
  },
  {
    id: 2,
    title: "Bimbel Junior",
    category: {
      id: "Landing Page Pendidikan",
      en: "Education Landing Page",
      de: "Bildung Landing Page"
    },
    url: "https://doni-wahyudi.github.io/bimbel_junior/",
    image: bimbelJuniorImg,
    challenge: {
      id: "Lembaga bimbingan belajar anak-anak yang memerlukan platform digital responsif berkecepatan tinggi untuk mengenalkan program, profil pengajar, transparansi legalitas, serta pendaftaran siswa baru secara langsung via WhatsApp.",
      en: "A children's tutoring center requiring a high-speed, responsive digital platform to introduce programs, teacher profiles, public legality compliance, and direct WhatsApp new student registration.",
      de: "Ein Nachhilfezentrum für Kinder, das eine schnelle, responsive digitale Plattform benötigt, um Programme, Lehrerprofile, die Einhaltung gesetzlicher Vorschriften und die direkte Anmeldung neuer Schüler über WhatsApp vorzustellen."
    },
    solution: {
      id: "Website modern dengan sistem dynamic routing, cross-fade hero slider, visual timeline transit interaktif, integrasi dokumen PDF legalitas, dan form pendaftaran instan tanpa redundansi data.",
      en: "A modern website with dynamic routing, a cross-fade hero slider, interactive transit timeline visualizers, integrated PDF legality preview documents, and streamlined registration form direct pathways.",
      de: "Eine moderne Website mit dynamischem Routing, einem Cross-Fade-Hero-Slider, interaktiven Zeitachsen-Visualisierungen, integrierten PDF-Vorschauen für rechtliche Dokumente und optimierten Anmeldeformularen."
    },
    outcome: {
      id: "Menghilangkan hambatan pendaftaran siswa baru, memperkuat kepercayaan orang tua melalui keterbukaan dokumen legal, dan menciptakan citra akademis yang premium di Tanjung Priok.",
      en: "Eliminates barriers to new student enrollment, reinforces parents' trust through legal transparency documents, and establishes a premium academic brand image in Tanjung Priok.",
      de: "Beseitigt Hürden bei der Anmeldung neuer Schüler, stärkt das Vertrauen der Eltern durch transparente rechtliche Dokumente und etabliert ein erstklassiges akademisches Markenimage in Tanjung Priok."
    },
    techStack: ["React", "TypeScript", "Vite", "React Router", "Lucide Icons", "Markdown"]
  },
  {
    id: 3,
    title: "Bimbel Web",
    category: {
      id: "Landing Page Pendidikan",
      en: "Education Landing Page",
      de: "Bildung Landing Page"
    },
    url: "https://aurotechbimbel.my.id/",
    image: bimbelWebImg,
    challenge: {
      id: "Lembaga bimbingan belajar yang membutuhkan platform digital profesional untuk program pendaftaran siswa baru dan tes diagnostik.",
      en: "A tutoring institution requiring a professional digital platform for new student registration and diagnostic testing programs.",
      de: "Eine Nachhilfeinstitution, die eine professionelle digitale Plattform für die Anmeldung neuer Schüler und diagnostische Testprogramme benötigt."
    },
    solution: {
      id: "Landing page modern dengan fitur pendaftaran online, tes diagnostik terintegrasi, dan dashboard manajemen siswa.",
      en: "A modern landing page with online registration features, integrated diagnostic testing, and a student management dashboard.",
      de: "Eine moderne Landing Page mit Online-Anmeldefunktionen, integrierten diagnostischen Tests und einem Dashboard zur Schülerverwaltung."
    },
    outcome: {
      id: "Memudahkan proses seleksi siswa dan meningkatkan efisiensi pendaftaran hingga 70%.",
      en: "Facilitates student selection and increases registration efficiency by up to 70%.",
      de: "Erleichtert die Schülerselektion und steigert die Effizienz der Anmeldung um bis zu 70%."
    },
    techStack: ["React", "TypeScript", "Vite", "React Router", "Context API"]
  },
  {
    id: 4,
    title: "KlinikSehat",
    category: {
      id: "Kesehatan & Reservasi",
      en: "Healthcare & Reservation",
      de: "Gesundheitswesen & Reservierung"
    },
    url: "https://aurotechklinik.my.id/",
    image: clinicImg,
    challenge: {
      id: "Klinik kesehatan yang memerlukan sistem reservasi online yang efisien dan portal informasi layanan medis yang transparan.",
      en: "A healthcare clinic requiring an efficient online reservation system and a transparent medical service information portal.",
      de: "Eine Gesundheitseinrichtung, die ein effizientes Online-Reservierungssystem und ein transparentes Informationsportal für medizinische Dienstleistungen benötigt."
    },
    solution: {
      id: "Portal kesehatan modern dengan fitur booking dokter, informasi jadwal poli, dan integrasi database untuk manajemen pasien.",
      en: "A modern healthcare portal with doctor booking features, clinic schedule information, and database integration for patient management.",
      de: "Ein modernes Gesundheitsportal mit Funktionen zur Arztbuchung, Informationen zum Klinikplan und Datenbankintegration für das Patientenmanagement."
    },
    outcome: {
      id: "Mengurangi waktu tunggu pasien dan meningkatkan akurasi jadwal konsultasi sebesar 50%.",
      en: "Reduces patient waiting time and increases consultation schedule accuracy by 50%.",
      de: "Verkürzt die Wartezeiten der Patienten und erhöht die Genauigkeit der Konsultationspläne um 50%."
    },
    techStack: ["React", "TypeScript", "Vite", "Supabase"]
  },
  {
    id: 5,
    title: "Putra Karya Pallet",
    category: {
      id: "Profil Perusahaan & B2B",
      en: "Company Profile & B2B",
      de: "Unternehmensprofil & B2B"
    },
    url: "https://putrakaryapallet.com/",
    image: putrakaryaImg,
    challenge: {
      id: "Supplier pallet kayu industri yang memerlukan kehadiran digital untuk menjangkau klien korporasi skala nasional.",
      en: "An industrial wooden pallet supplier requiring a digital presence to reach national-scale corporate clients.",
      de: "Ein Lieferant von industriellen Holzpaletten, der eine digitale Präsenz benötigt, um landesweit Firmenkunden zu erreichen."
    },
    solution: {
      id: "Website profil perusahaan profesional yang menonjolkan katalog produk industri, standar kualitas, dan form penawaran B2B.",
      en: "A professional company profile website showcasing industrial product catalogs, quality standards, and B2B inquiry forms.",
      de: "Eine professionelle Unternehmensprofil-Website, die industrielle Produktkataloge, Qualitätsstandards und B2B-Anfrageformulare präsentiert."
    },
    outcome: {
      id: "Memperluas jangkauan pasar hingga ke luar daerah dan meningkatkan lead B2B sebesar 40%.",
      en: "Expands market reach beyond the region and increases B2B leads by 40%.",
      de: "Erweitet die Marktreichweite über die Region hinaus und steigert die B2B-Leads um 40%."
    },
    techStack: ["React", "Vite", "SEO Optimized"]
  },
  {
    id: 6,
    title: "Auro Barbers",
    category: {
      id: "Halaman Bisnis & Pemesanan",
      en: "Business & Booking Page",
      de: "Geschäfts- & Buchungsseite"
    },
    url: "https://aurobarbers.web.id/",
    image: aurobarbersImg,
    challenge: {
      id: "Barbershop premium yang ingin mendigitalisasi layanan pemesanan dan membangun identitas brand yang modern.",
      en: "A premium barbershop wanting to digitize booking services and build a modern brand identity.",
      de: "Ein Premium-Barbershop, der seine Buchungsdienste digitalisieren und eine moderne Markenidentität aufbauen möchte."
    },
    solution: {
      id: "Website dengan desain estetika gelap dan elegan, fitur pemesanan jadwal terintegrasi, dan dukungan PWA untuk akses mobile cepat.",
      en: "A website with a dark and elegant aesthetic design, integrated schedule booking features, and PWA support for fast mobile access.",
      de: "Eine Website mit einem dunklen und eleganten ästhetischen Design, integrierten Terminbuchungsfunktionen und PWA-Unterstützung für schnellen mobilen Zugriff."
    },
    outcome: {
      id: "Meningkatkan jumlah booking harian dan memperkuat loyalitas pelanggan melalui akses digital yang mudah.",
      en: "Increases daily booking volume and strengthens customer loyalty through easy digital access.",
      de: "Steigert das tägliche Buchungsvolumen und stärkt die Kundenbindung durch einfachen digitalen Zugang."
    },
    techStack: ["React", "Vite", "Tailwind CSS", "PWA"]
  },
  {
    id: 7,
    title: "RentalKu",
    category: {
      id: "Transportasi & Rental Mobil",
      en: "Transportation & Car Rental",
      de: "Transport & Autovermietung"
    },
    url: "https://aurotechrental.my.id/",
    image: rentalImg,
    challenge: {
      id: "Penyedia jasa sewa mobil yang membutuhkan platform untuk mempermudah pelanggan dalam memilih armada dan melakukan pemesanan.",
      en: "A car rental service provider needing a platform to make it easier for customers to choose fleets and make bookings.",
      de: "Ein Autovermietungsanbieter, der eine Plattform benötigt, um Kunden die Auswahl der Fahrzeugflotte und die Buchung zu erleichtern."
    },
    solution: {
      id: "Landing page responsif dengan katalog armada lengkap, sistem booking WhatsApp sekali klik, dan detail layanan antar-jemput.",
      en: "A responsive landing page with a complete fleet catalog, one-click WhatsApp booking system, and shuttle service details.",
      de: "Eine responsive Landing Page mit einem vollständigen Fuhrparkkatalog, einem Ein-Klick-WhatsApp-Buchungssystem und Details zum Shuttle-Service."
    },
    outcome: {
      id: "Meningkatkan konversi pemesanan armada sebesar 60% melalui proses booking yang lebih ringkas.",
      en: "Increases fleet booking conversion by 60% through a more concise booking process.",
      de: "Steigert die Flottenbuchungskonversion um 60% durch einen übersichtlicheren Buchungsprozess."
    },
    techStack: ["React", "Vite"]
  },
  {
    id: 8,
    title: "Sweet Delights Bakery",
    category: {
      id: "Makanan & Minuman",
      en: "Food & Beverage",
      de: "Lebensmittel & Getränke"
    },
    url: "https://aurotechbakery.my.id/",
    image: bakeryImg,
    challenge: {
      id: "Toko kue artisan yang ingin menampilkan produk visualnya secara menarik untuk meningkatkan pesanan online.",
      en: "An artisan bakery wanting to display its visual products attractively to increase online orders.",
      de: "Eine handwerkliche Bäckerei, die ihre visuellen Produkte attraktiv präsentieren möchte, um Online-Bestellungen zu steigern."
    },
    solution: {
      id: "Desain website yang mengedepankan visual produk (appetizing design) dengan katalog menu terorganisir and CTA pemesanan langsung.",
      en: "A web design prioritizing product visuals (appetizing design) with an organized menu catalog and direct ordering CTAs.",
      de: "Ein Webdesign, das Produktbilder in den Vordergrund stellt (appetitliches Design), mit einem organisierten Menükatalog und direkten CTAs zur Bestellung."
    },
    outcome: {
      id: "Meningkatkan awareness brand dan volume pesanan kue kustom sebesar 45%.",
      en: "Increases brand awareness and custom cake order volume by 45%.",
      de: "Steigert die Markenbekanntheit und das Bestellvolumen für kundenorientierte Torten um 45%."
    },
    techStack: ["React", "Vite", "Custom Typography"]
  },
  {
    id: 9,
    title: "GlowMart",
    category: {
      id: "E-Commerce & Kecantikan",
      en: "E-Commerce & Beauty",
      de: "E-Commerce & Schönheit"
    },
    url: "http://glowmart.my.id/",
    image: glowmartImg,
    challenge: {
      id: "Platform retail kecantikan yang membutuhkan antarmuka belanja yang estetik dan navigasi mobile yang lancar.",
      en: "A beauty retail platform requiring an aesthetic shopping interface and smooth mobile navigation.",
      de: "Eine Kosmetik-Einzelhandelsplattform, die eine ästhetische Einkaufsoberfläche und eine reibungslose mobile Navigation benötigt."
    },
    solution: {
      id: "Website e-commerce modern dengan katalog produk yang tertata, desain elegan yang selaras dengan brand kecantikan, dan performa loading cepat.",
      en: "A modern e-commerce website with an organized product catalog, elegant design aligned with the beauty brand, and fast loading performance.",
      de: "Eine moderne E-Commerce-Website mit einem organisierten Produktkatalog, elegantem Design passend zur Kosmetikmarke und schneller Ladeleistung."
    },
    outcome: {
      id: "Memperbaiki pengalaman belanja pelanggan dan menurunkan bounce rate sebesar 20%.",
      en: "Improves the customer shopping experience and reduces bounce rate by 20%.",
      de: "Verbessert das Einkaufserlebnis der Kunden und senkt die Absprungrate um 20%."
    },
    techStack: ["React", "Vite"]
  },
  {
    id: 10,
    title: "Intan Miracle",
    category: {
      id: "Perawatan Ibu & Bayi",
      en: "Mom & Baby Care",
      de: "Mutter- & Babypflege"
    },
    url: "https://intanmiracle.com",
    image: intanmiracleImg,
    challenge: {
      id: "Ibu nifas dan bayi seringkali membutuhkan perawatan kesehatan, kebidanan, laktasi, dan spa profesional pasca-melahirkan yang aman dan higienis secara langsung di rumah tanpa repot keluar rumah.",
      en: "Postpartum mothers and infants often require professional, safe, and hygienic healthcare, midwifery, lactation, and spa treatments directly in the comfort of their home without the hassle of traveling.",
      de: "Mütter im Wochenbett und Säuglinge benötigen nach der Geburt oft professionelle, sichere und hygienische Gesundheits-, Hebammen-, Laktations- und Spa-Behandlungen direkt und bequem zu Hause, ohne reisen zu müssen."
    },
    solution: {
      id: "Platform digital Mom & Baby Care terpercaya dengan sistem pemesanan online reservasi homecare terintegrasi, manajemen rekam medis/terapis profesional, direktori layanan lengkap (Baby Massage, Pijat Laktasi, Pijat Ibu Hamil/Nifas), serta integrasi database Supabase untuk pemantauan pasien.",
      en: "A trusted digital Mom & Baby Care platform with integrated online homecare reservation booking, professional therapist/medical record management, a comprehensive service catalog (Baby Massage, Lactation Massage, Prenatal/Postnatal Pijat), and Supabase patient tracking database integration.",
      de: "Eine vertrauenswürdige digitale Mutter- & Babypflege-Plattform mit integrierter Online-Homecare-Reservierung, professioneller Therapeuten-/Patientenakten-Verwaltung, einem umfassenden Leistungskatalog (Babymassage, Laktationsmassage, Schwangerschafts-/Wochenbettmassage) und Supabase-Patientenverfolgungs-Datenbankintegration."
    },
    outcome: {
      id: "Menghubungkan ratusan keluarga secara praktis dengan bidan/terapis terlatih, mempercepat pemulihan fisik ibu nifas, dan mendukung tumbuh kembang bayi secara optimal melalui perawatan tersertifikasi.",
      en: "Practically connects hundreds of families with certified midwives/therapists, accelerates postnatal recovery for new mothers, and optimally supports infant development through certified treatments.",
      de: "Verbindet hunderte Familien praktisch mit zertifizierten Hebammen/Therapeuten, beschleunigt die postnatale Erholung neuer Mütter und unterstützt die kindliche Entwicklung optimal durch zertifizierte Behandlungen."
    },
    techStack: ["React", "Vite", "Supabase", "React Router", "Tailwind CSS"]
  },
  {
    id: 11,
    title: "Bagas Pramono",
    category: {
      id: "Layanan Publik & Profil Politisi",
      en: "Public Service & Politician Profile",
      de: "Öffentlicher Dienst & Politikerprofil"
    },
    url: "https://bagaspramono.web.id/",
    image: bagaspramonoImg,
    challenge: {
      id: "Anggota legislatif memerlukan media komunikasi digital yang transparan untuk menyebarkan rekam jejak pengabdian, memantau aspirasi konstituen, dan membangun kepercayaan publik secara real-time.",
      en: "Legislative members require a transparent digital communication medium to broadcast track records of service, monitor constituent aspirations, and build public trust in real-time.",
      de: "Abgeordnete benötigen ein transparentes digitales Kommunikationsmedium, um ihre Leistungsbilanz zu veröffentlichen, die Anliegen der Bürger zu verfolgen und in Echtzeit Vertrauen aufzubauen."
    },
    solution: {
      id: "Portal profil politisi premium dengan modul penyampaian aspirasi warga terintegrasi database, visualisasi timeline rekam jejak kerja, update berita kegiatan sosial, serta manajemen galeri dokumentasi kegiatan.",
      en: "A premium politician profile portal featuring a database-integrated citizen feedback system, interactive service track record timelines, social campaign updates, and documentation gallery management.",
      de: "Ein erstklassiges Politikerprofil-Portal mit einem datenbankintegrierten Bürgerfeedback-System, interaktiven Zeitachsen für die Leistungsbilanz, sozialen Kampagnen-Updates und einer Dokumentationsgalerie."
    },
    outcome: {
      id: "Menjembatani konstituen Provinsi Lampung secara langsung dengan wakil rakyatnya, mendokumentasikan hasil advokasi program secara akuntabel, dan meningkatkan keterlibatan publik hingga 80%.",
      en: "Directly bridges Lampung Province constituents with their legislative representative, document advocacy programs accountably, and boosts public engagement by up to 80%.",
      de: "Verbindet Bürger der Provinz Lampung direkt mit ihrem Abgeordneten, dokumentiert Interessenvertretungen nachvollziehbar und steigert die Bürgerbeteiligung um bis zu 80%."
    },
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Lucide Icons"]
  }
];
