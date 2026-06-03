import { useState, useEffect } from 'react';
import { 
  FiPlus, FiTrash2, FiCalendar, FiMapPin, FiBriefcase, FiMessageSquare, 
  FiTrendingUp, FiUsers, FiActivity, FiTarget, FiCheckCircle, FiSearch, 
  FiPhone, FiClock, FiX, FiCheck, FiInfo, FiTag, FiAlertTriangle, FiPlusCircle,
  FiFileText, FiList
} from 'react-icons/fi';
import { 
  getLeads as getDailySummaries, 
  addLead as addDailySummary, 
  deleteLead as deleteDailySummary 
} from '../../services/leadService';
import { 
  getLeads as getCrmLeads, 
  addLead as addCrmLead, 
  updateLead as updateCrmLead, 
  deleteLead as deleteCrmLead 
} from '../../services/crmService';
import './LeadsTracker.css';

const STATUS_CONFIG = {
  ALL: { label: 'All CRM Leads', color: 'rgba(255, 255, 255, 0.4)' },
  responded: { label: 'Responded', color: '#9b59b6' },
  responded_followup: { label: 'Warm Follow-up', color: '#e67e22' },
  unresponded_followup: { label: 'Cold Follow-up', color: '#7f8c8d' },
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
  // Tabs: 'profiles' for CRM records, 'summaries' for daily logs
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('profiles');
  
  // CRM profiles state
  const [crmLeads, setCrmLeads] = useState([]);
  const [isLoadingCrm, setIsLoadingCrm] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusTab, setSelectedStatusTab] = useState('ALL');
  const [activeLead, setActiveLead] = useState(null); // Selected lead for drawer
  
  // Daily Summaries state
  const [dailySummaries, setDailySummaries] = useState([]);
  const [isLoadingSummaries, setIsLoadingSummaries] = useState(true);

  // Modals state
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showLogActivityModal, setShowLogActivityModal] = useState(false);
  const [activityType, setActivityType] = useState(''); // Type of progress logging

  // New Customer Profile Form State (CRM)
  const [newLeadData, setNewLeadData] = useState({
    customerName: '',
    businessName: '',
    phoneNumber: '',
    category: '',
    area: 'Jakarta Barat',
    customArea: '',
    status: 'responded', // defaults to responded
    leadSource: 'Google Maps Search',
    dealValue: '',
    dealPackage: PACKAGES[0],
    failureReason: FAILURE_REASONS[0],
    notes: '',
    nextFollowupDate: ''
  });

  // New Daily Summary Form State
  const [newSummaryData, setNewSummaryData] = useState({
    reportDate: new Date().toISOString().split('T')[0],
    region: 'Jakarta Barat',
    businessField: '',
    waAccountsActive: 2,
    contactCount: '',
    followedUpCount: '',
    respondedFollowupCount: '',
    respondedCount: '',
    dealCount: '',
    failedCount: '',
    notes: '',
    nextPlan: ''
  });

  // Progress update form state
  const [activityData, setActivityData] = useState({
    activityDate: new Date().toISOString().split('T')[0],
    notes: '',
    dealValue: '',
    dealPackage: PACKAGES[0],
    failureReason: FAILURE_REASONS[0],
    nextFollowupDate: ''
  });

  useEffect(() => {
    fetchCrmLeadsData();
    fetchDailySummariesData();
  }, []);

  const fetchCrmLeadsData = async () => {
    setIsLoadingCrm(true);
    try {
      const data = await getCrmLeads();
      setCrmLeads(data);
    } catch (err) {
      console.error('Error fetching CRM leads:', err);
    } finally {
      setIsLoadingCrm(false);
    }
  };

  const fetchDailySummariesData = async () => {
    setIsLoadingSummaries(true);
    try {
      const data = await getDailySummaries();
      setDailySummaries(data);
    } catch (err) {
      console.error('Error fetching daily summaries:', err);
    } finally {
      setIsLoadingSummaries(false);
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      const finalArea = newLeadData.area === 'Luar Jabodetabek' ? newLeadData.customArea : newLeadData.area;
      const payload = {
        customerName: newLeadData.customerName,
        businessName: newLeadData.businessName,
        phoneNumber: newLeadData.phoneNumber,
        category: newLeadData.category,
        area: finalArea,
        status: newLeadData.status,
        leadSource: newLeadData.leadSource,
        dealValue: newLeadData.status === 'deal' ? parseFloat(newLeadData.dealValue) || 0 : 0,
        dealPackage: newLeadData.status === 'deal' ? newLeadData.dealPackage : null,
        failureReason: newLeadData.status === 'failed' ? newLeadData.failureReason : null,
        notes: newLeadData.notes,
        nextFollowupDate: newLeadData.nextFollowupDate || null
      };

      await addCrmLead(payload);
      setShowAddLeadModal(false);
      
      // Reset form
      setNewLeadData({
        customerName: '',
        businessName: '',
        phoneNumber: '',
        category: '',
        area: 'Jakarta Barat',
        customArea: '',
        status: 'responded',
        leadSource: 'Google Maps Search',
        dealValue: '',
        dealPackage: PACKAGES[0],
        failureReason: FAILURE_REASONS[0],
        notes: '',
        nextFollowupDate: ''
      });
      
      fetchCrmLeadsData();
    } catch (err) {
      alert('Error creating CRM lead: ' + err.message);
    }
  };

  const handleCreateSummary = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        reportDate: newSummaryData.reportDate,
        region: newSummaryData.region,
        businessField: newSummaryData.businessField,
        waAccountsActive: parseInt(newSummaryData.waAccountsActive) || 2,
        contactCount: parseInt(newSummaryData.contactCount) || 0,
        followedUpCount: parseInt(newSummaryData.followedUpCount) || 0,
        respondedFollowupCount: parseInt(newSummaryData.respondedFollowupCount) || 0,
        respondedCount: parseInt(newSummaryData.respondedCount) || 0,
        dealCount: parseInt(newSummaryData.dealCount) || 0,
        failedCount: parseInt(newSummaryData.failedCount) || 0,
        notes: newSummaryData.notes,
        nextPlan: newSummaryData.nextPlan
      };

      await addDailySummary(payload);
      setShowSummaryModal(false);
      
      // Reset form
      setNewSummaryData({
        reportDate: new Date().toISOString().split('T')[0],
        region: 'Jakarta Barat',
        businessField: '',
        waAccountsActive: 2,
        contactCount: '',
        followedUpCount: '',
        respondedFollowupCount: '',
        respondedCount: '',
        dealCount: '',
        failedCount: '',
        notes: '',
        nextPlan: ''
      });
      
      fetchDailySummariesData();
    } catch (err) {
      alert('Error saving daily summary: ' + err.message);
    }
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    if (!activeLead) return;

    try {
      let nextStatus = activeLead.status;
      if (activityType === 'cold_followup') {
        nextStatus = 'unresponded_followup';
      } else if (activityType === 'warm_followup') {
        nextStatus = 'responded_followup';
      } else if (activityType === 'response_received') {
        nextStatus = 'responded';
      } else if (activityType === 'deal_closed') {
        nextStatus = 'deal';
      } else if (activityType === 'marked_failed') {
        nextStatus = 'failed';
      }

      const notesHeader = `[${activityData.activityDate} - Status changed to: ${STATUS_CONFIG[nextStatus]?.label}]`;
      const appendedNotes = activityData.notes 
        ? `${activeLead.notes ? activeLead.notes + '\n\n' : ''}${notesHeader}\n${activityData.notes}` 
        : activeLead.notes;

      const payload = {
        customerName: activeLead.customer_name,
        businessName: activeLead.business_name,
        phoneNumber: activeLead.phone_number,
        category: activeLead.category,
        area: activeLead.area,
        status: nextStatus,
        leadSource: activeLead.lead_source,
        dealValue: nextStatus === 'deal' ? parseFloat(activityData.dealValue) || 0 : activeLead.deal_value,
        dealPackage: nextStatus === 'deal' ? activityData.dealPackage : activeLead.deal_package,
        failureReason: nextStatus === 'failed' ? activityData.failureReason : activeLead.failure_reason,
        notes: appendedNotes,
        nextFollowupDate: ['cold_followup', 'warm_followup'].includes(activityType) ? activityData.nextFollowupDate : activeLead.next_followup_date
      };

      await updateCrmLead(activeLead.id, payload);
      setShowLogActivityModal(false);
      
      // Refresh leads list and active lead detail drawer
      const data = await getCrmLeads();
      setCrmLeads(data);
      const updatedActive = data.find(l => l.id === activeLead.id);
      setActiveLead(updatedActive);

      // Reset progress form
      setActivityData({
        activityDate: new Date().toISOString().split('T')[0],
        notes: '',
        dealValue: '',
        dealPackage: PACKAGES[0],
        failureReason: FAILURE_REASONS[0],
        nextFollowupDate: ''
      });
    } catch (err) {
      alert('Error updating customer status: ' + err.message);
    }
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this customer profile?')) {
      try {
        await deleteCrmLead(id);
        setActiveLead(null);
        fetchCrmLeadsData();
      } catch (err) {
        alert('Error deleting lead profile: ' + err.message);
      }
    }
  };

  const handleDeleteSummary = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this daily summary log?')) {
      try {
        await deleteDailySummary(id);
        fetchDailySummariesData();
      } catch (err) {
        alert('Error deleting daily summary: ' + err.message);
      }
    }
  };

  // Filter individual leads list
  const filteredLeads = crmLeads.filter(lead => {
    const matchTab = selectedStatusTab === 'ALL' || lead.status === selectedStatusTab;
    const matchSearch = searchQuery === '' || 
      (lead.customer_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.business_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.phone_number?.includes(searchQuery)) ||
      (lead.category?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.area?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchTab && matchSearch;
  });

  // Calculate leads due for Follow-Up today or past due
  const todayStr = new Date().toISOString().split('T')[0];
  const followUpDueLeads = crmLeads.filter(lead => {
    if (!lead.next_followup_date) return false;
    if (['deal', 'failed'].includes(lead.status)) return false;
    return lead.next_followup_date <= todayStr;
  });

  return (
    <div className="admin-container">
      {/* Header bar with actions */}
      <div className="crm-header-bar">
        <div className="admin-header">
          <h1>Hybrid Lead Tracker & CRM</h1>
          <p>Log daily summary metrics and record detailed customer conversation profiles in one dashboard</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={() => setShowSummaryModal(true)}>
            <FiFileText /> Log Daily Summary
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddLeadModal(true)}>
            <FiPlusCircle /> Log Customer Profile
          </button>
        </div>
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
              <div key={lead.id} className="due-lead-card glass" onClick={() => { setActiveLead(lead); setActiveWorkspaceTab('profiles'); }}>
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
                  <button className="btn-tiny">Open Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Workspace Tab Selector */}
      <div className="crm-workspace-tabs">
        <button 
          className={`workspace-tab ${activeWorkspaceTab === 'profiles' ? 'active' : ''}`}
          onClick={() => { setActiveWorkspaceTab('profiles'); setActiveLead(null); }}
        >
          <FiUsers /> Customer CRM Profiles ({crmLeads.length})
        </button>
        <button 
          className={`workspace-tab ${activeWorkspaceTab === 'summaries' ? 'active' : ''}`}
          onClick={() => { setActiveWorkspaceTab('summaries'); setActiveLead(null); }}
        >
          <FiList /> Daily Summary Reports ({dailySummaries.length})
        </button>
      </div>

      {/* Main CRM / Summaries Workspace */}
      <div className="crm-workspace">
        {/* Main Workspace Left card */}
        <div className="crm-main-card glass">
          
          {/* TAB 1: CRM LEAD PROFILES */}
          {activeWorkspaceTab === 'profiles' && (
            <>
              <div className="crm-table-controls">
                {/* Search */}
                <div className="crm-search-wrapper">
                  <FiSearch className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search customer profiles by name, business, phone, area..." 
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
                      ? crmLeads.length 
                      : crmLeads.filter(l => l.status === statusKey).length;

                    return (
                      <button 
                        key={statusKey} 
                        className={`crm-tab ${selectedStatusTab === statusKey ? 'active' : ''}`}
                        onClick={() => setSelectedStatusTab(statusKey)}
                      >
                        {STATUS_CONFIG[statusKey].label}
                        <span className="tab-count">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {isLoadingCrm ? (
                <div className="empty-placeholder">Loading CRM leads...</div>
              ) : filteredLeads.length === 0 ? (
                <div className="empty-placeholder">
                  <FiInfo size={24} style={{ marginBottom: '0.5rem', color: 'var(--primary)' }} />
                  No customer profiles found. Log a profile when a customer responds, failure happens or deal closes.
                </div>
              ) : (
                <div className="reports-table-container">
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>Lead Info</th>
                        <th>Category & Region</th>
                        <th>Source</th>
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
                              title="Delete Profile"
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
            </>
          )}

          {/* TAB 2: DAILY SUMMARIES HISTORY */}
          {activeWorkspaceTab === 'summaries' && (
            <>
              {isLoadingSummaries ? (
                <div className="empty-placeholder">Loading daily logs...</div>
              ) : dailySummaries.length === 0 ? (
                <div className="empty-placeholder">
                  <FiInfo size={24} style={{ marginBottom: '0.5rem', color: 'var(--primary)' }} />
                  No daily summaries logged yet. Keep track of daily performance by hitting "Log Daily Summary".
                </div>
              ) : (
                <div className="reports-table-container">
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Category & Region</th>
                        <th>Outreach Stats</th>
                        <th>Conversion Outcomes</th>
                        <th>Active WA</th>
                        <th>Notes & Plan</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailySummaries.map(summary => (
                        <tr key={summary.id}>
                          <td>
                            <strong>{new Date(summary.report_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</strong>
                          </td>
                          <td>
                            <div className="lead-meta-cell">
                              <span className="meta-category"><FiBriefcase /> {summary.business_field}</span>
                              <span className="meta-region"><FiMapPin /> {summary.region}</span>
                            </div>
                          </td>
                          <td>
                            <div className="lead-name-cell">
                              <strong>New Contacts: {summary.contact_count}</strong>
                              <span>Cold F/U: {summary.followed_up_count}</span>
                              <span>Warm F/U: {summary.responded_followup_count}</span>
                            </div>
                          </td>
                          <td>
                            <div className="lead-meta-cell">
                              <span style={{ color: '#9b59b6', fontWeight: 600 }}>Responses: {summary.responded_count}</span>
                              <span style={{ color: '#2ecc71', fontWeight: 600 }}>Deals: {summary.deal_count}</span>
                              <span style={{ color: '#e74c3c', fontWeight: 600 }}>Failed: {summary.failed_count}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge-source"><FiUsers /> {summary.wa_accounts_active} Accounts</span>
                          </td>
                          <td>
                            <div className="lead-name-cell" style={{ maxWidth: '250px' }}>
                              {summary.notes && <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={summary.notes}><strong>Notes:</strong> {summary.notes}</span>}
                              {summary.next_plan && <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={summary.next_plan}><strong>Plan:</strong> {summary.next_plan}</span>}
                            </div>
                          </td>
                          <td>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSummary(summary.id);
                              }} 
                              className="btn-icon-delete"
                              title="Delete Log"
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
            </>
          )}
        </div>

        {/* Lead Profile Detail Drawer (Right side) - CRM Tab only */}
        {activeWorkspaceTab === 'profiles' && activeLead && (
          <div className="crm-details-drawer glass animate-slide-in">
            <div className="drawer-header">
              <h3>Lead Profile Details</h3>
              <button className="btn-close" onClick={() => setActiveLead(null)}><FiX /></button>
            </div>

            <div className="drawer-content">
              {/* Lead identity card */}
              <div className="profile-hero-card">
                <h4>{activeLead.business_name || 'No Business Name'}</h4>
                <p className="subtitle">{activeLead.customer_name || 'Unnamed Contact'}</p>
                <div className="profile-status-badge" style={{ backgroundColor: STATUS_CONFIG[activeLead.status]?.color + '20', color: STATUS_CONFIG[activeLead.status]?.color }}>
                  {STATUS_CONFIG[activeLead.status]?.label}
                </div>
              </div>

              {/* Main Actions Panel */}
              <div className="profile-actions-panel">
                <h5>Update Customer Status</h5>
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
                        <FiClock /> Log Cold F/U
                      </button>
                      <button 
                        className="btn-action responded" 
                        onClick={() => {
                          setActivityType('response_received');
                          setShowLogActivityModal(true);
                        }}
                      >
                        <FiActivity /> Log Response
                      </button>
                      <button 
                        className="btn-action warm" 
                        onClick={() => {
                          setActivityType('warm_followup');
                          setShowLogActivityModal(true);
                        }}
                      >
                        <FiTrendingUp /> Log Warm F/U
                      </button>
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
                      <FiAlertTriangle /> Mark Failed
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
                    <span className="label"><FiMessageSquare /> Conversation History</span>
                    <p className="value-notes" style={{ whiteSpace: 'pre-wrap' }}>{activeLead.notes}</p>
                  </div>
                )}
              </div>

              {/* Delete button inside drawer */}
              <div className="profile-danger-zone">
                <button onClick={() => handleDeleteLead(activeLead.id)} className="btn btn-danger btn-full">
                  <FiTrash2 /> Delete Customer Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL 1: ADD NEW CUSTOMER CRM PROFILE --- */}
      {showAddLeadModal && (
        <div className="modal-overlay" onClick={() => setShowAddLeadModal(false)}>
          <div className="modal-card glass" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FiPlusCircle /> Log Key Lead Profile</h3>
              <button className="btn-close" onClick={() => setShowAddLeadModal(false)}><FiX /></button>
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
                  <label>Contact Person Name</label>
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
                  <label><FiActivity /> Current Status *</label>
                  <select 
                    value={newLeadData.status}
                    onChange={e => setNewLeadData({...newLeadData, status: e.target.value})}
                    required
                  >
                    <option value="responded">Responded (Unqualified Follow-up)</option>
                    <option value="responded_followup">Responded (Warm Follow-up)</option>
                    <option value="unresponded_followup">Unresponded (Cold Follow-up)</option>
                    <option value="deal">Deal Closed (Closed Won)</option>
                    <option value="failed">Failed / Rejected (Closed Lost)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><FiCalendar /> Scheduled Follow-up (Optional)</label>
                  <input 
                    type="date" 
                    value={newLeadData.nextFollowupDate}
                    onChange={e => setNewLeadData({...newLeadData, nextFollowupDate: e.target.value})}
                  />
                </div>
              </div>

              {/* Conditional deal input */}
              {newLeadData.status === 'deal' && (
                <div className="form-row animate-reveal">
                  <div className="form-group">
                    <label>Deal Package *</label>
                    <select 
                      value={newLeadData.dealPackage}
                      onChange={e => setNewLeadData({...newLeadData, dealPackage: e.target.value})}
                      required
                    >
                      {PACKAGES.map(pkg => (
                        <option key={pkg} value={pkg}>{pkg}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Deal Value (IDR) *</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 1500000" 
                      value={newLeadData.dealValue}
                      onChange={e => setNewLeadData({...newLeadData, dealValue: e.target.value})}
                      required 
                    />
                  </div>
                </div>
              )}

              {/* Conditional failure input */}
              {newLeadData.status === 'failed' && (
                <div className="form-group animate-reveal">
                  <label>Failure Reason *</label>
                  <select 
                    value={newLeadData.failureReason}
                    onChange={e => setNewLeadData({...newLeadData, failureReason: e.target.value})}
                    required
                  >
                    {FAILURE_REASONS.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label><FiMessageSquare /> Profile & Conversation Notes</label>
                <textarea 
                  rows="3" 
                  placeholder="Notes about their specific needs, objections, package details..."
                  value={newLeadData.notes}
                  onChange={e => setNewLeadData({...newLeadData, notes: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Log Customer Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: LOG DAILY AGGREGATE SUMMARY --- */}
      {showSummaryModal && (
        <div className="modal-overlay" onClick={() => setShowSummaryModal(false)}>
          <div className="modal-card glass" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FiFileText /> Log Daily Summary Metrics</h3>
              <button className="btn-close" onClick={() => setShowSummaryModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateSummary} className="premium-form modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Report Date *</label>
                  <input 
                    type="date" 
                    value={newSummaryData.reportDate}
                    onChange={e => setNewSummaryData({...newSummaryData, reportDate: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Active WA Accounts Active *</label>
                  <input 
                    type="number" 
                    value={newSummaryData.waAccountsActive}
                    onChange={e => setNewSummaryData({...newSummaryData, waAccountsActive: e.target.value})}
                    placeholder="e.g. 2"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FiMapPin /> Region *</label>
                  <select 
                    value={newSummaryData.region}
                    onChange={e => setNewSummaryData({...newSummaryData, region: e.target.value})}
                    required
                  >
                    {REGIONS.map(reg => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label><FiBriefcase /> Business Category (General Field) *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dental Clinics, Barbershops" 
                    value={newSummaryData.businessField}
                    onChange={e => setNewSummaryData({...newSummaryData, businessField: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Outreach Contact Count (New Contacts today) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 40" 
                    value={newSummaryData.contactCount}
                    onChange={e => setNewSummaryData({...newSummaryData, contactCount: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Cold Follow-ups (unresponded contacts pinged) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 10" 
                    value={newSummaryData.followedUpCount}
                    onChange={e => setNewSummaryData({...newSummaryData, followedUpCount: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Warm Follow-ups (responded contacts pinged) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5" 
                    value={newSummaryData.respondedFollowupCount}
                    onChange={e => setNewSummaryData({...newSummaryData, respondedFollowupCount: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Responses Received (total responses today) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 2" 
                    value={newSummaryData.respondedCount}
                    onChange={e => setNewSummaryData({...newSummaryData, respondedCount: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Deals Closed Today *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 1" 
                    value={newSummaryData.dealCount}
                    onChange={e => setNewSummaryData({...newSummaryData, dealCount: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Failed / Rejected Count Today *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 1" 
                    value={newSummaryData.failedCount}
                    onChange={e => setNewSummaryData({...newSummaryData, failedCount: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label><FiMessageSquare /> Notes / Obstacles Today</label>
                <textarea 
                  rows="2" 
                  placeholder="Obstacles, WA account bans, general remarks..."
                  value={newSummaryData.notes}
                  onChange={e => setNewSummaryData({...newSummaryData, notes: e.target.value})}
                ></textarea>
              </div>

              <div className="form-group">
                <label><FiTarget /> Next Plan / Action Steps</label>
                <textarea 
                  rows="2" 
                  placeholder="Plans for tomorrow, follow-up regions..."
                  value={newSummaryData.nextPlan}
                  onChange={e => setNewSummaryData({...newSummaryData, nextPlan: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Log Daily Summary
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: LOG STATUS CHANGE / PROGRESS ON AN INDIVIDUAL LEAD --- */}
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
              </div>

              {activityType === 'deal_closed' && (
                <div className="form-row animate-reveal">
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
                <div className="form-group animate-reveal">
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
                <FiCheck /> Update Customer Progress
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsTracker;
