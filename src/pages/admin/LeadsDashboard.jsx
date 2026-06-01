import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { FiUsers, FiTarget, FiActivity, FiCheckCircle, FiTrendingUp, FiMapPin, FiBriefcase } from 'react-icons/fi';
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
    setIsLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
      setAnalytics(getAnalytics(data));
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
          Loading Dashboard Analytics...
        </div>
      </div>
    );
  }

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
        <p>Sales performance and conversion analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card glass highlight">
          <div className="kpi-icon"><FiUsers /></div>
          <div className="kpi-info">
            <h3>Newly Contacted</h3>
            <span className="kpi-value">{stats.totalContacts}</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon"><FiActivity /></div>
          <div className="kpi-info">
            <h3>Response Rate</h3>
            <span className="kpi-value">{stats.responseRate}%</span>
          </div>
        </div>
        <div className="kpi-card glass">
          <div className="kpi-icon"><FiTarget /></div>
          <div className="kpi-info">
            <h3>Total Deals</h3>
            <span className="kpi-value">{stats.totalDeals}</span>
          </div>
        </div>
        <div className="kpi-card glass highlight">
          <div className="kpi-icon"><FiCheckCircle /></div>
          <div className="kpi-info">
            <h3>Deal Success</h3>
            <span className="kpi-value">{stats.dealRate}%</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        {/* Conversion Funnel */}
        <div className="chart-card glass">
          <h3>Lead Conversion Funnel</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart layout="vertical" data={[
                { name: 'Contacted', value: stats.totalContacts, fill: '#3498db' },
                { name: 'Responded', value: stats.totalResponded, fill: '#9b59b6' },
                { name: 'Deals', value: stats.totalDeals, fill: '#D4AF37' }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="white" width={100} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: 'white' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Industry Breakdown */}
        <div className="chart-card glass">
          <h3>Industry Performance</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.fieldData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.fieldData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="chart-card glass full-width">
          <h3>Regional Distribution (Leads vs Deals)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
                <Legend />
                <Bar dataKey="contacts" name="Leads" fill="#3498db" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deals" name="Deals" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next Plan Summary Board */}
        <div className="chart-card glass full-width">
          <h3>📋 Upcoming Strategy & Next Plans</h3>
          <div className="next-plans-grid">
            {leads.filter(l => l.next_plan).slice(0, 4).map((lead, i) => (
              <div key={i} className="plan-card glass">
                <div className="plan-header">
                  <span className="plan-date">{new Date(lead.report_date).toLocaleDateString()}</span>
                  <span className="plan-field">{lead.business_field}</span>
                </div>
                <p className="plan-text">{lead.next_plan}</p>
                <div className="plan-footer">
                  <span className="badge-region">{lead.region}</span>
                </div>
              </div>
            ))}
            {leads.filter(l => l.next_plan).length === 0 && (
              <p className="empty-msg">No upcoming plans documented yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
