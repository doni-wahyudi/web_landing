const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://aurotech.co.id/api';

const getHeaders = (extraHeaders = {}) => {
  const token = sessionStorage.getItem('admin_token');
  return {
    ...extraHeaders,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

const fallbackArticles = {
  id: [
    {
      id: 1,
      title: "7 Kunci Penting Desain Website Premium yang Mampu Menghasilkan Konversi Tinggi",
      slug: "kunci-desain-website-premium-konversi-tinggi",
      category: "Web Design",
      keywords: "desain website, website premium, konversi bisnis, aurotech",
      image_url: "",
      content: `**Di era digital saat ini**, memiliki website biasa saja tidak lagi cukup. Website bisnis Anda harus mampu menarik perhatian dalam **3 detik pertama** dan mengarahkan pengunjung menjadi pembeli.

*Berikut adalah 7 elemen krusial yang wajib ada:*

**1. Responsif & Cepat**: Website harus dapat diakses dengan mulus dari perangkat mobile mana pun. Kecepatan loading di bawah 2 detik meningkatkan peringkat Google.

**2. Tipografi Elegan & Kontras Tinggi**: Desain premium harus memiliki kontras visual yang sempurna agar mudah dibaca, bahkan pada layar smartphone kecil sekalipun.

**3. Panggilan Aksi (CTA) yang Jelas**: Tombol CTA harus menonjol dan memandu pengunjung dengan intuitif untuk menghubungi WhatsApp atau melakukan pembelian.

**4. Sertifikat Keamanan SSL**: Keamanan data adalah nomor satu untuk menumbuhkan kepercayaan customer Anda.

**5. Halaman Kontak Lengkap**: Mempermudah pelanggan terhubung secara langsung.

**6. Konten Interaktif**: Gunakan micro-animation agar web Anda terkesan hidup dan dinamis.

**7. Navigasi Sederhana**: Navigasi intuitif mempermudah pencarian informasi.`,
      created_at: "2026-07-01T00:00:00Z"
    },
    {
      id: 2,
      title: "Mengenal Media Monitoring: Bagaimana Data Publik Bisa Menyelamatkan Reputasi Brand Anda",
      slug: "mengenal-media-monitoring-reputasi-brand",
      category: "Media Monitoring",
      keywords: "media monitoring, reputasi brand, analisis publik, aurotech",
      image_url: "",
      content: `**Reputasi adalah aset berharga.** Di dunia yang bergerak serba cepat, opini publik di media sosial dan media berita online dapat berkembang menjadi krisis reputasi dalam hitungan jam.

*Dengan Media Monitoring dari Aurotech, Anda dapat:*

**1. Melacak Sentimen Real-Time**: Ketahui apakah pembicaraan publik bernada positif, netral, atau negatif terhadap brand Anda.

**2. Deteksi Krisis Sejak Dini**: Ambil langkah preventif sebelum sentimen negatif menyebar luas di media nasional.

**3. Analisis Kompetitor**: Pahami posisi brand Anda dibandingkan dengan pesaing di industri yang sama.

**4. Riset Tren Terkini**: Dapatkan insight mendalam tentang apa yang sedang disukai oleh target audiens Anda.`,
      created_at: "2026-07-02T00:00:00Z"
    },
    {
      id: 3,
      title: "Panduan Lengkap SEO Lokal: Dominasi Halaman Pertama Google dan Dapatkan Pelanggan Terdekat",
      slug: "panduan-lengkap-seo-lokal-halaman-pertama-google",
      category: "SEO",
      keywords: "seo lokal, halaman pertama google, bisnis lokal, aurotech",
      image_url: "",
      content: `**Hampir 46% pencarian di Google** mencari informasi lokal. Jika bisnis Anda tidak muncul di Google Maps atau pencarian lokal teratas, Anda kehilangan pelanggan potensial setiap hari.

*Cara mengoptimalkan SEO Lokal:*

**1. Lengkapi Profil Bisnis Google (Google My Business)**: Pastikan nama, alamat, dan nomor telepon bisnis Anda 100% akurat.

**2. Kumpulkan Ulasan Pelanggan**: Ulasan positif meningkatkan kredibilitas di mata algoritma Google dan calon pelanggan.

**3. Gunakan Kata Kunci Lokal**: Masukkan nama kota atau wilayah layanan Anda secara organik di dalam konten website Anda.

**4. Optimasi Konten Mobile**: Pengunjung lokal sebagian besar mencari dari HP, pastikan navigasi mobile Anda sangat responsif.`,
      created_at: "2026-07-03T00:00:00Z"
    }
  ],
  en: [
    {
      id: 1,
      title: "7 Key Elements of a Premium Website Design That Drives High Conversions",
      slug: "key-elements-premium-website-design-conversions",
      category: "Web Design",
      keywords: "web design, premium website, business conversions, aurotech",
      image_url: "",
      content: `**In today's digital era**, having a basic website is no longer enough. Your business website must capture attention within the **first 3 seconds** and guide visitors toward conversion.

*Here are 7 crucial elements:*

**1. Responsive & Fast**: Fully optimized mobile access is essential. Loading speed under 2 seconds significantly boosts Google rank.

**2. Elegant Typography & High Contrast**: Premium designs require perfect visual contrast for readability, even on small screens.

**3. Clear Calls to Action (CTA)**: CTA buttons must stand out and direct users intuitively to contact sales.

**4. SSL Security Certificate**: Absolute trust begins with secure user connections.

**5. Clean Navigation**: Simplifies browsing experience for potential customers.`,
      created_at: "2026-07-01T00:00:00Z"
    },
    {
      id: 2,
      title: "Understanding Media Monitoring: How Public Data Saves Your Brand Reputation",
      slug: "understanding-media-monitoring-brand-reputation",
      category: "Media Monitoring",
      keywords: "media monitoring, brand reputation, public analysis, aurotech",
      image_url: "",
      content: `**Reputation is a priceless asset.** In a fast-moving world, public opinions on social media and news portals can escalate into a crisis within hours.

*With Aurotech Media Monitoring, you can:*

**1. Track Sentiments in Real-Time**: Know whether public conversations are positive, neutral, or negative.

**2. Early Crisis Detection**: Take preventive actions before negative sentiment spreads.

**3. Competitor Analysis**: Understand your brand's relative position in the market.`,
      created_at: "2026-07-02T00:00:00Z"
    },
    {
      id: 3,
      title: "Complete Local SEO Guide: Dominate Google First Page and Attract Local Customers",
      slug: "local-seo-guide-dominate-google-first-page",
      category: "SEO",
      keywords: "local seo, google map optimization, local business, aurotech",
      image_url: "",
      content: `**Nearly 46% of all Google searches** are seeking local information. If your business doesn't show up in local searches, you are losing valuable customers every day.

*How to optimize for Local SEO:*

**1. Optimize Google Business Profile**: Ensure your name, address, and phone number are accurate.

**2. Gather Client Reviews**: Positive reviews build credibility and rank you higher on search results.

**3. Use Local Keywords**: Integrate your target city or service area naturally into your website copy.`,
      created_at: "2026-07-03T00:00:00Z"
    }
  ],
  de: [
    {
      id: 1,
      title: "7 Schlüsselelemente für ein Premium-Webdesign, das hohe Conversions erzielt",
      slug: "schluesselelemente-premium-webdesign-conversions",
      category: "Webdesign",
      keywords: "webdesign, premium website, conversions, aurotech",
      image_url: "",
      content: `**In der heutigen digitalen Ära** reicht eine einfache Website nicht mehr aus. Ihre Website muss innerhalb der **ersten 3 Sekunden** Aufmerksamkeit erregen.

*Hier sind 7 entscheidende Elemente:*

**1. Mobilfreundlich & Schnell**: Optimierter Zugriff für Mobilgeräte ist unerlässlich.

**2. Elegante Typografie & Hoher Kontrast**: Erstklassige Designs erfordern hervorragende Lesbarkeit.

**3. Klare Call-to-Actions (CTA)**: CTAs müssen auffallen und den Nutzer intuitiv leiten.`,
      created_at: "2026-07-01T00:00:00Z"
    },
    {
      id: 2,
      title: "Media Monitoring verstehen: Wie öffentliche Daten Ihren Markenruf schützen",
      slug: "media-monitoring-verstehen-markenruf-schuetzen",
      category: "Medienbeobachtung",
      keywords: "medienbeobachtung, markenruf, krisenpraevention, aurotech",
      image_url: "",
      content: `**Ein guter Ruf ist unbezahlbar.** In einer schnelllebigen Welt kann sich eine negative Meinung in den sozialen Medien schnell ausbreiten.

*Mit der Medienbeobachtung von Aurotech können Sie:*

**1. Echtzeit-Stimmungsanalyse**: Erkennen Sie, ob die Gespräche positiv, neutral oder negativ sind.

**2. Krisenprävention**: Handeln Sie frühzeitig, bevor eine Krise entsteht.

**3. Wettbewerbsanalyse**: Vergleichen Sie Ihre Position direkt mit Ihren Mitbewerbern.`,
      created_at: "2026-07-02T00:00:00Z"
    },
    {
      id: 3,
      title: "Lokaler SEO-Leitfaden: Dominieren Sie Google und gewinnen Sie Kunden vor Ort",
      slug: "lokaler-seo-leitfaden-google-dominieren",
      category: "SEO",
      keywords: "lokales seo, google ranking, unternehmen vor ort, aurotech",
      image_url: "",
      content: `**Fast 46% aller Google-Suchanfragen** haben einen lokalen Bezug. Wenn Ihr Unternehmen hier nicht gelistet ist, entgehen Ihnen täglich Kunden.

*So optimieren Sie lokales SEO:*

**1. Google Business-Profil pflegen**: Halten Sie Ihre Daten stets aktuell.

**2. Kundenbewertungen sammeln**: Positive Bewertungen steigern die Relevanz in den Suchergebnissen.

**3. Lokale Keywords nutzen**: Integrieren Sie Ihren Standort harmonisch in Ihre Texte.`,
      created_at: "2026-07-03T00:00:00Z"
    }
  ]
};

export const getArticles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);
    if (!response.ok) throw new Error('Fetch failed');
    const data = await response.json();
    if (!data || data.length === 0) {
      throw new Error('No articles returned from DB');
    }
    return data;
  } catch (error) {
    console.warn("Using offline fallback blog articles due to API error: ", error.message);
    const lang = localStorage.getItem('site_lang') || 'id';
    return fallbackArticles[lang] || fallbackArticles.id;
  }
};

export const createArticle = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: 'POST',
    headers: getHeaders(),
    body: formData
  });
  if (!response.ok) throw new Error('Post failed');
  return response.json();
};

export const updateArticle = async (id, formData) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: formData
  });
  if (!response.ok) throw new Error('Update failed');
  return response.json();
};

export const deleteArticle = async (id) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Delete failed');
  return true;
};
