import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { FiUsers, FiTarget, FiActivity, FiCheckCircle } from 'react-icons/fi';
import { getLeads, getAnalytics } from '../../services/leadService';
import './LeadsDashboard.css';

const COLORS = ['#D4AF37', '#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#f1c40f'];

const LeadsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
      const stats = getAnalytics(data);
      setAnalytics(stats);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="admin-container">Loading Dashboard...</div>;
  if (!analytics) return <div className="admin-container">No data available yet.</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Acquisition Dashboard</h1>
        <p>Performance metrics and lead analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card glass">
          <div className="kpi-icon"><FiUsers /></div>
          <div className="kpi-info">
            <h3>Total Contacts</h3>
            <span className="kpi-value">{analytics.totalContacts}</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon"><FiActivity /></div>
          <div className="kpi-info">
            <h3>Response Rate</h3>
            <span className="kpi-value">{analytics.responseRate}%</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon"><FiCheckCircle /></div>
          <div className="kpi-info">
            <h3>Deal Rate</h3>
            <span className="kpi-value">{analytics.dealRate}%</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon"><FiTarget /></div>
          <div className="kpi-info">
            <h3>Total Deals</h3>
            <span className="kpi-value">{analytics.totalDeals}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        {/* Regional Performance */}
        <div className="chart-card glass">
          <h3>Regional Distribution (Contacts vs Deals)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="contacts" fill="#3498db" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deals" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Field Distribution */}
        <div className="chart-card glass">
          <h3>Business Field Interest</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.fieldData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.fieldData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Trend */}
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
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid #333' }}
                />
                <Area type="monotone" dataKey="contact_count" stroke="#D4AF37" fillOpacity={1} fill="url(#colorContacts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
