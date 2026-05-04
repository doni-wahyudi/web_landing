import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { FiUsers, FiTarget, FiActivity, FiCheckCircle, FiGlobe, FiEye, FiTrendingUp } from 'react-icons/fi';
import { getLeads, getAnalytics } from '../../services/leadService';
import './LeadsDashboard.css';

const COLORS = ['#D4AF37', '#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#f1c40f'];

const LeadsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [visitorStats, setVisitorStats] = useState({ totalViews: 0, uniqueVisitors: 0, topPages: [] });
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch Leads
      const data = await getLeads();
      setLeads(data);
      setAnalytics(getAnalytics(data));

      // Fetch Visitors
      const vResponse = await fetch('https://aurotech.co.id/api/visitor-stats');
      if (vResponse.ok) {
        const vData = await vResponse.json();
        setVisitorStats(vData);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const emptyAnalytics = {
    totalContacts: 0, totalResponded: 0, totalDeals: 0,
    responseRate: 0, dealRate: 0,
    regionData: [{ name: 'No Data', contacts: 0, deals: 0 }],
    fieldData: [{ name: 'No Data', value: 1 }]
  };

  const stats = analytics || emptyAnalytics;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Acquisition Dashboard</h1>
        <p>Real-time performance and visitor analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card glass highlight">
          <div className="kpi-icon"><FiGlobe /></div>
          <div className="kpi-info">
            <h3>Website Visitors</h3>
            <span className="kpi-value">{visitorStats.uniqueVisitors}</span>
          </div>
        </div>
        <div className="kpi-card glass highlight">
          <div className="kpi-icon"><FiEye /></div>
          <div className="kpi-info">
            <h3>Page Views</h3>
            <span className="kpi-value">{visitorStats.totalViews}</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon"><FiUsers /></div>
          <div className="kpi-info">
            <h3>Total Leads</h3>
            <span className="kpi-value">{stats.totalContacts}</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon"><FiCheckCircle /></div>
          <div className="kpi-info">
            <h3>Total Deals</h3>
            <span className="kpi-value">{stats.totalDeals}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        {/* Visitor Table */}
        <div className="chart-card glass">
          <h3>Top Visited Pages</h3>
          <div className="top-pages-list">
            {visitorStats.topPages.length > 0 ? (
              visitorStats.topPages.map((page, i) => (
                <div key={i} className="page-item">
                  <span className="page-path">{page.page_path}</span>
                  <span className="page-views badge-user">{page.views} views</span>
                </div>
              ))
            ) : (
              <p className="empty-msg">No visitor data yet</p>
            )}
          </div>
        </div>

        {/* Response Performance */}
        <div className="chart-card glass">
          <h3>Response & Deal Efficiency</h3>
          <div className="efficiency-grid">
            <div className="eff-item">
              <span className="eff-label">Response Rate</span>
              <div className="eff-bar-bg"><div className="eff-bar-fill" style={{width: `${stats.responseRate}%`, background: '#3498db'}}></div></div>
              <span className="eff-val">{stats.responseRate}%</span>
            </div>
            <div className="eff-item">
              <span className="eff-label">Conversion Rate</span>
              <div className="eff-bar-bg"><div className="eff-bar-fill" style={{width: `${stats.dealRate}%`, background: '#D4AF37'}}></div></div>
              <span className="eff-val">{stats.dealRate}%</span>
            </div>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="chart-card glass full-width">
          <h3>Regional Distribution (Contacts vs Deals)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="contacts" name="Leads" fill="#3498db" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deals" name="Deals" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Trend */}
        {!analytics ? (
          <div className="chart-card glass full-width empty-chart">
            <div className="empty-placeholder">
              <FiTrendingUp />
              <p>Acquisition data will appear here once entered.</p>
            </div>
          </div>
        ) : (
          <div className="chart-card glass full-width">
            <h3>Contact Growth Trend</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={[...leads].reverse()}>
                  <defs>
                    <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="report_date" stroke="rgba(255,255,255,0.5)" tickFormatter={(val) => new Date(val).toLocaleDateString()} />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                  <Area type="monotone" dataKey="contact_count" stroke="#D4AF37" fillOpacity={1} fill="url(#colorContacts)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsDashboard;
