import { useState, useEffect } from 'react';
import { 
  FiPlus, FiTrash2, FiCalendar, FiMapPin, FiBriefcase, FiMessageSquare, 
  FiTrendingUp, FiUsers, FiActivity, FiTarget, FiCheckCircle, FiSearch, 
  FiPhone, FiClock, FiX, FiCheck, FiInfo, FiTag, FiAlertTriangle, FiPlusCircle
} from 'react-icons/fi';
import { getLeads, addLead, updateLead, deleteLead, logLeadActivity } from '../../services/crmService';
import './LeadsTracker.css';

const STATUS_CONFIG = {
  ALL: { label: 'All Leads', color: 'rgba(255, 255, 255, 0.4)' },
  new_outreach: { label: 'New Outreach', color: '#3498db' },
  unresponded_followup: { label: 'Cold Follow-up', color: '#7f8c8d' },
  responded: { label: 'Responded', color: '#9b59b6' },
  responded_followup: { label: 'Warm Follow-up', color: '#e67e22' },
  deal: { label: 'Deals Closed', color: '#2ecc71' },
  failed: { label: 'Failed/Rejected', color: '#e74c3c' }
};

const LEAD_SOURCES = [
  'Google Maps Search',
  'Instagram Search',
  'Facebook Group',
  'TikTok Search',
  'Referral',
  'Direct/Other'
];

const PACKAGES = [
  'Starter (Basic Cashier Software)',
  'Pro (Inventory + Sales)',
  'Enterprise (Multi-branch + Custom)',
  'Hardware Package + Pro Software'
];

const FAILURE_REASONS = [
  'Price too expensive / Budget issue',
  'Already using competitor cashier',
  'No response after multiple follow-ups',
  'Features do not fit requirements',
  'Not interested / Declined directly'
];

const REGIONS = [
  'Jakarta Pusat', 'Jakarta Utara', 'Jakarta Timur', 'Jakarta Selatan', 
  'Jakarta Barat', 'Bekasi', 'Depok', 'Tangerang', 'Bogor', 'Luar Jabodetabek'
];

const LeadsTracker = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('ALL');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeLead, setActiveLead] = useState(null); // Selected lead for detail/log
  const [showLogActivityModal, setShowLogActivityModal] = useState(false);
  const [activityType, setActivityType] = useState(''); // Type of log

  // New Lead Form state
  const [newLeadData, setNewLeadData] = useState({
    customerName: '',
    businessName: '',
    phoneNumber: '',
    category: '',
    area: '',
    customArea: '',
    leadSource: 'Google Maps Search',
    waAccountUsed: 'WA Account 1',
    notes: '',
    nextFollowupDate: ''
  });

  // Action/Activity Form state
  const [activityData, setActivityData] = useState({
    activityDate: new Date().toISOString().split('T')[0],
    waAccountUsed: 'WA Account 1',
    notes: '',
    dealValue: '',
    dealPackage: PACKAGES[0],
    failureReason: FAILURE_REASONS[0],
    nextFollowupDate: ''
  });

  useEffect(() => {
    fetchLeadsData();
  }, []);

  const fetchLeadsData = async () => {
    setIsLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      const finalArea = newLeadData.area === 'Luar Jabodetabek' ? newLeadData.customArea : newLeadData.area;
      const payload = {
        ...newLeadData,
        area: finalArea
      };
      await addLead(payload);
      setShowAddModal(false);
      
      // Reset form
      setNewLeadData({
        customerName: '',
        businessName: '',
        phoneNumber: '',
        category: '',
        area: '',
        customArea: '',
        leadSource: 'Google Maps Search',
        waAccountUsed: 'WA Account 1',
        notes: '',
        nextFollowupDate: ''
      });
      
      fetchLeadsData();
    } catch (err) {
      alert('Error creating lead: ' + err.message);
    }
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    if (!activeLead) return;

    try {
      const payload = {
        activityType,
        activityDate: activityData.activityDate,
        waAccountUsed: activityData.waAccountUsed,
        notes: activityData.notes,
        dealValue: activityType === 'deal_closed' ? parseFloat(activityData.dealValue) || 0 : undefined,
        dealPackage: activityType === 'deal_closed' ? activityData.dealPackage : undefined,
        failureReason: activityType === 'marked_failed' ? activityData.failureReason : undefined,
        nextFollowupDate: ['cold_followup', 'warm_followup'].includes(activityType) ? activityData.nextFollowupDate : undefined
      };

      await logLeadActivity(activeLead.id, payload);
      setShowLogActivityModal(false);
      
      // Refresh lead detail and overall list
      const refreshedLeads = await getLeads();
      setLeads(refreshedLeads);
      const updatedActive = refreshedLeads.find(l => l.id === activeLead.id);
      setActiveLead(updatedActive);

      // Reset activity form
      setActivityData({
        activityDate: new Date().toISOString().split('T')[0],
        waAccountUsed: 'WA Account 1',
        notes: '',
        dealValue: '',
        dealPackage: PACKAGES[0],
        failureReason: FAILURE_REASONS[0],
        nextFollowupDate: ''
      });
    } catch (err) {
      alert('Error logging activity: ' + err.message);
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this lead and all of its activity logs?')) {
      try {
        await deleteLead(id);
        setActiveLead(null);
        fetchLeadsData();
      } catch (err) {
        alert('Error deleting lead: ' + err.message);
      }
    }
  };

  // 1. Filter Leads list
  const filteredLeads = leads.filter(lead => {
    const matchTab = selectedTab === 'ALL' || lead.status === selectedTab;
    const matchSearch = searchQuery === '' || 
      (lead.customer_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.business_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.phone_number?.includes(searchQuery)) ||
      (lead.category?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.area?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchTab && matchSearch;
  });

  // 2. Identify Leads due for Follow-Up today or past due
  const todayStr = new Date().toISOString().split('T')[0];
  const followUpDueLeads = leads.filter(lead => {
    if (!lead.next_followup_date) return false;
    // Only unclosed leads
    if (['deal', 'failed'].includes(lead.status)) return false;
    return lead.next_followup_date <= todayStr;
  });

  return (
    <div className="admin-container">
      <div className="crm-header-bar">
        <div className="admin-header">
          <h1>Lead CRM Manager</h1>
          <p>Nurture and trace individual customer outreach and conversions</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <FiPlus /> Add New Lead
        </button>
      </div>

      {/* Due for Follow-up alerts widget */}
      {followUpDueLeads.length > 0 && (
        <div className="followup-alert-widget glass animate-reveal">
          <div className="widget-header">
            <h4>
              <FiClock className="icon-pulse" /> Follow-Up Tasks Due Today ({followUpDueLeads.length})
            </h4>
            <span className="subtitle">These leads reached their scheduled follow-up interval. Ping them on WhatsApp!</span>
          </div>
          <div className="due-leads-grid">
            {followUpDueLeads.slice(0, 4).map(lead => (
              <div key={lead.id} className="due-lead-card glass" onClick={() => setActiveLead(lead)}>
                <div className="due-card-top">
                  <span className="due-badge" style={{ backgroundColor: STATUS_CONFIG[lead.status]?.color }}>
                    {STATUS_CONFIG[lead.status]?.label}
                  </span>
                  <span className="due-date">Due: {new Date(lead.next_followup_date).toLocaleDateString()}</span>
                </div>
                <h5>{lead.business_name || 'No Business Name'}</h5>
                <p>{lead.customer_name} ({lead.phone_number})</p>
                <div className="due-card-footer">
                  <span className="badge-region">{lead.area}</span>
                  <button className="btn-tiny">Log Follow-up</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main CRM Workspace */}
      <div className="crm-workspace">
        {/* Filters and List */}
        <div className="crm-main-card glass">
          <div className="crm-table-controls">
            {/* Search */}
            <div className="crm-search-wrapper">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by name, business, phone, area..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}><FiX /></button>
              )}
            </div>

            {/* Status Tab list */}
            <div className="crm-tabs">
              {Object.keys(STATUS_CONFIG).map(statusKey => {
                const count = statusKey === 'ALL' 
                  ? leads.length 
                  : leads.filter(l => l.status === statusKey).length;

                return (
                  <button 
                    key={statusKey} 
                    className={`crm-tab ${selectedTab === statusKey ? 'active' : ''}`}
                    onClick={() => setSelectedTab(statusKey)}
                  >
                    {STATUS_CONFIG[statusKey].label}
                    <span className="tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {isLoading ? (
            <div className="empty-placeholder">Loading CRM database...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="empty-placeholder">
              <FiInfo size={24} style={{ marginBottom: '0.5rem', color: 'var(--primary)' }} />
              No leads match your active filters or search terms.
            </div>
          ) : (
            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Lead Info</th>
                    <th>Category & Region</th>
                    <th>Lead Source</th>
                    <th>Status</th>
                    <th>Next Action</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(lead => (
                    <tr 
                      key={lead.id} 
                      className={`lead-row ${activeLead?.id === lead.id ? 'selected' : ''}`}
                      onClick={() => setActiveLead(lead)}
                    >
                      <td>
                        <div className="lead-name-cell">
                          <strong>{lead.business_name || 'No Business Name'}</strong>
                          <span>{lead.customer_name || 'Unnamed contact'} • {lead.phone_number}</span>
                        </div>
                      </td>
                      <td>
                        <div className="lead-meta-cell">
                          <span className="meta-category"><FiBriefcase /> {lead.category}</span>
                          <span className="meta-region"><FiMapPin /> {lead.area}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge-source"><FiTag /> {lead.lead_source}</span>
                      </td>
                      <td>
                        <span 
                          className="status-badge" 
                          style={{ 
                            color: STATUS_CONFIG[lead.status]?.color, 
                            borderColor: STATUS_CONFIG[lead.status]?.color + '40',
                            backgroundColor: STATUS_CONFIG[lead.status]?.color + '15' 
                          }}
                        >
                          {STATUS_CONFIG[lead.status]?.label}
                        </span>
                      </td>
                      <td>
                        {lead.next_followup_date ? (
                          <span className={`next-action-date ${lead.next_followup_date <= todayStr ? 'overdue' : ''}`}>
                            <FiCalendar /> {new Date(lead.next_followup_date).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="no-next-action">—</span>
                        )}
                      </td>
                      <td>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLead(lead.id);
                          }} 
                          className="btn-icon-delete"
                          title="Delete Lead"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Profile Detail Drawer (Right side) */}
        {activeLead && (
          <div className="crm-details-drawer glass animate-slide-in">
            <div className="drawer-header">
              <h3>Lead Profile Details</h3>
              <button className="btn-close" onClick={() => setActiveLead(null)}><FiX /></button>
            </div>

            <div className="drawer-content">
              {/* Lead identity card */}
              <div className="profile-hero-card">
                <h4>{activeLead.business_name || 'No Business Name'}</h4>
                <p className="subtitle">{activeLead.customer_name}</p>
                <div className="profile-status-badge" style={{ backgroundColor: STATUS_CONFIG[activeLead.status]?.color + '20', color: STATUS_CONFIG[activeLead.status]?.color }}>
                  {STATUS_CONFIG[activeLead.status]?.label}
                </div>
              </div>

              {/* Main Actions Panel */}
              <div className="profile-actions-panel">
                <h5>Log Customer Progress</h5>
                <div className="action-buttons-grid">
                  {!['deal', 'failed'].includes(activeLead.status) && (
                    <>
                      <button 
                        className="btn-action cold" 
                        onClick={() => {
                          setActivityType('cold_followup');
                          setShowLogActivityModal(true);
                        }}
                      >
                        <FiClock /> Log Cold Follow-up
                      </button>
                      <button 
                        className="btn-action responded" 
                        onClick={() => {
                          setActivityType('response_received');
                          setShowLogActivityModal(true);
                        }}
                      >
                        <FiActivity /> Log Response Received
                      </button>
                      {activeLead.status.includes('responded') && (
                        <button 
                          className="btn-action warm" 
                          onClick={() => {
                            setActivityType('warm_followup');
                            setShowLogActivityModal(true);
                          }}
                        >
                          <FiTrendingUp /> Log Warm Follow-up
                        </button>
                      )}
                    </>
                  )}
                  {activeLead.status !== 'deal' && (
                    <button 
                      className="btn-action deal" 
                      onClick={() => {
                        setActivityType('deal_closed');
                        setShowLogActivityModal(true);
                      }}
                    >
                      <FiTarget /> Close Deal
                    </button>
                  )}
                  {activeLead.status !== 'failed' && (
                    <button 
                      className="btn-action failed" 
                      onClick={() => {
                        setActivityType('marked_failed');
                        setShowLogActivityModal(true);
                      }}
                    >
                      <FiAlertTriangle /> Mark Failed / Rejected
                    </button>
                  )}
                </div>
              </div>

              {/* Detailed Lead parameters */}
              <div className="profile-details-list">
                <h5>Lead Metadata</h5>
                <div className="detail-item">
                  <span className="label"><FiPhone /> Phone Number</span>
                  <span className="value">{activeLead.phone_number}</span>
                </div>
                <div className="detail-item">
                  <span className="label"><FiBriefcase /> Category</span>
                  <span className="value">{activeLead.category}</span>
                </div>
                <div className="detail-item">
                  <span className="label"><FiMapPin /> Region/Area</span>
                  <span className="value">{activeLead.area}</span>
                </div>
                <div className="detail-item">
                  <span className="label"><FiTag /> Lead Source</span>
                  <span className="value">{activeLead.lead_source}</span>
                </div>
                <div className="detail-item">
                  <span className="label"><FiUsers /> WA Account</span>
                  <span className="value">{activeLead.wa_account_used}</span>
                </div>
                {activeLead.status === 'deal' && (
                  <>
                    <div className="detail-item highlighted-deal">
                      <span className="label"><FiTarget /> Deal Package</span>
                      <span className="value">{activeLead.deal_package || 'Not specified'}</span>
                    </div>
                    <div className="detail-item highlighted-deal">
                      <span className="label">💵 Deal Value</span>
                      <span className="value">
                        {activeLead.deal_value ? `IDR ${parseFloat(activeLead.deal_value).toLocaleString('id-ID')}` : 'IDR 0'}
                      </span>
                    </div>
                  </>
                )}
                {activeLead.status === 'failed' && (
                  <div className="detail-item highlighted-failed">
                    <span className="label"><FiAlertTriangle /> Rejection Reason</span>
                    <span className="value">{activeLead.failure_reason || 'Not specified'}</span>
                  </div>
                )}
                {activeLead.notes && (
                  <div className="detail-item-notes">
                    <span className="label"><FiMessageSquare /> Profile Notes</span>
                    <p className="value-notes">{activeLead.notes}</p>
                  </div>
                )}
              </div>

              {/* Delete button inside drawer */}
              <div className="profile-danger-zone">
                <button onClick={() => handleDeleteLead(activeLead.id)} className="btn btn-danger btn-full">
                  <FiTrash2 /> Delete Lead Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL 1: ADD LEAD MODAL --- */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card glass" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FiPlusCircle /> Add New Customer Lead</h3>
              <button className="btn-close" onClick={() => setShowAddModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateLead} className="premium-form modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Business Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dental Clinic XYZ" 
                    value={newLeadData.businessName}
                    onChange={e => setNewLeadData({...newLeadData, businessName: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Contact Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dr. Jane Doe" 
                    value={newLeadData.customerName}
                    onChange={e => setNewLeadData({...newLeadData, customerName: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FiPhone /> WhatsApp Phone Number *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 08123456789" 
                    value={newLeadData.phoneNumber}
                    onChange={e => setNewLeadData({...newLeadData, phoneNumber: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label><FiBriefcase /> Category (Business Field) *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dental, Bakery, Laundry" 
                    value={newLeadData.category}
                    onChange={e => setNewLeadData({...newLeadData, category: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FiMapPin /> Region / Area *</label>
                  <select 
                    value={newLeadData.area}
                    onChange={e => setNewLeadData({...newLeadData, area: e.target.value})}
                    required
                  >
                    <option value="">Pilih Region</option>
                    {REGIONS.map(reg => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label><FiTag /> Lead Source *</label>
                  <select 
                    value={newLeadData.leadSource}
                    onChange={e => setNewLeadData({...newLeadData, leadSource: e.target.value})}
                    required
                  >
                    {LEAD_SOURCES.map(src => (
                      <option key={src} value={src}>{src}</option>
                    ))}
                  </select>
                </div>
              </div>

              {newLeadData.area === 'Luar Jabodetabek' && (
                <div className="form-group">
                  <label>Nama Kota (Luar Jabodetabek)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Surabaya, Bandung" 
                    value={newLeadData.customArea}
                    onChange={e => setNewLeadData({...newLeadData, customArea: e.target.value})}
                    required
                  />
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label><FiUsers /> WA Account Used</label>
                  <select 
                    value={newLeadData.waAccountUsed}
                    onChange={e => setNewLeadData({...newLeadData, waAccountUsed: e.target.value})}
                  >
                    <option value="WA Account 1">WA Account 1 (Number A)</option>
                    <option value="WA Account 2">WA Account 2 (Number B)</option>
                    <option value="WA Account 3">WA Account 3 (Number C)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><FiCalendar /> Next Follow-up Date (Optional)</label>
                  <input 
                    type="date" 
                    value={newLeadData.nextFollowupDate}
                    onChange={e => setNewLeadData({...newLeadData, nextFollowupDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label><FiMessageSquare /> Initial Notes</label>
                <textarea 
                  rows="2" 
                  placeholder="Details about outreach message or customer conditions..."
                  value={newLeadData.notes}
                  onChange={e => setNewLeadData({...newLeadData, notes: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Add Lead & Log Outreach
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: LOG ACTIVITY MODAL --- */}
      {showLogActivityModal && activeLead && (
        <div className="modal-overlay" onClick={() => setShowLogActivityModal(false)}>
          <div className="modal-card glass" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                Log Action: {
                  activityType === 'cold_followup' ? 'Cold Follow-up' :
                  activityType === 'warm_followup' ? 'Warm Follow-up' :
                  activityType === 'response_received' ? 'Response Received' :
                  activityType === 'deal_closed' ? 'Close Deal' : 'Mark Failed'
                }
              </h3>
              <button className="btn-close" onClick={() => setShowLogActivityModal(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleLogActivity} className="premium-form modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label><FiCalendar /> Action Date</label>
                  <input 
                    type="date" 
                    value={activityData.activityDate}
                    onChange={e => setActivityData({...activityData, activityDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FiUsers /> WA Account Used</label>
                  <select 
                    value={activityData.waAccountUsed}
                    onChange={e => setActivityData({...activityData, waAccountUsed: e.target.value})}
                  >
                    <option value="WA Account 1">WA Account 1 (Number A)</option>
                    <option value="WA Account 2">WA Account 2 (Number B)</option>
                    <option value="WA Account 3">WA Account 3 (Number C)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic activity-specific fields */}
              {['cold_followup', 'warm_followup'].includes(activityType) && (
                <div className="form-group">
                  <label><FiClock /> Scheduled Next Follow-up Date *</label>
                  <input 
                    type="date" 
                    value={activityData.nextFollowupDate}
                    onChange={e => setActivityData({...activityData, nextFollowupDate: e.target.value})}
                    required
                  />
                </div>
              )}

              {activityType === 'deal_closed' && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Deal Package Closed *</label>
                    <select 
                      value={activityData.dealPackage}
                      onChange={e => setActivityData({...activityData, dealPackage: e.target.value})}
                      required
                    >
                      {PACKAGES.map(pkg => (
                        <option key={pkg} value={pkg}>{pkg}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Deal Transaction Value (IDR) *</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 1500000" 
                      value={activityData.dealValue}
                      onChange={e => setActivityData({...activityData, dealValue: e.target.value})}
                      required
                    />
                  </div>
                </div>
              )}

              {activityType === 'marked_failed' && (
                <div className="form-group">
                  <label>Primary Rejection/Failure Reason *</label>
                  <select 
                    value={activityData.failureReason}
                    onChange={e => setActivityData({...activityData, failureReason: e.target.value})}
                    required
                  >
                    {FAILURE_REASONS.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label><FiMessageSquare /> Activity Notes / Details *</label>
                <textarea 
                  rows="3" 
                  placeholder={
                    activityType === 'deal_closed' ? 'Detail notes on deal closing package or customization...' :
                    activityType === 'marked_failed' ? 'Explain details about their refusal...' :
                    'Detail of response, conversation notes, or follow-up status...'
                  }
                  value={activityData.notes}
                  onChange={e => setActivityData({...activityData, notes: e.target.value})}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                <FiCheck /> Log Action & Update Status
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsTracker;
