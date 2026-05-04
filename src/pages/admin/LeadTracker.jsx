import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiFilter, FiPhone, FiMapPin, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { getLeads, createLead, updateLead, deleteLead, getDailyLogs, getLogByDate, saveDailyLog } from '../../services/leadService';
import './LeadTracker.css';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'followed_up', label: 'Followed Up' },
  { value: 'responded', label: 'Responded' },
  { value: 'negotiating', label: 'Negotiating' },
  { value: 'deal_won', label: 'Deal Won' },
  { value: 'deal_lost', label: 'Deal Lost' },
  { value: 'not_interested', label: 'Not Interested' }
];

const STATUS_COLORS = {
  new: '#6b7280',
  contacted: '#3b82f6',
  followed_up: '#f59e0b',
  responded: '#8b5cf6',
  negotiating: '#06b6d4',
  deal_won: '#10b981',
  deal_lost: '#ef4444',
  not_interested: '#6b7280'
};

const emptyLead = {
  business_name: '',
  region: '',
  contact: '',
  whatsapp_link: '',
  status: 'contacted',
  contacted_date: new Date().toISOString().split('T')[0],
  last_follow_up: '',
  follow_up_count: 0,
  notes: ''
};

const emptyLog = {
  log_date: new Date().toISOString().split('T')[0],
  new_leads_contacted: 0,
  follow_ups_done: 0,
  responded_count: 0,
  deals_closed: 0,
  notes: ''
};

const todayStr = new Date().toISOString().split('T')[0];

const LeadTracker = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({ ...emptyLead });

  const [dailyLog, setDailyLog] = useState({ ...emptyLog, log_date: '' });
  const [logHistory, setLogHistory] = useState([]);
  const [logSaved, setLogSaved] = useState(false);
  const [selectedLogDate, setSelectedLogDate] = useState(todayStr);

  const [filterStatus, setFilterStatus] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [logDateFrom, setLogDateFrom] = useState('');
  const [logDateTo, setLogDateTo] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [leadData, logsData] = await Promise.all([
        getLeads(),
        getDailyLogs()
      ]);
      setLeads(leadData);
      setLogHistory(logsData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const loadLogForDate = async (date) => {
    setSelectedLogDate(date);
    const log = await getLogByDate(date);
    if (log) {
      setDailyLog({ ...log });
    } else {
      setDailyLog({ ...emptyLog, log_date: date });
    }
  };

  useEffect(() => {
    loadLogForDate(todayStr);
  }, []);

  const openModal = (lead = null) => {
    if (lead) {
      setEditingLead(lead);
      setFormData({ ...lead });
    } else {
      setEditingLead(null);
      setFormData({ ...emptyLead, contacted_date: new Date().toISOString().split('T')[0] });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLead) {
        await updateLead(editingLead.id, formData);
      } else {
        await createLead(formData);
      }
      closeModal();
      loadData();
    } catch (err) {
      alert('Failed to save lead.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this lead?')) {
      await deleteLead(id);
      loadData();
    }
  };

  const handleDailyLogSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveDailyLog(dailyLog);
      setLogSaved(true);
      setTimeout(() => setLogSaved(false), 2000);
      loadData();
    } catch (err) {
      alert('Failed to save daily log.');
    }
  };

  const filteredLeads = leads.filter(l => {
    if (filterStatus && l.status !== filterStatus) return false;
    if (filterRegion && !(l.region || '').toLowerCase().includes(filterRegion.toLowerCase())) return false;
    return true;
  });

  const regions = [...new Set(leads.map(l => l.region).filter(Boolean))];

  const filteredLogs = logHistory.filter(l => {
    if (logDateFrom && l.log_date < logDateFrom) return false;
    if (logDateTo && l.log_date > logDateTo) return false;
    return true;
  });

  const getStatusLabel = (val) => STATUS_OPTIONS.find(s => s.value === val)?.label || val;

  const isOverdue = (lead) => {
    if (!['contacted', 'responded', 'negotiating'].includes(lead.status)) return false;
    if (!lead.contacted_date) return false;
    const lastDate = lead.last_follow_up || lead.contacted_date;
    const diff = (Date.now() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 3;
  };

  return (
    <div className="admin-page lt-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">Lead Tracker</h1>
          <p className="admin-subtitle">Input & manage leads, log daily outreach activity.</p>
        </div>
        <button className="btn btn-primary btn-add" onClick={() => openModal()}>
          <FiPlus /> Add Lead
        </button>
      </div>

      <div className="lt-daily-log-section">
        <div className="lt-log-header">
          <h3 className="lt-section-title"><FiCalendar /> Activity Log</h3>
          <div className="lt-date-picker">
            <label>Date:</label>
            <input type="date" value={selectedLogDate}
              onChange={e => loadLogForDate(e.target.value)} />
            <button type="button" className="btn btn-sm btn-outline" onClick={() => loadLogForDate(todayStr)}>Today</button>
          </div>
        </div>
        <form className="lt-daily-form" onSubmit={handleDailyLogSubmit}>
          <div className="lt-daily-grid">
            <div className="form-group">
              <label>New Leads Contacted</label>
              <input type="number" min="0" value={dailyLog.new_leads_contacted}
                onChange={e => setDailyLog({ ...dailyLog, new_leads_contacted: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="form-group">
              <label>Follow-ups Done</label>
              <input type="number" min="0" value={dailyLog.follow_ups_done}
                onChange={e => setDailyLog({ ...dailyLog, follow_ups_done: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="form-group">
              <label>Responses Received</label>
              <input type="number" min="0" value={dailyLog.responded_count}
                onChange={e => setDailyLog({ ...dailyLog, responded_count: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="form-group">
              <label>Deals Closed</label>
              <input type="number" min="0" value={dailyLog.deals_closed}
                onChange={e => setDailyLog({ ...dailyLog, deals_closed: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea className="lt-notes-input" rows="2" value={dailyLog.notes}
              onChange={e => setDailyLog({ ...dailyLog, notes: e.target.value })} placeholder="Any observations for today..." />
          </div>
          <div className="lt-daily-actions">
            <button type="submit" className="btn btn-primary">
              {logSaved ? 'Saved!' : 'Save Daily Log'}
            </button>
          </div>
        </form>
        {logHistory.length > 0 && (
          <div className="lt-log-history">
            <div className="lt-log-history-top">
              <span className="lt-log-history-label">Log history</span>
              <div className="lt-log-date-range">
                <input type="date" value={logDateFrom} onChange={e => setLogDateFrom(e.target.value)} placeholder="From" />
                <span className="lt-log-range-sep">—</span>
                <input type="date" value={logDateTo} onChange={e => setLogDateTo(e.target.value)} placeholder="To" />
                {(logDateFrom || logDateTo) && (
                  <button type="button" className="lt-log-range-clear" onClick={() => { setLogDateFrom(''); setLogDateTo(''); }}>Reset</button>
                )}
              </div>
            </div>
            <div className="lt-log-history-chips">
              {filteredLogs.slice(0, 20).map(log => (
                <button key={log.id || log.log_date}
                  type="button"
                  className={`lt-log-chip ${log.log_date === selectedLogDate ? 'active' : ''}`}
                  onClick={() => loadLogForDate(log.log_date)}>
                  {log.log_date}
                </button>
              ))}
              {filteredLogs.length === 0 && <span className="lt-log-no-match">No logs in range</span>}
            </div>
          </div>
        )}
      </div>

      <div className="lt-filters">
        <FiFilter className="lt-filter-icon" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="lt-filter-select">
          <option value="">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <input type="text" placeholder="Filter region..." value={filterRegion}
          onChange={e => setFilterRegion(e.target.value)} className="lt-filter-input" />
        {(filterStatus || filterRegion) && (
          <button className="lt-clear-filters" onClick={() => { setFilterStatus(''); setFilterRegion(''); }}>Clear</button>
        )}
        <span className="lt-count">{filteredLeads.length} leads</span>
      </div>

      <div className="admin-table-container glass">
        {isLoading ? (
          <div className="admin-loading">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="admin-empty-state">
            <p>No leads found. Click "Add Lead" to get started.</p>
          </div>
        ) : (
          <div className="lt-table-scroll">
            <table className="admin-table lt-table">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Region</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Contacted</th>
                  <th>Last Follow-up</th>
                  <th>Follow-ups</th>
                  <th>Notes</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className={isOverdue(lead) ? 'lt-row-overdue' : ''}>
                    <td className="lt-cell-business">
                      <span className="lt-business-name">{lead.business_name}</span>
                      {lead.whatsapp_link && (
                        <a href={lead.whatsapp_link} target="_blank" rel="noopener noreferrer" className="lt-wa-link">
                          <FiMessageSquare size={12} /> WA
                        </a>
                      )}
                    </td>
                    <td><FiMapPin size={12} className="lt-inline-icon" />{lead.region || '-'}</td>
                    <td><FiPhone size={12} className="lt-inline-icon" />{lead.contact || '-'}</td>
                    <td>
                      <span className="lt-status-badge" style={{ background: STATUS_COLORS[lead.status] || '#6b7280' }}>
                        {getStatusLabel(lead.status)}
                      </span>
                    </td>
                    <td className="lt-cell-date">{lead.contacted_date || '-'}</td>
                    <td className="lt-cell-date">{lead.last_follow_up || '-'}</td>
                    <td className="lt-cell-center">{lead.follow_up_count || 0}</td>
                    <td className="lt-cell-notes" title={lead.notes}>{lead.notes || '-'}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon edit" onClick={() => openModal(lead)} title="Edit"><FiEdit2 /></button>
                        <button className="btn-icon delete" onClick={() => handleDelete(lead.id)} title="Delete"><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal glass lt-modal">
            <div className="admin-modal-header">
              <h3>{editingLead ? 'Edit Lead' : 'Add New Lead'}</h3>
              <button className="btn-close-modal" onClick={closeModal}><FiX size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-form lt-modal-form">
              <div className="lt-form-grid">
                <div className="form-group">
                  <label>Business Name *</label>
                  <input type="text" value={formData.business_name}
                    onChange={e => setFormData({ ...formData, business_name: e.target.value })} required placeholder="e.g. Kedai Kopi Bunda" />
                </div>
                <div className="form-group">
                  <label>Region / Area *</label>
                  <input type="text" value={formData.region}
                    onChange={e => setFormData({ ...formData, region: e.target.value })} required placeholder="e.g. Jakarta Selatan" list="region-list" />
                  <datalist id="region-list">
                    {regions.map(r => <option key={r} value={r} />)}
                  </datalist>
                </div>
              </div>
              <div className="lt-form-grid">
                <div className="form-group">
                  <label>Contact / Phone</label>
                  <input type="text" value={formData.contact}
                    onChange={e => setFormData({ ...formData, contact: e.target.value })} placeholder="e.g. 08123456789" />
                </div>
                <div className="form-group">
                  <label>WhatsApp Link</label>
                  <input type="url" value={formData.whatsapp_link}
                    onChange={e => setFormData({ ...formData, whatsapp_link: e.target.value })} placeholder="https://wa.me/628123456789" />
                </div>
              </div>
              <div className="lt-form-grid">
                <div className="form-group">
                  <label>Status *</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} required className="lt-select">
                    {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Contacted Date *</label>
                  <input type="date" value={formData.contacted_date}
                    onChange={e => setFormData({ ...formData, contacted_date: e.target.value })} required />
                </div>
              </div>
              <div className="lt-form-grid">
                <div className="form-group">
                  <label>Last Follow-up Date</label>
                  <input type="date" value={formData.last_follow_up}
                    onChange={e => setFormData({ ...formData, last_follow_up: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Follow-up Count</label>
                  <input type="number" min="0" value={formData.follow_up_count}
                    onChange={e => setFormData({ ...formData, follow_up_count: parseInt(e.target.value) || 0 })} />
                </div>
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea rows="3" value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Any relevant notes about this lead..." />
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingLead ? 'Update Lead' : 'Add Lead'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTracker;
