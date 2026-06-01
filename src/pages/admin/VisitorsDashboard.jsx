import { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend
} from 'recharts';
import { FiGlobe, FiEye, FiTrendingUp, FiMousePointer } from 'react-icons/fi';
import './LeadsDashboard.css'; // Reusing base styles

const VisitorsDashboard = () => {
  const [stats, setStats] = useState({ totalViews: 0, uniqueVisitors: 0, topPages: [], history: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('https://aurotech.co.id/api/visitor-stats');
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

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Traffic Analytics</h1>
        <p>Monitor website traffic and user engagement</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card glass highlight">
          <div className="kpi-icon"><FiGlobe /></div>
          <div className="kpi-info">
            <h3>Unique Visitors</h3>
            <span className="kpi-value">{stats.uniqueVisitors}</span>
          </div>
        </div>
        <div className="kpi-card glass highlight">
          <div className="kpi-icon"><FiEye /></div>
          <div className="kpi-info">
            <h3>Total Page Views</h3>
            <span className="kpi-value">{stats.totalViews}</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon"><FiMousePointer /></div>
          <div className="kpi-info">
            <h3>Avg. Views/Visitor</h3>
            <span className="kpi-value">{(stats.totalViews / (stats.uniqueVisitors || 1)).toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-card glass full-width">
          <h3>Visitor Growth (Last 7 Days)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats.history.length > 0 ? stats.history : [{stat_date: 'Waiting...', unique_visitors: 0}]}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="stat_date" stroke="rgba(255,255,255,0.5)" tickFormatter={(val) => val.includes('Waiting') ? val : new Date(val).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})} />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Area type="monotone" dataKey="unique_visitors" name="Visitors" stroke="#3498db" fillOpacity={1} fill="url(#colorVisits)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card glass">
          <h3>Top Visited Pages</h3>
          <div className="top-pages-list">
            {stats.topPages.map((page, i) => (
              <div key={i} className="page-item">
                <span className="page-path">{page.page_path}</span>
                <span className="page-views badge-user">{page.views} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card glass">
          <h3>Peak Traffic Volume</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.topPages.slice(0, 3)}>
                <XAxis dataKey="page_path" hide />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="views" fill="#D4AF37" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsDashboard;
