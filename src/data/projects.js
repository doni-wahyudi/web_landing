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
import alazharImg from '../assets/portfolio/alazhar.png';
import arjunaImg from '../assets/portfolio/arjuna.png';
import ustazbarryImg from '../assets/portfolio/ustazbarry.png';
import beanaImg from '../assets/portfolio/beana.png';
import sedulursaudaraImg from '../assets/portfolio/sedulursaudara.png';
import generasiquranImg from '../assets/portfolio/generasiquran.png';
import assyifa3sagalaherangImg from '../assets/portfolio/assyifa3sagalaherang.png';
import artisiBakmieImg from '../assets/portfolio/artisi_bakmie.png';
import gemilangindahImg from '../assets/portfolio/gemilangindah.png';
import syamaqiqahImg from '../assets/portfolio/syamaqiqah.png';
import syiarAssyifaImg from '../assets/portfolio/syiar_assyifa.png';
import smpitAssyifaImg from '../assets/portfolio/smpit_assyifa.png';

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
    url: "https://bimbeljunior.com",
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
  },
  {
    id: 12,
    title: "Al-Azhar Asy-Syarif Medan",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/alazharasysyarifmedan",
    image: alazharImg,
    challenge: {
      id: "Yayasan Al-Azhar Asy-Syarif Medan memerlukan pengelolaan media sosial yang profesional, konsisten, dan berestetika tinggi untuk menyampaikan visi sekolah dan memikat calon wali murid baru.",
      en: "Al-Azhar Asy-Syarif Medan Foundation required professional, consistent, and highly aesthetic social media management to convey the school's vision and attract prospective parents.",
      de: "Die Al-Azhar Asy-Syarif Medan Stiftung benötigte ein professionelles, konsistentes und hochästhetisches Social-Media-Management, um die Vision der Schule zu vermitteln und potenzielle Eltern anzuziehen."
    },
    solution: {
      id: "Perancangan grid konten Instagram yang terstruktur, pembuatan konten visual berkualitas tinggi (Reels & Carousels), penulisan caption informatif, serta interaksi aktif untuk membangun komunitas digital yang solid.",
      en: "Designing a structured Instagram content grid, creating high-quality visual content (Reels & Carousels), writing informative captions, and active engagement to build a solid digital community.",
      de: "Entwurf eines strukturierten Instagram-Content-Rasters, Erstellung hochwertiger visueller Inhalte (Reels & Carousels), Schreiben informativer Bildunterschriften und aktive Interaktion zum Aufbau einer soliden digitalen Community."
    },
    outcome: {
      id: "Meningkatkan brand awareness sekolah, pertumbuhan followers organik yang stabil, peningkatan engagement rate, serta mempermudah penyebaran informasi pendaftaran siswa baru secara visual.",
      en: "Increased brand awareness, steady organic follower growth, enhanced engagement rates, and simplified visual dissemination of new student registration information.",
      de: "Gesteigerte Markenbekanntheit, stetiges organisches Follower-Wachstum, verbesserte Interaktionsraten und vereinfachte visuelle Verbreitung von Informationen zur Neuanmeldung von Schülern."
    },
    techStack: ["Instagram", "Canva", "CapCut", "Copywriting", "Social Media Analytics"]
  },
  {
    id: 13,
    title: "EO Arjuna Event",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/eoarjunaevent",
    image: arjunaImg,
    challenge: {
      id: "Event Organizer Arjuna memerlukan pengelolaan media sosial Instagram yang dinamis, informatif, dan persuasif untuk memamerkan dokumentasi event, menarik klien baru, serta memperkuat identitas brand mereka.",
      en: "Arjuna Event Organizer needed dynamic, informative, and persuasive Instagram social media management to showcase event documentations, attract new clients, and strengthen their brand identity.",
      de: "Arjuna Event Organizer benötigte ein dynamisches, informatives und überzeugendes Instagram-Social-Media-Management, um Eventdokumentationen zu präsentieren, neue Kunden zu gewinnen und ihre Markenidentität zu stärken."
    },
    solution: {
      id: "Penyusunan strategi visual feed bertema event, pembuatan konten video Reels highlight acara, penulisan copy yang berorientasi pada conversion/booking, serta manajemen interaksi audiens.",
      en: "Structuring an event-themed visual feed strategy, creating highlight video Reels of events, writing conversion/booking-oriented copywriting, and audience interaction management.",
      de: "Strukturierung einer visuelle Feed-Strategie zum Thema Events, Erstellung von Highlight-Video-Reels von Events, Schreiben von konversions-/buchungsorientiertem Copywriting und Verwaltung von Publikumsinteraktionen."
    },
    outcome: {
      id: "Meningkatkan impresi profil secara signifikan, mempermudah calon klien melihat portfolio event secara visual, dan meningkatkan kueri pemesanan event melalui DM/WhatsApp.",
      en: "Significantly increased profile impressions, made it easier for prospective clients to visually view event portfolios, and boosted event booking inquiries via DM/WhatsApp.",
      de: "Signifikant gesteigerte Profilimpressionen, erleichterte die visuelle Ansicht von Event-Portfolios für potenzielle Kunden und steigerte Event-Buchungsanfragen über DM/WhatsApp."
    },
    techStack: ["Instagram", "Canva", "CapCut", "Copywriting", "Event Showcase"]
  },
  {
    id: 14,
    title: "Ustaz Barry",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/ustazbarry.my",
    image: ustazbarryImg,
    challenge: {
      id: "Membangun personal branding dakwah digital Ustaz Barry yang profesional, menarik bagi generasi muda, dan mudah dipahami, dengan konten visual serta video dakwah singkat yang berkualitas.",
      en: "Building a professional, youth-appealing, and easy-to-understand digital dakwah personal branding for Ustaz Barry through high-quality visual content and short video clips.",
      de: "Aufbau eines professionellen, jugendansprechenden und leicht verständlichen digitalen Dakwah-Personal-Branding für Ustaz Barry durch hochwertige visuelle Inhalte und kurze Videoclips."
    },
    solution: {
      id: "Pembuatan template micro-dakwah di feed, editing video dakwah pendek (Reels) dengan transisi menarik dan teks/caption clean, perancangan quotes harian, serta optimalisasi bio dan sorotan.",
      en: "Creating micro-dakwah feed templates, editing short dakwah video clips (Reels) with engaging transitions and clean text overlays, designing daily quote graphics, and optimizing bio/highlights.",
      de: "Erstellung von Micro-Dakwah-Feed-Vorlagen, Bearbeitung von kurzen Dakwah-Videoclips (Reels) mit ansprechenden Übergängen und sauberen Text-Overlays, Gestaltung täglicher Zitat-Grafiken und Optimierung von Bio/Highlights."
    },
    outcome: {
      id: "Memperluas jangkauan dakwah ke audiens milenial, meningkatkan interaksi/sharing konten positif secara luas, dan merapikan estetika digital profil Ustaz Barry.",
      en: "Expanded dakwah reach to millennial audiences, significantly boosted interaction and shares of positive content, and polished the digital aesthetic of Ustaz Barry's profile.",
      de: "Erweiterte die Reichweite von Dakwah auf ein jugendliches Publikum, steigerte die Interaktionen und das Teilen von positivem Content und verfeinerte die digitale Ästhetik von Ustaz Barrys Profil."
    },
    techStack: ["Instagram", "Adobe Premiere", "Photoshop", "Video Editing", "Personal Branding"]
  },
  {
    id: 15,
    title: "Beana Studio",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/beanastudio",
    image: beanaImg,
    challenge: {
      id: "Beana Studio membutuhkan desain grid Instagram yang estetik, konsisten, dan mencerminkan layanan kreatif mereka untuk menarik klien premium.",
      en: "Beana Studio required an aesthetic, consistent Instagram grid design that reflects their creative services to attract premium clients.",
      de: "Beana Studio benötigte ein ästhetisches, konsistentes Instagram-Grid-Design, das ihre kreativen Dienstleistungen widerspiegelt, um Premium-Kunden anzuziehen."
    },
    solution: {
      id: "Penyusunan tema warna visual minimalis modern, pembuatan infografis layanan kreatif, dan copywriting informatif yang menonjolkan keahlian studio.",
      en: "Developing a modern minimalist color theme, creating creative service infographics, and writing informative copywriting that highlights studio expertise.",
      de: "Entwicklung eines modernen minimalistischen Farbthemas, Erstellung von Infografiken für kreative Dienstleistungen und Schreiben von informativem Copywriting, das die Studio-Expertise hervorhebt."
    },
    outcome: {
      id: "Meningkatkan brand trust, kerapian estetika feed secara signifikan, dan meningkatkan interaksi dari klien potensial.",
      en: "Boosted brand trust, significantly enhanced feed aesthetic order, and increased engagement from prospective clients.",
      de: "Steigerte das Markenvertrauen, verbesserte die ästhetische Feed-Ordnung erheblich und erhöhte das Engagement potenzieller Kunden."
    },
    techStack: ["Instagram", "Canva", "Copywriting", "Creative Design"]
  },
  {
    id: 16,
    title: "Sedulur Saudara",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/sedulursaudara",
    image: sedulursaudaraImg,
    challenge: {
      id: "Komunitas Sedulur Saudara memerlukan manajemen Instagram untuk menyebarkan pesan positif, membangun kedekatan dengan anggota, serta merapikan arsip kegiatan.",
      en: "Sedulur Saudara community needed Instagram management to spread positive messages, build member engagement, and organize activity archives.",
      de: "Die Sedulur Saudara Community benötigte ein Instagram-Management, um positive Botschaften zu verbreiten, das Engagement der Mitglieder zu fördern und Aktivitätsarchive zu organisieren."
    },
    solution: {
      id: "Desain layout micro-blogging dakwah/sosial, pembuatan quotes inspiratif mingguan, dan dokumentasi event dengan tone warna yang hangat.",
      en: "Designing micro-blogging dakwah/social layouts, creating weekly inspirational quotes, and event documentation with warm color tones.",
      de: "Gestaltung von Mikro-Blogging-Dakwah-/Sozial-Layouts, Erstellung wöchentlicher Inspirationszitate und Eventdokumentation mit warmen Farbtönen."
    },
    outcome: {
      id: "Meningkatkan interaksi komunitas hingga 60%, pertumbuhan followers organik, dan penyajian dokumentasi kegiatan yang rapi.",
      en: "Increased community engagement by 60%, organic follower growth, and organized presentation of event documentations.",
      de: "Steigerung des Community-Engagements um 60%, organisches Follower-Wachstum und organisierte Präsentation von Eventdokumentationen."
    },
    techStack: ["Instagram", "Canva", "Community Management", "Visual Layouts"]
  },
  {
    id: 17,
    title: "Generasi Quran",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/geenerasiquran",
    image: generasiquranImg,
    challenge: {
      id: "Akun edukasi Generasi Quran membutuhkan penataan konten islami yang menarik minat generasi muda, informatif, dan memiliki visual yang rapi.",
      en: "Generasi Quran educational account needed custom Islamic content structures that appeal to youth, informative posts, and polished visual layouts.",
      de: "Das Generasi Quran Bildungskonto benötigte maßgeschneiderte islamische Inhaltsstrukturen, die Jugendliche ansprechen, informative Beiträge und verfeinerte visuelle Layouts."
    },
    solution: {
      id: "Perancangan template infografis edukasi Quran, pembuatan konten video ayat singkat (Reels), dan caption dakwah yang terstruktur.",
      en: "Designing educational Quran infographic templates, creating short verse video Reels, and structured dakwah captions.",
      de: "Gestaltung von Vorlagen für Infografiken zur Koran-Bildung, Erstellung von Video-Reels mit kurzen Versen und strukturierte Dakwah-Bildunterschriften."
    },
    outcome: {
      id: "Meningkatkan engagement rate postingan, mempermudah pemahaman edukasi Quran secara visual, dan memperluas jangkauan dakwah digital.",
      en: "Boosted post engagement rate, simplified visual understanding of Quranic education, and expanded digital dakwah reach.",
      de: "Erhöhte die Interaktionsrate der Beiträge, vereinfachte das visuelle Verständnis der Koran-Bildung und erweiterte die digitale Dakwah-Reichweite."
    },
    techStack: ["Instagram", "Adobe Illustrator", "CapCut", "Copywriting"]
  },
  {
    id: 18,
    title: "Ponpes Assyifa Sagalaherang",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/assyifa3sagalaherang",
    image: assyifa3sagalaherangImg,
    challenge: {
      id: "Pondok Pesantren Assyifa Sagalaherang membutuhkan branding digital profesional untuk mempublikasikan program pendidikan, kegiatan santri, dan pendaftaran santri baru.",
      en: "Assyifa Sagalaherang Boarding School required professional digital branding to publish educational programs, student activities, and new enrollment info.",
      de: "Die Assyifa Sagalaherang Internatsschule benötigte ein professionelles digitales Branding zur Veröffentlichung von Bildungsprogrammen, Schüleraktivitäten und Anmeldeinformationen."
    },
    solution: {
      id: "Perancangan visual feed bernuansa akademis-islami, pembuatan Reels dokumentasi lingkungan ponpes, dan penulisan caption informatif pendaftaran.",
      en: "Designing academic-Islamic visual feeds, creating environment showcase Reels, and writing informative enrollment captions.",
      de: "Gestaltung akademisch-islamischer visueller Feeds, Erstellung von Reels zur Präsentation der Schulumgebung und Schreiben informativer Anmelde-Bildunterschriften."
    },
    outcome: {
      id: "Meningkatkan awareness calon wali santri, memperkuat branding institusi, dan merapikan visual komunikasi pendaftaran santri baru.",
      en: "Increased parents' awareness, reinforced institutional branding, and organized registration communication layout paths.",
      de: "Erhöhte das Bewusstsein der Eltern, stärkte das institutionelle Branding und organisierte die Layoutpfade der Anmeldekommunikation."
    },
    techStack: ["Instagram", "Canva", "Video Editing", "Content Strategy"]
  },
  {
    id: 19,
    title: "Artisi Bakmie & Coffee",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/artisi.bakmiedancoffee",
    image: artisiBakmieImg,
    challenge: {
      id: "Artisi Bakmie & Coffee memerlukan manajemen media sosial yang mengunggah nafsu makan, menunjukkan suasana kafe, serta mengumumkan menu baru dan promo.",
      en: "Artisi Bakmie & Coffee required appetizing social media management that displays cafe ambiance, and announces new menus and promo campaigns.",
      de: "Artisi Bakmie & Coffee benötigte ein appetitliches Social-Media-Management, das die Café-Atmosphäre darstellt und neue Menüs sowie Werbekampagnen ankündigt."
    },
    solution: {
      id: "Foto produk makanan yang estetik, pembuatan video Reels vibes nongkrong, visual menu, dan promo interaktif di Instagram Stories.",
      en: "Aesthetic food product photography showcase templates, producing coffee-shop-vibes Reels, menu graphics, and interactive Stories promotions.",
      de: "Ästhetische Präsentationsvorlagen für Lebensmittel-Fotografie, Produktion von Reels mit Café-Vibe, Menügrafiken und interaktive Story-Aktionen."
    },
    outcome: {
      id: "Meningkatkan kunjungan pelanggan fisik ke kafe, naiknya interaksi Reels kuliner, dan memperkuat citra brand kuliner yang cozy.",
      en: "Increased physical customer visits to the cafe, boosted foodie Reels interaction rates, and reinforced the cozy brand image.",
      de: "Steigerung der physischen Kundenbesuche im Café, Erhöhung der Interaktionsrate von Reels und Stärkung des gemütlichen Markenimages."
    },
    techStack: ["Instagram", "Lightroom", "CapCut", "Food Styling"]
  },
  {
    id: 20,
    title: "Gemilang Indah Regency",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/gemilangindahregency_",
    image: gemilangindahImg,
    challenge: {
      id: "Developer perumahan Gemilang Indah Regency membutuhkan media pemasaran digital yang meyakinkan untuk memamerkan tipe rumah, progres pembangunan, dan promo penjualan.",
      en: "Gemilang Indah Regency housing developer required convincing digital marketing media to showcase house types, development progress, and sales promos.",
      de: "Der Bauträger Gemilang Indah Regency benötigte überzeugende digitale Marketingmedien, um Haustypen, Baufortschritte und Verkaufsaktionen zu präsentieren."
    },
    solution: {
      id: "Pembuatan visual layout katalog tipe rumah, infografis spesifikasi bangunan, video Reels tour unit rumah, dan update berkala pembangunan di lapangan.",
      en: "Creating visual house catalogs, structural specification infographics, property walkthrough tour Reels, and regular construction progress updates.",
      de: "Erstellung visueller Hauskataloge, Infografiken zu Bauspezifikationen, Reels für Objektbegehungen und regelmäßige Updates zum Baufortschritt."
    },
    outcome: {
      id: "Meningkatkan leads penjualan properti secara signifikan, memperkuat transparansi progress proyek, dan memudahkan edukasi cicilan KPR.",
      en: "Significantly increased property sales leads, reinforced project progress transparency, and simplified mortgage calculation guides.",
      de: "Steigerte die Leads für den Immobilienverkauf erheblich, stärkte die Transparenz des Projektfortschritts und vereinfachte Kreditzahlungs-Leitfäden."
    },
    techStack: ["Instagram", "Canva", "Drones & Videos", "Property Copywriting"]
  },
  {
    id: 21,
    title: "Syam Aqiqah",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/syamaqiqah1",
    image: syamaqiqahImg,
    challenge: {
      id: "Syam Aqiqah membutuhkan peningkatan kepercayaan calon konsumen jasa aqiqah secara digital dengan mempublikasikan higienitas, pilihan hewan, dan proses penyembelihan.",
      en: "Syam Aqiqah needed to build consumer trust digitally by publishing hygiene standards, livestock selections, and certified slaughtering processes.",
      de: "Syam Aqiqah musste das Vertrauen der Verbraucher digital aufbauen, indem Hygienestandards, Nutztierauswahl und zertifizierte Schlachtprozesse veröffentlicht wurden."
    },
    solution: {
      id: "Desain visual testimoni pelanggan, video Reels higienitas dapur dan kandang, quotes islami seputar aqiqah, dan promo paket aqiqah lengkap.",
      en: "Designing visual customer testimonials, kitchen/farm hygiene showcase Reels, Islamic aqiqah quotes, and complete package promo templates.",
      de: "Gestaltung visueller Kunden-Testimonials, Reels zur Präsentation der Hygiene in Küche/Stall, islamischer Zitate und Paket-Aktionsvorlagen."
    },
    outcome: {
      id: "Meningkatkan konversi pesanan aqiqah, memperkuat kredibilitas jasa aqiqah amanah, dan pertumbuhan engagement feed.",
      en: "Increased aqiqah order conversions, reinforced service credibility, and boosted feed engagement metrics.",
      de: "Erhöhte die Konversion von Aqiqah-Bestellungen, stärkte die Glaubwürdigkeit des Dienstes und steigerte die Feed-Interaktionsraten."
    },
    techStack: ["Instagram", "Canva", "Copywriting", "Trust Branding"]
  },
  {
    id: 22,
    title: "Syiar Assyifa",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/syiar.assyifa",
    image: syiarAssyifaImg,
    challenge: {
      id: "Kanal informasi keagamaan Syiar Assyifa memerlukan manajemen konten visual yang rapi dan konsisten untuk membagikan kajian islam, jadwal sholat, dan quotes islami harian.",
      en: "Syiar Assyifa religious info channel required clean, consistent content management to share Islamic study updates, prayer schedules, and daily quotes.",
      de: "Der religiöse Informationskanal Syiar Assyifa benötigte ein sauberes, konsistentes Content-Management zur Verbreitung von Studien-Updates, Gebetszeiten und täglichen Zitaten."
    },
    solution: {
      id: "Pembuatan template feed kajian eksklusif, desain grafis jadwal sholat bulanan, editing video ceramah pendek, dan quotes harian estetik.",
      en: "Creating exclusive study feed templates, monthly prayer schedule graphics, short lecture clip editing, and daily quotes.",
      de: "Erstellung exklusiver Studien-Vorlagen, monatlicher Gebetszeit-Grafiken, Bearbeitung kurzer Vortragsclips und täglicher Zitate."
    },
    outcome: {
      id: "Peningkatan interaksi sharing konten positif, pertumbuhan followers secara organik, dan penyajian visual dakwah yang tertata rapi.",
      en: "Increased positive content sharing, organic follower growth, and organized visual dakwah presentation templates.",
      de: "Erhöhtes Teilen positiver Inhalte, organisches Follower-Wachstum und organisierte Vorlagen für die visuelle Dakwah-Präsentation."
    },
    techStack: ["Instagram", "Canva", "Video Editing", "Content Strategy"]
  },
  {
    id: 23,
    title: "SMPIT Assyifa Boarding School Wanayasa",
    category: {
      id: "Manajemen Media Sosial",
      en: "Social Media Management",
      de: "Social Media Management"
    },
    url: "https://www.instagram.com/smpit.assyifabsw",
    image: smpitAssyifaImg,
    challenge: {
      id: "SMPIT Assyifa Boarding School Wanayasa membutuhkan media sosial Instagram yang dikelola secara aktif dan profesional untuk menyampaikan info akademis, ekstrakurikuler, dan pendaftaran siswa baru.",
      en: "SMPIT Assyifa Boarding School Wanayasa needed actively managed Instagram profile pages to present academic info, extracurriculars, and new student enrollment.",
      de: "SMPIT Assyifa Boarding School Wanayasa benötigte aktiv gepflegte Instagram-Seiten zur Präsentation akademischer Infos, außerschulischer Aktivitäten und Neuanmeldungen."
    },
    solution: {
      id: "Perancangan template feed kegiatan sekolah, liputan video Reels aktivitas santri di asrama, quotes motivasi belajar santri, dan detail pendaftaran PPDB.",
      en: "Designing school activity feed templates, boarding school student life showcase Reels, motivational student quotes, and enrollment guides.",
      de: "Gestaltung von Vorlagen für Schulaktivitäten, Reels über das Internatsleben, motivierender Schülersprüche und Anmeldeleitfäden."
    },
    outcome: {
      id: "Meningkatkan engagement sekolah dengan orang tua siswa, kelancaran info pendaftaran PPDB, dan memperkuat citra sekolah boarding unggulan.",
      en: "Boosted engagement between school and parents, streamlined enrollment guide visual paths, and reinforced premium boarding brand image.",
      de: "Steigerung des Engagements zwischen Schule und Eltern, Optimierung der Anmeldeleitfäden und Stärkung des Markenimages des Internats."
    },
    techStack: ["Instagram", "Canva", "Premiere Pro", "Enrollment Branding"]
  }
];
