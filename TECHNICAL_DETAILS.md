# Project Technical Details — Aurotech Landing Page

A premium, high-conversion landing page and management portal for Aurotech web development services, featuring glassmorphic designs, dark mode, dynamic routing, and Puppeteer screenshot automation.

---

## 1. System Overview & Tech Stack
* **Framework**: React 19 (Vite-bundler)
* **Routing**: React Router DOM (v7 integration)
* **SEO**: React Helmet Async (Centralized in `SEO.jsx`)
* **Styling**: Vanilla CSS (CSS variables design system defined in `src/index.css`)
* **Automation**: Puppeteer script for dynamic portfolio screenshot generation (`capture_portfolio.js`)
* **Deployment**: Automated FTP Deployment to cPanel public_html via GitHub Actions (`.github/workflows/deploy.yml`)

---

## 2. Active Routing & Navigation
* `/` — Home (Hero, Portfolio Showcase, Pricing grid, FAQ accordion)
* `/services` — Detailed descriptions of web development services
* `/portfolio` — Dynamic, filterable grid of our project portfolio
* `/portfolio/:id` — Detail view for individual portfolio items, loading descriptions and case studies dynamically
* `/pricing` — Interactive service package pricing grids
* `/faq` — Customer support accordion-based FAQ
* `/about` — Team, vision, and mission profile page
* `/blog` — Listing page for company news and legal/service articles
* `/blog/:slug` — Individual article deep-dive page
* `/terms` & `/privacy` — Legal agreements and compliance pages
* `/admin` — Base path for cPanel, lead tracking, article management, and visitor dashboards (routed through lazy-loaded `AdminLayout`)

---

## 3. Permanently Cleaned Up & Removed Features
* **None**: All active pages are standard and fully utilized.

---

## 4. Key Configurations & Restorations
* **Portfolio Update**: Integrated two new highly premium real-world client websites:
  1. **TanyaAdvokat.id** (`web_law`) — Dynamic legal services portal with Supabase database integrations and Swiper layout.
  2. **Bimbel Junior** (`bimbel_junior`) — Modern responsive education landing page featuring cross-fading sliders and interactive timeline visualizers.
* **First Order Priority**: Configured both new projects to load in the first positions (ID 1 & 2) of the portfolio grid to showcase them as premier accomplishments.
* **Auto-capture Utility**: Enhanced `capture_portfolio.js` to automatically target, scroll, freeze viewports, and capture high-resolution webp screenshots for both projects.
* **Services & Pricing Expansion**: Restructured the Services component into three clean business sections (Core Web, Digital Marketing, and Enterprise Tech) and implemented an interactive tabbed Pricing page displaying detailed package grids for Google SEO, Social Media (with bonus callouts), and a comprehensive Media Monitoring table matrix.
* **Social Media Pricing Slider**: Restructured the "Kelola Sosmed" pricing card container into a responsive horizontal scrolling slider (`.sosmed-scroll-container` + `.sosmed-slider-outer` + scrolling arrow triggers) that shows a maximum of 3 cards on desktop, 2 on tablet, and 1 on mobile, featuring custom visual snap alignment and customized slim gold Webkit scrollbars.
* **Service Naming & Wording Rebrand**: Rebranded the "Sistem Informasi & Aplikasi" capability inside `Services.jsx` to `Information System (IS) dan Apps Development (Web/Mobile Apps)` (and its English equivalent) with the updated high-conversion copy focusing on ERP, finance, and logistics digitization.
* **Pricing Tab Restructuring & Core Cards Expansion**: Restored the first Pricing tab back to its original popular name **"Pembuatan Website"** showing standard website packages (**Basic**, **Profesional**, **Premium**). Introduced a brand new, dedicated **"Pembuatan Aplikasi"** pricing tab right next to it, featuring two high-value enterprise cards: **Information System (IS)** and **Apps Development** with tailored business features. Configured the pricing indicators for these cards to display as **"Hubungi Kami"** / **"Contact Us"** since exact price metrics are scope-dependent, and kept the layout clean by removing the description panel. Polished the feature lists within these cards by converting boring plain sentences into a visual grid of glassmorphic badges (`.app-feature-badge`), automatically mapping a dedicated glowing gold React Icon to each capability (e.g. databases, ERP, mobile, dashboards, security) to maximize scannability and tech aesthetic.
* **Individual Lead CRM System & Touchpoint Analytics**: Transitioned from daily aggregate counters to an individual Lead CRM system with activity tracking:
  - **Lead Profile Storage**: Stores rich customer details including name, business name, category, region/area, phone number, lead source, deal package, deal value, and failure reasons.
  - **Daily Activity Logging**: Logs every admin touchpoint (New Outreach, Cold Follow-up, Response Received, Warm Follow-up, Deal Closed, Marked Failed) in an activities table.
  - **Touchpoint-Based Analytics**: Dynamically calculates Total Touchpoints (work effort), Outreach Quota Utilization (cold touches vs. WA accounts capacity), response rates, and conversion pipelines.
  - **Interactive Visualizations**: Includes monthly filtering, daily activity trends, conversion funnels, lead source breakdown pies, and failure reason bar charts.
  - **Follow-Up task alerts**: Lists leads due for follow-up today based on scheduled interval dates.

---

## 5. Guidelines for Future Chats & Agents
* **Styling Variables**: Check `src/index.css` for predefined design tokens (`--primary: #D4AF37`, `--bg-dark: #050505`, etc.) before writing custom styles.
* **Portfolio Additions**: To append a project, add its metadata block to `src/data/projects.js` and list its live URL in `capture_portfolio.js` for automated screenshots.
* **Git Protocols**: Keep changes staged/unstaged; do not commit or push unless explicitly requested.

---

## 6. Verification Pipeline & Smoke Tests
1. **Development Server**: Run `npm run dev` to confirm compiles and asset resolves work correctly.
2. **Production Build**: Execute `npm run build` to verify the React bundler compiles files into `dist` successfully with no asset resolution issues.
