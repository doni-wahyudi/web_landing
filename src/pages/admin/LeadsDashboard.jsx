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
import { getCrmAnalytics } from '../../services/crmService';
import './LeadsDashboard.css';

const PIE_COLORS = ['#D4AF37', '#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#f1c40f', '#1abc9c', '#e74c3c'];

const LeadsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Dashboard Filtering & Capacity Configuration
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [activeWaAccounts, setActiveWaAccounts] = useState(2); // Defaults to 2 WhatsApp accounts (40 quota capacity)

  // Sub-filtering states for local visual highlight/drilldowns
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  // Generate dynamic list of past 6 months to filter by
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

  const months = getMonthsList();

  const formatMonthName = (monthStr) => {
    if (!monthStr || monthStr === 'ALL') return 'All Months';
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedMonth, activeWaAccounts]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const data = await getCrmAnalytics({ 
        month: selectedMonth, 
        activeWaAccounts 
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

  return (
    <div className="admin-container">
      {/* Dashboard Top Header & Filter Controls */}
      <div className="dashboard-top-bar">
        <div className="admin-header">
          <h1>CRM Acquisition Dashboard</h1>
          <p>Trace active outreach efforts, nurturing touchpoints, and closed deals</p>
        </div>

        <div className="dashboard-controls-row">
          {/* Active WA Account Selector */}
          <div className="month-selector-wrapper glass">
            <FiPhone className="selector-icon" />
            <select 
              value={activeWaAccounts} 
              onChange={(e) => setActiveWaAccounts(parseInt(e.target.value))}
              className="month-dropdown"
            >
              <option value={1}>1 WA Account (20/day)</option>
              <option value={2}>2 WA Accounts (40/day)</option>
              <option value={3}>3 WA Accounts (60/day)</option>
              <option value={4}>4 WA Accounts (80/day)</option>
            </select>
          </div>

          {/* Month selector */}
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
      </div>

      {/* Active Drilldown Filters Indicator */}
      {hasFilters && (
        <div className="active-filters-bar glass animate-fade-in">
          <span>Active Filters:</span>
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
            Reset All
          </button>
        </div>
      )}

      {/* Main KPI Grid */}
      <div className="kpi-grid">
        {/* Total Touchpoints (Daily Effort) */}
        <div className="kpi-card glass highlight">
          <div className="kpi-icon color-blue"><FiActivity /></div>
          <div className="kpi-info">
            <h3>Admin Daily Effort</h3>
            <span className="kpi-value">{summary.totalTouchpoints}</span>
            <div className="kpi-subtitle">Total messages & followups sent</div>
          </div>
        </div>

        {/* Quota Utilization */}
        <div className="kpi-card glass">
          <div className="kpi-icon color-cyan"><FiClock /></div>
          <div className="kpi-info">
            <h3>Outreach Quota Utilization</h3>
            <span className="kpi-value">{summary.quotaUtilization}%</span>
            <div className="kpi-subtitle">{summary.newOutreach + summary.coldFollowup} cold contacts sent ({summary.activeDays} active days)</div>
          </div>
        </div>

        {/* Total Deals Closed */}
        <div className="kpi-card glass highlight">
          <div className="kpi-icon color-gold"><FiTarget /></div>
          <div className="kpi-info">
            <h3>Deals Closed</h3>
            <span className="kpi-value">{summary.deals}</span>
            <div className="kpi-subtitle">Success deal rate: {summary.dealRate}%</div>
          </div>
        </div>

        {/* Response Generation Rate */}
        <div className="kpi-card glass">
          <div className="kpi-icon color-green"><FiCheckCircle /></div>
          <div className="kpi-info">
            <h3>Response Generation</h3>
            <span className="kpi-value">{summary.responseRate}%</span>
            <div className="kpi-subtitle">Received {summary.responses} responses</div>
          </div>
        </div>
      </div>

      {/* Auxiliary Rate Cards */}
      <div className="aux-stats-grid">
        <div className="aux-card glass">
          <div className="aux-header">
            <span><FiUsers /> New Outreach Contacts</span>
            <strong>{summary.newOutreach} Leads</strong>
          </div>
          <div className="aux-progress-bar">
            <div className="aux-progress-fill color-blue" style={{ width: `${summary.newOutreach > 0 ? 100 : 0}%` }}></div>
          </div>
          <span className="aux-detail">Initial contacts added to the CRM</span>
        </div>

        <div className="aux-card glass">
          <div className="aux-header">
            <span><FiTrendingUp /> Warm Nurturing Volume</span>
            <strong>{summary.warmFollowup} Touchpoints</strong>
          </div>
          <div className="aux-progress-bar">
            <div className="aux-progress-fill color-gold" style={{ width: `${summary.warmFollowup > 0 ? 100 : 0}%` }}></div>
          </div>
          <span className="aux-detail">Followups sent to already-responded leads</span>
        </div>

        <div className="aux-card glass">
          <div className="aux-header">
            <span><FiTrendingDown /> Loss & Failed Count</span>
            <strong>{summary.failed} Leads</strong>
          </div>
          <div className="aux-progress-bar">
            <div className="aux-progress-fill color-red" style={{ width: `${summary.failed > 0 ? 100 : 0}%` }}></div>
          </div>
          <span className="aux-detail">Leads rejected or marked inactive</span>
        </div>
      </div>

      {/* Charts Matrix */}
      <div className="dashboard-charts">
        {/* Trajectory Trend (Work Done vs Closed Deals) */}
        <div className="chart-card glass full-width">
          <h3>
            {selectedMonth === 'ALL' 
              ? '📈 Month-over-Month Workload & Deals Closed' 
              : `📅 Daily Effort Trajectory — ${formatMonthName(selectedMonth)}`}
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
                    <Area type="monotone" dataKey="Touchpoints" name="Total Work Effort" stroke="#3498db" strokeWidth={2} fillOpacity={1} fill="url(#colorEffort)" />
                    <Area type="monotone" dataKey="Contacts" name="New Outreach" stroke="#9b59b6" strokeWidth={2} fillOpacity={0} />
                    <Area type="monotone" dataKey="Deals" name="Deals Closed" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorDeals)" />
                  </AreaChart>
                ) : (
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                    <Legend />
                    <Line type="monotone" dataKey="Touchpoints" name="Total Work Effort" stroke="#3498db" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Contacts" name="New Outreach" stroke="#9b59b6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Deals" name="Deals Closed" stroke="#D4AF37" strokeWidth={2} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">No effort history data for this period.</div>
            )}
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div className="chart-card glass">
          <h3>Lead Acquisition Channels (Sources)</h3>
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
              <div className="empty-placeholder">No lead source statistics.</div>
            )}
          </div>
        </div>

        {/* Rejection / Failure Reasons breakdown */}
        <div className="chart-card glass">
          <h3>Primary Rejection & Loss Reasons</h3>
          <div className="chart-container">
            {failures.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={failures} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="white" width={140} style={{ fontSize: '0.8rem' }} />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                  <Bar dataKey="value" name="Leads" fill="#e74c3c" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: 'white' }} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">No failed leads recorded. Excellent job!</div>
            )}
          </div>
        </div>

        {/* Lead Funnel */}
        <div className="chart-card glass">
          <h3>CRM Conversion Pipeline</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart layout="vertical" data={funnel}>
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
          <h3>Industry Performance (Click to Highlight)</h3>
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
              <div className="empty-placeholder">No industry stats.</div>
            )}
          </div>
        </div>

        {/* Regional Performance */}
        <div className="chart-card glass full-width">
          <h3>Regional Outreach & Conversion (Click Bar to Highlight)</h3>
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
                    name="Leads Contacted" 
                    fill="#3498db" 
                    radius={[4, 4, 0, 0]}
                    onClick={(entry) => setSelectedRegion(entry.name === selectedRegion ? null : entry.name)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Bar 
                    dataKey="deals" 
                    name="Deals Closed" 
                    fill="#D4AF37" 
                    radius={[4, 4, 0, 0]}
                    onClick={(entry) => setSelectedRegion(entry.name === selectedRegion ? null : entry.name)}
                    style={{ cursor: 'pointer' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-placeholder">No regional data.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
