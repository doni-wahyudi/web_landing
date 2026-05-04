import { useState, useEffect } from 'react';
import { FiUsers, FiCheckCircle, FiDollarSign, FiTrendingUp, FiPhoneCall, FiAlertTriangle, FiBarChart2, FiCalendar } from 'react-icons/fi';
import { getLeads, getLeadStats, getDailyLogs } from '../../services/leadService';
import './LeadDashboard.css';

const STATUS_OPTIONS = {
  new: { label: 'New', color: '#6b7280' },
  contacted: { label: 'Contacted', color: '#3b82f6' },
  followed_up: { label: 'Followed Up', color: '#f59e0b' },
  responded: { label: 'Responded', color: '#8b5cf6' },
  negotiating: { label: 'Negotiating', color: '#06b6d4' },
  deal_won: { label: 'Deal Won', color: '#10b981' },
  deal_lost: { label: 'Deal Lost', color: '#ef4444' },
  not_interested: { label: 'Not Interested', color: '#6b7280' }
};

const LeadDashboard = () => {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statData, logData, leadData] = await Promise.all([
        getLeadStats(),
        getDailyLogs(),
        getLeads()
      ]);
      setStats(statData);
      setLogs(logData);
      setRecentLeads(leadData.slice(0, 15));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-page ld-page">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-title">Lead Dashboard</h1>
            <p className="admin-subtitle">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const kpiCards = [
    { icon: <FiUsers />, label: 'Total Leads', value: stats.total, color: '#3b82f6' },
    { icon: <FiPhoneCall />, label: 'Active Pipeline', value: stats.active, color: '#f59e0b' },
    { icon: <FiTrendingUp />, label: 'Responded', value: stats.responded, color: '#8b5cf6' },
    { icon: <FiDollarSign />, label: 'Deals Won', value: stats.deals, color: '#10b981' },
    { icon: <FiCheckCircle />, label: 'Response Rate', value: `${stats.responseRate}%`, color: '#06b6d4' },
    { icon: <FiDollarSign />, label: 'Conversion Rate', value: `${stats.conversionRate}%`, color: '#D4AF37' },
    { icon: <FiAlertTriangle />, label: 'Needs Follow-up (>3d)', value: stats.needsFollowUp, color: '#ef4444' },
    { icon: <FiBarChart2 />, label: 'Lost / Not Interested', value: stats.lost, color: '#6b7280' },
  ];

  const totalLogContacts = logs.reduce((sum, l) => sum + (l.new_leads_contacted || 0), 0);
  const totalLogFollowups = logs.reduce((sum, l) => sum + (l.follow_ups_done || 0), 0);
  const totalLogResponses = logs.reduce((sum, l) => sum + (l.responded_count || 0), 0);
  const totalLogDeals = logs.reduce((sum, l) => sum + (l.deals_closed || 0), 0);

  const regionEntries = Object.entries(stats.regions).sort((a, b) => b[1].total - a[1].total);
  const maxRegionTotal = Math.max(...regionEntries.map(([, r]) => r.total), 1);

  const statusEntries = Object.entries(stats.statusDistribution);
  const maxStatus = Math.max(...statusEntries.map(([, v]) => v), 1);

  const statusFlow = ['new', 'contacted', 'followed_up', 'responded', 'negotiating', 'deal_won', 'deal_lost', 'not_interested'];

  return (
    <div className="admin-page ld-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">Lead Dashboard</h1>
          <p className="admin-subtitle">Track outreach performance, pipeline, and conversions.</p>
        </div>
      </div>

      <div className="ld-kpi-grid">
        {kpiCards.map((card, i) => (
          <div key={i} className="ld-kpi-card glass">
            <div className="ld-kpi-icon" style={{ color: card.color }}>{card.icon}</div>
            <div className="ld-kpi-value">{card.value}</div>
            <div className="ld-kpi-label">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="ld-two-col">
        <div className="ld-panel glass">
          <h3 className="ld-panel-title">Pipeline Status</h3>
          <div className="ld-status-flow">
            {statusFlow.map(key => {
              const info = STATUS_OPTIONS[key];
              const count = stats.statusDistribution[key] || 0;
              if (count === 0) return null;
              const pct = Math.round((count / maxStatus) * 100);
              return (
                <div key={key} className="ld-status-row">
                  <span className="ld-status-dot" style={{ background: info.color }} />
                  <span className="ld-status-name">{info.label}</span>
                  <div className="ld-status-bar-bg">
                    <div className="ld-status-bar" style={{ width: `${pct}%`, background: info.color }} />
                  </div>
                  <span className="ld-status-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ld-panel glass">
          <h3 className="ld-panel-title">Region Breakdown</h3>
          {regionEntries.length === 0 ? (
            <p className="ld-empty">No region data yet.</p>
          ) : (
            <div className="ld-region-table">
              <div className="ld-region-header">
                <span>Region</span>
                <span>Total</span>
                <span>Responded</span>
                <span>Deals</span>
                <span>Conv. Rate</span>
              </div>
              {regionEntries.map(([region, data]) => (
                <div key={region} className="ld-region-row">
                  <span className="ld-region-name">{region}</span>
                  <span>{data.total}</span>
                  <span>{data.responded}</span>
                  <span>{data.deals}</span>
                  <span className="ld-conv-rate">
                    {data.total > 0 ? Math.round((data.deals / data.total) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="ld-panel glass">
        <h3 className="ld-panel-title"><FiCalendar /> Daily Activity Summary</h3>
        <div className="ld-summary-row">
          <div className="ld-summary-item">
            <span className="ld-summary-val">{totalLogContacts}</span>
            <span className="ld-summary-lbl">Total Contacted</span>
          </div>
          <div className="ld-summary-item">
            <span className="ld-summary-val">{totalLogFollowups}</span>
            <span className="ld-summary-lbl">Total Follow-ups</span>
          </div>
          <div className="ld-summary-item">
            <span className="ld-summary-val">{totalLogResponses}</span>
            <span className="ld-summary-lbl">Total Responses</span>
          </div>
          <div className="ld-summary-item">
            <span className="ld-summary-val">{totalLogDeals}</span>
            <span className="ld-summary-lbl">Total Deals</span>
          </div>
        </div>
        {logs.length === 0 ? (
          <p className="ld-empty">No daily logs recorded yet.</p>
        ) : (
          <div className="ld-table-scroll">
            <table className="admin-table ld-logs-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>New Contacts</th>
                  <th>Follow-ups</th>
                  <th>Responses</th>
                  <th>Deals</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {logs.slice(0, 30).map(log => (
                  <tr key={log.id || log.log_date}>
                    <td className="ld-cell-date">{log.log_date}</td>
                    <td className="ld-cell-num">{log.new_leads_contacted}</td>
                    <td className="ld-cell-num">{log.follow_ups_done}</td>
                    <td className="ld-cell-num">{log.responded_count}</td>
                    <td className="ld-cell-num">{log.deals_closed}</td>
                    <td className="ld-cell-notes" title={log.notes}>{log.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="ld-panel glass">
        <h3 className="ld-panel-title">Recent Leads</h3>
        {recentLeads.length === 0 ? (
          <p className="ld-empty">No leads recorded yet.</p>
        ) : (
          <div className="ld-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Region</th>
                  <th>Status</th>
                  <th>Contacted</th>
                  <th>Follow-ups</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map(lead => (
                  <tr key={lead.id}>
                    <td><strong>{lead.business_name}</strong></td>
                    <td>{lead.region || '-'}</td>
                    <td>
                      <span className="ld-status-badge" style={{ background: STATUS_OPTIONS[lead.status]?.color || '#6b7280' }}>
                        {STATUS_OPTIONS[lead.status]?.label || lead.status}
                      </span>
                    </td>
                    <td className="ld-cell-date">{lead.contacted_date || '-'}</td>
                    <td className="ld-cell-num">{lead.follow_up_count || 0}</td>
                    <td className="ld-cell-notes" title={lead.notes}>{lead.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadDashboard;
