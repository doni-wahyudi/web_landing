import { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { 
  FiGlobe, FiEye, FiTrendingUp, FiMousePointer, FiFilter, 
  FiSmartphone, FiMonitor, FiTablet, FiShare2, FiCompass
} from 'react-icons/fi';
import './LeadsDashboard.css';

const API_BASE_URL = 'https://aurotech.co.id/api';
const CHART_COLORS = ['#3498db', '#D4AF37', '#2ecc71', '#9b59b6', '#e67e22', '#e74c3c'];

// Helper to convert 2-letter ISO country code to flag emoji
const getFlagEmoji = (countryCode) => {
  if (!countryCode || countryCode === 'XX') return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌐';
  }
};

// Generate dynamic list of past 12 months to filter by
const getMonthsList = () => {
  const months = [];
  const date = new Date();
  for (let i = 0; i < 12; i++) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    months.push(`${year}-${month}`);
    date.setMonth(date.getMonth() - 1);
  }
  return months;
};

const VisitorsDashboard = () => {
  const months = getMonthsList();
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    topPages: [],
    countries: [],
    cities: [],
    devices: [],
    browsers: [],
    referrers: [],
    history: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const formatMonthName = (monthStr) => {
    if (!monthStr || monthStr === 'ALL') return 'All Months';
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  useEffect(() => {
    fetchStats();
  }, [selectedMonth]);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/visitor-stats?month=${selectedMonth}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="admin-loading" style={{ color: 'white', textAlign: 'center', padding: '3rem' }}>
          Loading Traffic Analytics...
        </div>
      </div>
    );
  }

  // Format date key for history chart
  const formatHistoryDate = (val) => {
    if (!val) return '';
    if (val.length === 7) {
      const [year, month] = val.split('-');
      const d = new Date(parseInt(year), parseInt(month) - 1, 1);
      return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }
    const d = new Date(val);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="admin-container">
      {/* Top Header & Selector */}
      <div className="dashboard-top-bar">
        <div className="admin-header">
          <h1>Traffic & Visitor Analytics</h1>
          <p>Monitor global user reach, device preferences, and pages view stats</p>
        </div>

        <div className="month-selector-wrapper glass">
          <FiFilter className="selector-icon" />
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="month-dropdown"
          >
            <option value="ALL">All Months (Overall)</option>
            {months.map(m => (
              <option key={m} value={m}>
                {formatMonthName(m)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Stats Panel */}
      <div className="kpi-grid">
        <div className="kpi-card glass highlight">
          <div className="kpi-icon color-blue"><FiGlobe /></div>
          <div className="kpi-info">
            <h3>Unique Visitors</h3>
            <span className="kpi-value">{stats.uniqueVisitors}</span>
            <div className="kpi-subtitle">Distinct IP addresses reached</div>
          </div>
        </div>
        <div className="kpi-card glass highlight">
          <div className="kpi-icon color-gold"><FiEye /></div>
          <div className="kpi-info">
            <h3>Total Page Views</h3>
            <span className="kpi-value">{stats.totalViews}</span>
            <div className="kpi-subtitle">Total hits across website</div>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon color-green"><FiMousePointer /></div>
          <div className="kpi-info">
            <h3>Avg. Views/Visitor</h3>
            <span className="kpi-value">
              {(stats.totalViews / (stats.uniqueVisitors || 1)).toFixed(1)}
            </span>
            <div className="kpi-subtitle">Depth of user interactions</div>
          </div>
        </div>
      </div>

      {/* Trajectory charts */}
      <div className="dashboard-charts">
        {/* Visitors Growth Area Chart */}
        <div className="chart-card glass full-width">
          <h3>
            {selectedMonth === 'ALL'
              ? '📈 Monthly Traffic Trend (Unique Visitors vs Views)'
              : `📅 Daily Traffic Growth — ${formatMonthName(selectedMonth)}`}
          </h3>
          <div className="chart-container">
            {stats.history && stats.history.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={stats.history}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3498db" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="stat_date" 
                    stroke="rgba(255,255,255,0.5)" 
                    tickFormatter={formatHistoryDate} 
                  />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                  <Legend />
                  <Area type="monotone" dataKey="unique_visitors" name="Unique Visitors" stroke="#3498db" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                  <Area type="monotone" dataKey="total_views" name="Page Views" stroke="#D4AF37" strokeWidth={1.5} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">No traffic history for this period.</div>
            )}
          </div>
        </div>

        {/* Global Geolocation: Top Countries */}
        <div className="chart-card glass">
          <h3>🌍 Global Reach (Top Countries)</h3>
          <div className="chart-container">
            {stats.countries && stats.countries.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stats.countries} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.4)" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="white" 
                    width={100}
                    tickFormatter={(val, i) => {
                      const code = stats.countries[i]?.country_code || '';
                      return `${getFlagEmoji(code)} ${val}`;
                    }}
                    style={{ fontSize: '0.85rem' }} 
                  />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                  <Bar dataKey="visitors" name="Unique Visitors" fill="#3498db" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: 'white' }} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">No geographic logs available.</div>
            )}
          </div>
        </div>

        {/* Top Cities */}
        <div className="chart-card glass">
          <h3>🏙️ Top Visitor Cities</h3>
          <div className="top-pages-list">
            {stats.cities && stats.cities.length > 0 ? (
              stats.cities.map((city, i) => (
                <div key={i} className="page-item">
                  <span className="page-path">
                    {getFlagEmoji(city.country_code)} {city.name === 'Unknown' || !city.name ? 'Other Cities' : city.name}
                  </span>
                  <span className="page-views badge-user">{city.visitors} visitors</span>
                </div>
              ))
            ) : (
              <div className="empty-placeholder">No city distribution data.</div>
            )}
          </div>
        </div>

        {/* Device Segmentation */}
        <div className="chart-card glass">
          <h3>📱 Device Types</h3>
          <div className="chart-container">
            {stats.devices && stats.devices.length > 0 && stats.devices.some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={stats.devices}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.devices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">No device type metrics logged.</div>
            )}
          </div>
        </div>

        {/* Browser Segmentation */}
        <div className="chart-card glass">
          <h3>🧭 Browser Share</h3>
          <div className="chart-container">
            {stats.browsers && stats.browsers.length > 0 && stats.browsers.some(b => b.value > 0) ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={stats.browsers}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.browsers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[(index + 2) % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">No browser share data.</div>
            )}
          </div>
        </div>

        {/* Traffic Referrer Channels */}
        <div className="chart-card glass">
          <h3>🔗 Referrer Channels</h3>
          <div className="chart-container">
            {stats.referrers && stats.referrers.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={stats.referrers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.8rem' }} />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                  <Bar dataKey="value" name="Sessions" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">No referrer logs.</div>
            )}
          </div>
        </div>

        {/* Top Visited Pages */}
        <div className="chart-card glass">
          <h3>📄 Top Visited Content Paths</h3>
          <div className="top-pages-list">
            {stats.topPages && stats.topPages.length > 0 ? (
              stats.topPages.map((page, i) => (
                <div key={i} className="page-item">
                  <span className="page-path">{page.page_path}</span>
                  <span className="page-views badge-user">{page.views} views</span>
                </div>
              ))
            ) : (
              <div className="empty-placeholder">No pages view logs.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsDashboard;
