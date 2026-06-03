import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line
} from 'recharts';
import { 
  FiUsers, FiTarget, FiActivity, FiCheckCircle, FiTrendingUp, FiMapPin, 
  FiBriefcase, FiFilter, FiXCircle, FiTrendingDown, FiClock, FiHelpCircle,
  FiPhone, FiTag, FiAlertTriangle
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { getCrmAnalytics } from '../../services/crmService';
import './LeadsDashboard.css';

const PIE_COLORS = ['#D4AF37', '#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#f1c40f', '#1abc9c', '#e74c3c'];

const dashboardTranslations = {
  id: {
    title: 'Dasbor Akuisisi CRM',
    subtitle: 'Lacak upaya jangkauan aktif, interaksi pembinaan, dan kesepakatan tertutup',
    avgActiveWa: 'Rata-rata WA Aktif hari ini: ',
    allMonths: 'Semua Bulan (Keseluruhan)',
    activeFilters: 'Filter Aktif:',
    resetFilters: 'Reset Semua',
    // KPIs
    kpiEffortTitle: 'Upaya Harian Admin',
    kpiEffortSub: 'Total pesan & follow-up terkirim',
    kpiQuotaTitle: 'Utilitas Kuota Jangkauan',
    kpiQuotaSub: 'kontak dingin terkirim',
    kpiActiveDays: 'hari aktif',
    kpiDealsTitle: 'Deal Ditutup',
    kpiDealsSub: 'Rasio kesuksesan deal: ',
    kpiResponseTitle: 'Respons Dihasilkan',
    kpiResponseSub: 'Menerima {responses} respons',
    // Aux cards
    auxNewOutreach: 'Kontak Jangkauan Baru',
    auxNewOutreachSub: 'Kontak pertama yang dimasukkan ke CRM',
    auxWarmNurturing: 'Volume Follow-up Hangat',
    auxWarmNurturingSub: 'Follow-up dikirim ke lead yang merespons',
    auxFailed: 'Jumlah Gagal & Menolak',
    auxFailedSub: 'Lead yang menolak atau ditandai tidak aktif',
    // Charts
    chartTrendMom: '📈 Upaya Kerja & Deal Ditutup dari Bulan ke Bulan',
    chartTrendDaily: '📅 Lintasan Upaya Harian — ',
    chartWorkEffort: 'Total Upaya Kerja',
    chartNewOutreach: 'Jangkauan Baru',
    chartDealsClosed: 'Deal Ditutup',
    chartNoHistory: 'Tidak ada data riwayat upaya untuk periode ini.',
    chartChannels: 'Saluran Akuisisi Lead (Sumber)',
    chartNoSources: 'Tidak ada statistik sumber lead.',
    chartRejections: 'Alasan Penolakan Utama',
    chartNoRejections: 'Tidak ada lead gagal yang tercatat. Kerja bagus!',
    chartPipeline: 'Pipa Konversi CRM',
    chartIndustry: 'Kinerja Industri (Klik untuk Menyorot)',
    chartNoIndustries: 'Tidak ada statistik industri.',
    chartRegions: 'Jangkauan & Konversi Regional (Klik Bar untuk Menyorot)',
    chartNoRegions: 'Tidak ada data regional.',
    leadContacts: 'Lead Dihubungi',
    leadsWord: 'Lead'
  },
  en: {
    title: 'CRM Acquisition Dashboard',
    subtitle: 'Trace active outreach efforts, nurturing touchpoints, and closed deals',
    avgActiveWa: 'Avg Active WA today: ',
    allMonths: 'All Months (Overall)',
    activeFilters: 'Active Filters:',
    resetFilters: 'Reset All',
    // KPIs
    kpiEffortTitle: 'Admin Daily Effort',
    kpiEffortSub: 'Total messages & followups sent',
    kpiQuotaTitle: 'Outreach Quota Utilization',
    kpiQuotaSub: 'cold contacts sent',
    kpiActiveDays: 'active days',
    kpiDealsTitle: 'Deals Closed',
    kpiDealsSub: 'Success deal rate: ',
    kpiResponseTitle: 'Response Generation',
    kpiResponseSub: 'Received {responses} responses',
    // Aux cards
    auxNewOutreach: 'New Outreach Contacts',
    auxNewOutreachSub: 'Initial contacts added to the CRM',
    auxWarmNurturing: 'Warm Nurturing Volume',
    auxWarmNurturingSub: 'Followups sent to already-responded leads',
    auxFailed: 'Loss & Failed Count',
    auxFailedSub: 'Leads rejected or marked inactive',
    // Charts
    chartTrendMom: '📈 Month-over-Month Workload & Deals Closed',
    chartTrendDaily: '📅 Daily Effort Trajectory — ',
    chartWorkEffort: 'Total Work Effort',
    chartNewOutreach: 'New Outreach',
    chartDealsClosed: 'Deals Closed',
    chartNoHistory: 'No effort history data for this period.',
    chartChannels: 'Lead Acquisition Channels (Sources)',
    chartNoSources: 'No lead source statistics.',
    chartRejections: 'Primary Rejection & Loss Reasons',
    chartNoRejections: 'No failed leads recorded. Excellent job!',
    chartPipeline: 'CRM Conversion Pipeline',
    chartIndustry: 'Industry Performance (Click to Highlight)',
    chartNoIndustries: 'No industry stats.',
    chartRegions: 'Regional Outreach & Conversion (Click Bar to Highlight)',
    chartNoRegions: 'No regional data.',
    leadContacts: 'Leads Contacted',
    leadsWord: 'Leads'
  }
};

// Generate dynamic list of past 12 months to filter by
const getMonthsList = () => {
  const months = [];
  const date = new Date();
  // Add current month and past 11 months
  for (let i = 0; i < 12; i++) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    months.push(`${year}-${month}`);
    date.setMonth(date.getMonth() - 1);
  }
  return months;
};

const LeadsDashboard = () => {
  const { language } = useLanguage();
  const t = dashboardTranslations[language] || dashboardTranslations.id;
  const months = getMonthsList();

  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dashboard Filtering
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  // Sub-filtering states for local visual highlight/drilldowns
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);


  const formatMonthName = (monthStr) => {
    if (!monthStr || monthStr === 'ALL') return t.allMonths;
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { month: 'long', year: 'numeric' });
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedMonth]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const data = await getCrmAnalytics({ 
        month: selectedMonth
      });
      setAnalyticsData(data);
    } catch (err) {
      console.error('Error fetching dashboard crm analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !analyticsData) {
    return (
      <div className="admin-container">
        <div className="admin-loading" style={{ color: 'white', textAlign: 'center', padding: '3rem' }}>
          Loading CRM Dashboard Analytics...
        </div>
      </div>
    );
  }

  const { summary, sources, failures, regions, categories, funnel, trend } = analyticsData;

  // Multi-segment interactive filtering applied to regions/categories locally
  const filteredRegions = selectedRegion 
    ? regions.filter(r => r.name === selectedRegion) 
    : regions;

  const filteredCategories = selectedIndustry 
    ? categories.filter(c => c.name === selectedIndustry) 
    : categories;

  const hasFilters = selectedRegion || selectedIndustry;

  const resetFilters = () => {
    setSelectedRegion(null);
    setSelectedIndustry(null);
  };

  // Funnel Translation mapping
  const translatedFunnel = funnel.map(f => {
    let name = f.name;
    if (language === 'id') {
      if (f.name === 'Outreach') name = 'Jangkauan';
      if (f.name === 'Followed Up') name = 'Followed Up';
      if (f.name === 'Responded') name = 'Merespon';
      if (f.name === 'Deals Closed') name = 'Deal Ditutup';
    }
    return { ...f, name };
  });

  return (
    <div className="admin-container">
      {/* Dashboard Top Header & Filter Controls */}
      <div className="dashboard-top-bar">
        <div className="admin-header">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <div className="dashboard-controls-row">
          {/* Average WA Accounts Information */}
          <div className="month-selector-wrapper glass" style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPhone style={{ color: 'var(--primary)' }} />
            <span>{t.avgActiveWa}<strong>{summary.avgWa?.toFixed(1) || '2.0'}</strong></span>
          </div>

          {/* Month selector */}
          <div className="month-selector-wrapper glass">
            <FiFilter className="selector-icon" />
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="month-dropdown"
            >
              <option value="ALL">{t.allMonths}</option>
              {months.map(m => (
                <option key={m} value={m}>
                  {formatMonthName(m)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Drilldown Filters Indicator */}
      {hasFilters && (
        <div className="active-filters-bar glass animate-fade-in">
          <span>{t.activeFilters}</span>
          {selectedRegion && (
            <span className="filter-pill">
              Region: <strong>{selectedRegion}</strong>
              <button onClick={() => setSelectedRegion(null)}><FiXCircle /></button>
            </span>
          )}
          {selectedIndustry && (
            <span className="filter-pill">
              Industry: <strong>{selectedIndustry}</strong>
              <button onClick={() => setSelectedIndustry(null)}><FiXCircle /></button>
            </span>
          )}
          <button onClick={resetFilters} className="clear-filters-btn">
            {t.resetFilters}
          </button>
        </div>
      )}

      {/* Main KPI Grid */}
      <div className="kpi-grid">
        {/* Total Touchpoints (Daily Effort) */}
        <div className="kpi-card glass highlight">
          <div className="kpi-icon color-blue"><FiActivity /></div>
          <div className="kpi-info">
            <h3>{t.kpiEffortTitle}</h3>
            <span className="kpi-value">{summary.totalTouchpoints}</span>
            <div className="kpi-subtitle">{t.kpiEffortSub}</div>
          </div>
        </div>

        {/* Quota Utilization */}
        <div className="kpi-card glass">
          <div className="kpi-icon color-cyan"><FiClock /></div>
          <div className="kpi-info">
            <h3>{t.kpiQuotaTitle}</h3>
            <span className="kpi-value">{summary.quotaUtilization}%</span>
            <div className="kpi-subtitle">
              {summary.newOutreach + summary.coldFollowup} {t.kpiQuotaSub} ({summary.activeDays} {t.kpiActiveDays})
            </div>
          </div>
        </div>

        {/* Total Deals Closed */}
        <div className="kpi-card glass highlight">
          <div className="kpi-icon color-gold"><FiTarget /></div>
          <div className="kpi-info">
            <h3>{t.kpiDealsTitle}</h3>
            <span className="kpi-value">{summary.deals}</span>
            <div className="kpi-subtitle">{t.kpiDealsSub}{summary.dealRate}%</div>
          </div>
        </div>

        {/* Response Generation Rate */}
        <div className="kpi-card glass">
          <div className="kpi-icon color-green"><FiCheckCircle /></div>
          <div className="kpi-info">
            <h3>{t.kpiResponseTitle}</h3>
            <span className="kpi-value">{summary.responseRate}%</span>
            <div className="kpi-subtitle">{t.kpiResponseSub.replace('{responses}', summary.responses)}</div>
          </div>
        </div>
      </div>

      {/* Auxiliary Rate Cards */}
      <div className="aux-stats-grid">
        <div className="aux-card glass">
          <div className="aux-header">
            <span><FiUsers /> {t.auxNewOutreach}</span>
            <strong>{summary.newOutreach} {t.leadsWord}</strong>
          </div>
          <div className="aux-progress-bar">
            <div className="aux-progress-fill color-blue" style={{ width: `${summary.newOutreach > 0 ? 100 : 0}%` }}></div>
          </div>
          <span className="aux-detail">{t.auxNewOutreachSub}</span>
        </div>

        <div className="aux-card glass">
          <div className="aux-header">
            <span><FiTrendingUp /> {t.auxWarmNurturing}</span>
            <strong>{summary.warmFollowup} Touchpoints</strong>
          </div>
          <div className="aux-progress-bar">
            <div className="aux-progress-fill color-gold" style={{ width: `${summary.warmFollowup > 0 ? 100 : 0}%` }}></div>
          </div>
          <span className="aux-detail">{t.auxWarmNurturingSub}</span>
        </div>

        <div className="aux-card glass">
          <div className="aux-header">
            <span><FiTrendingDown /> {t.auxFailed}</span>
            <strong>{summary.failed} {t.leadsWord}</strong>
          </div>
          <div className="aux-progress-bar">
            <div className="aux-progress-fill color-red" style={{ width: `${summary.failed > 0 ? 100 : 0}%` }}></div>
          </div>
          <span className="aux-detail">{t.auxFailedSub}</span>
        </div>
      </div>

      {/* Charts Matrix */}
      <div className="dashboard-charts">
        {/* Trajectory Trend (Work Done vs Closed Deals) */}
        <div className="chart-card glass full-width">
          <h3>
            {selectedMonth === 'ALL' 
              ? t.chartTrendMom 
              : `${t.chartTrendDaily}${formatMonthName(selectedMonth)}`}
          </h3>
          <div className="chart-container">
            {trend.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                {selectedMonth === 'ALL' ? (
                  <AreaChart data={trend}>
                    <defs>
                      <linearGradient id="colorEffort" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3498db" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                    <Legend />
                    <Area type="monotone" dataKey="Touchpoints" name={t.chartWorkEffort} stroke="#3498db" strokeWidth={2} fillOpacity={1} fill="url(#colorEffort)" />
                    <Area type="monotone" dataKey="Contacts" name={t.chartNewOutreach} stroke="#9b59b6" strokeWidth={2} fillOpacity={0} />
                    <Area type="monotone" dataKey="Deals" name={t.chartDealsClosed} stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorDeals)" />
                  </AreaChart>
                ) : (
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                    <Legend />
                    <Line type="monotone" dataKey="Touchpoints" name={t.chartWorkEffort} stroke="#3498db" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Contacts" name={t.chartNewOutreach} stroke="#9b59b6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Deals" name={t.chartDealsClosed} stroke="#D4AF37" strokeWidth={2} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">{t.chartNoHistory}</div>
            )}
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div className="chart-card glass">
          <h3>{t.chartChannels}</h3>
          <div className="chart-container">
            {sources.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                     data={sources}
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                  >
                    {sources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">{t.chartNoSources}</div>
            )}
          </div>
        </div>

        {/* Rejection / Failure Reasons breakdown */}
        <div className="chart-card glass">
          <h3>{t.chartRejections}</h3>
          <div className="chart-container">
            {failures.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={failures} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="white" width={140} style={{ fontSize: '0.8rem' }} />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                  <Bar dataKey="value" name={t.leadsWord} fill="#e74c3c" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: 'white' }} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">{t.chartNoRejections}</div>
            )}
          </div>
        </div>

        {/* Lead Funnel */}
        <div className="chart-card glass">
          <h3>{t.chartPipeline}</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart layout="vertical" data={translatedFunnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="white" width={100} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: 'white' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Performance */}
        <div className="chart-card glass">
          <h3>{t.chartIndustry}</h3>
          <div className="chart-container">
            {filteredCategories.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={filteredCategories}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    onClick={(entry) => setSelectedIndustry(entry.name === selectedIndustry ? null : entry.name)}
                    style={{ cursor: 'pointer' }}
                  >
                    {filteredCategories.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={PIE_COLORS[(index + 3) % PIE_COLORS.length]} 
                        stroke={entry.name === selectedIndustry ? '#fff' : 'none'}
                        strokeWidth={entry.name === selectedIndustry ? 2 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">{t.chartNoIndustries}</div>
            )}
          </div>
        </div>

        {/* Regional Performance */}
        <div className="chart-card glass full-width">
          <h3>{t.chartRegions}</h3>
          <div className="chart-container">
            {filteredRegions.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredRegions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                  <Legend />
                  <Bar 
                    dataKey="contacts" 
                    name={t.leadContacts} 
                    fill="#3498db" 
                    radius={[4, 4, 0, 0]}
                    onClick={(entry) => setSelectedRegion(entry.name === selectedRegion ? null : entry.name)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Bar 
                    dataKey="deals" 
                    name={t.chartDealsClosed} 
                    fill="#D4AF37" 
                    radius={[4, 4, 0, 0]}
                    onClick={(entry) => setSelectedRegion(entry.name === selectedRegion ? null : entry.name)}
                    style={{ cursor: 'pointer' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">{t.chartNoRegions}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
