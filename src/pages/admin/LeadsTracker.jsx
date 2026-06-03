import { useState, useEffect } from 'react';
import { 
  FiPlus, FiTrash2, FiCalendar, FiMapPin, FiBriefcase, FiMessageSquare, 
  FiTrendingUp, FiUsers, FiActivity, FiTarget, FiCheckCircle, FiSearch, 
  FiPhone, FiClock, FiX, FiCheck, FiInfo, FiTag, FiAlertTriangle, FiPlusCircle,
  FiFileText, FiList
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
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

const trackerTranslations = {
  id: {
    title: 'Pelacak Lead & CRM Hibrida',
    subtitle: 'Catat metrik ringkasan harian dan detail profil percakapan pelanggan dalam satu dasbor',
    btnDailySummary: 'Catat Ringkasan Harian',
    btnCustomerProfile: 'Catat Profil Pelanggan',
    followupDueTitle: 'Tugas Follow-Up Hari Ini',
    followupDueSubtitle: 'Lead ini telah mencapai jadwal follow-up. Hubungi mereka di WhatsApp!',
    dueBadge: 'Batas:',
    openProfile: 'Buka Profil',
    tabCrmProfiles: 'Profil CRM Pelanggan',
    tabDailySummaries: 'Laporan Ringkasan Harian',
    searchPlaceholder: 'Cari profil pelanggan berdasarkan nama, bisnis, telepon, wilayah...',
    noCrmLeads: 'Belum ada profil pelanggan. Catat profil baru saat pelanggan merespons, gagal, atau deal.',
    noDailySummaries: 'Belum ada ringkasan harian yang dicatat. Mulai catat kinerja harian dengan tombol di atas.',
    colLeadInfo: 'Informasi Lead',
    colCategoryRegion: 'Kategori & Wilayah',
    colSource: 'Sumber',
    colStatus: 'Status',
    colNextAction: 'Tindakan Selanjutnya',
    colActions: 'Aksi',
    colDate: 'Tanggal',
    colOutreachStats: 'Statistik Jangkauan',
    colOutreachResults: 'Hasil Konversi',
    colActiveWa: 'WA Aktif',
    colNotesPlan: 'Catatan & Rencana',
    confirmDeleteProfile: 'Apakah Anda yakin ingin menghapus profil pelanggan ini secara permanen?',
    confirmDeleteSummary: 'Apakah Anda yakin ingin menghapus laporan ringkasan harian ini secara permanen?',
    // drawer
    drawerTitle: 'Detail Profil Lead',
    drawerLogProgress: 'Update Status Pelanggan',
    drawerLogCold: 'Catat Cold F/U',
    drawerLogWarm: 'Catat Warm F/U',
    drawerLogResponse: 'Catat Respons',
    drawerCloseDeal: 'Deal Closed',
    drawerMarkFailed: 'Tandai Gagal',
    drawerMetadata: 'Metadata Lead',
    drawerPhone: 'Nomor WhatsApp',
    drawerCategory: 'Kategori',
    drawerRegion: 'Wilayah/Area',
    drawerSource: 'Sumber Lead',
    drawerDealPkg: 'Paket Deal',
    drawerDealVal: 'Nilai Transaksi',
    drawerReason: 'Alasan Gagal',
    drawerHistory: 'Riwayat Percakapan',
    drawerDeleteBtn: 'Hapus Profil Pelanggan',
    // Summary Modal
    sumModalTitle: 'Catat Metrik Ringkasan Harian',
    sumDate: 'Tanggal Laporan *',
    sumActiveWa: 'Jumlah Akun WA Aktif *',
    sumRegionCountry: 'Negara *',
    sumRegionCity: 'Kota / Wilayah',
    sumCategory: 'Kategori Bisnis (Bidang Umum) *',
    sumOutreachCount: 'Total Kontak Baru Hari Ini *',
    sumColdFuCount: 'Cold Follow-up (Kontak tak merespons yang di-ping) *',
    sumWarmFuCount: 'Warm Follow-up (Kontak merespon yang di-ping) *',
    sumResponseCount: 'Respons Diterima (Total respons baru hari ini) *',
    sumDealsCount: 'Deal Closed Hari Ini *',
    sumFailedCount: 'Jumlah Lead Gagal/Menolak Hari Ini *',
    sumNotes: 'Catatan & Kendala Hari Ini',
    sumPlan: 'Rencana Berikutnya / Tindakan Besok',
    sumSubmit: 'Catat Ringkasan Harian',
    // Customer Modal
    custModalTitle: 'Log Profil Lead Utama',
    custBusinessName: 'Nama Bisnis *',
    custPersonName: 'Nama Kontak Person',
    custPhone: 'Nomor WhatsApp *',
    custCategory: 'Kategori (Bidang Bisnis) *',
    custRegionCountry: 'Negara *',
    custRegionCity: 'Kota / Wilayah',
    custSource: 'Sumber Lead *',
    custStatus: 'Status Saat Ini *',
    custFollowupDate: 'Jadwal Follow-up Selanjutnya (Opsional)',
    custDealPkg: 'Paket Deal *',
    custDealVal: 'Nilai Transaksi (IDR) *',
    custFailReason: 'Alasan Kegagalan Utama *',
    custNotes: 'Catatan Profil & Percakapan',
    custSubmit: 'Simpan Profil Pelanggan',
    // Progress modal
    progModalTitle: 'Catat Aksi',
    progDate: 'Tanggal Aksi',
    progNextDate: 'Jadwal Follow-up Selanjutnya *',
    progNotes: 'Catatan Aksi / Detail Percakapan *',
    progSubmit: 'Update Progres Pelanggan'
  },
  en: {
    title: 'Hybrid Lead Tracker & CRM',
    subtitle: 'Log daily summary metrics and record detailed customer conversation profiles in one dashboard',
    btnDailySummary: 'Log Daily Summary',
    btnCustomerProfile: 'Log Customer Profile',
    followupDueTitle: 'Follow-Up Tasks Due Today',
    followupDueSubtitle: 'These leads reached their scheduled follow-up interval. Ping them on WhatsApp!',
    dueBadge: 'Due:',
    openProfile: 'Open Profile',
    tabCrmProfiles: 'Customer CRM Profiles',
    tabDailySummaries: 'Daily Summary Reports',
    searchPlaceholder: 'Search customer profiles by name, business, phone, area...',
    noCrmLeads: 'No customer profiles found. Log a profile when a customer responds, failure happens or deal closes.',
    noDailySummaries: 'No daily summaries logged yet. Keep track of daily performance by hitting "Log Daily Summary".',
    colLeadInfo: 'Lead Info',
    colCategoryRegion: 'Category & Region',
    colSource: 'Source',
    colStatus: 'Status',
    colNextAction: 'Next Action',
    colActions: 'Actions',
    colDate: 'Date',
    colOutreachStats: 'Outreach Stats',
    colOutreachResults: 'Conversion Outcomes',
    colActiveWa: 'Active WA',
    colNotesPlan: 'Notes & Plan',
    confirmDeleteProfile: 'Are you sure you want to permanently delete this customer profile?',
    confirmDeleteSummary: 'Are you sure you want to permanently delete this daily summary log?',
    // drawer
    drawerTitle: 'Lead Profile Details',
    drawerLogProgress: 'Update Customer Status',
    drawerLogCold: 'Log Cold F/U',
    drawerLogWarm: 'Log Warm F/U',
    drawerLogResponse: 'Log Response',
    drawerCloseDeal: 'Close Deal',
    drawerMarkFailed: 'Mark Failed',
    drawerMetadata: 'Lead Metadata',
    drawerPhone: 'Phone Number',
    drawerCategory: 'Category',
    drawerRegion: 'Region/Area',
    drawerSource: 'Lead Source',
    drawerDealPkg: 'Deal Package',
    drawerDealVal: 'Deal Value',
    drawerReason: 'Rejection Reason',
    drawerHistory: 'Conversation History',
    drawerDeleteBtn: 'Delete Customer Profile',
    // Summary Modal
    sumModalTitle: 'Log Daily Summary Metrics',
    sumDate: 'Report Date *',
    sumActiveWa: 'Active WA Accounts Active *',
    sumRegionCountry: 'Country *',
    sumRegionCity: 'City / Area',
    sumCategory: 'Business Category (General Field) *',
    sumOutreachCount: 'Outreach Contact Count (New Contacts today) *',
    sumColdFuCount: 'Cold Follow-ups (unresponded contacts pinged) *',
    sumWarmFuCount: 'Warm Follow-ups (responded contacts pinged) *',
    sumResponseCount: 'Responses Received (total responses today) *',
    sumDealsCount: 'Deals Closed Today *',
    sumFailedCount: 'Failed / Rejected Count Today *',
    sumNotes: 'Notes / Obstacles Today',
    sumPlan: 'Next Plan / Action Steps',
    sumSubmit: 'Log Daily Summary',
    // Customer Modal
    custModalTitle: 'Log Key Lead Profile',
    custBusinessName: 'Business Name *',
    custPersonName: 'Contact Person Name',
    custPhone: 'WhatsApp Phone Number *',
    custCategory: 'Category (Business Field) *',
    custRegionCountry: 'Country *',
    custRegionCity: 'City / Area',
    custSource: 'Lead Source *',
    custStatus: 'Current Status *',
    custFollowupDate: 'Scheduled Follow-up (Optional)',
    custDealPkg: 'Deal Package *',
    custDealVal: 'Deal Value (IDR) *',
    custFailReason: 'Primary Rejection/Failure Reason *',
    custNotes: 'Profile & Conversation Notes',
    custSubmit: 'Log Customer Profile',
    // Progress modal
    progModalTitle: 'Log Action',
    progDate: 'Action Date',
    progNextDate: 'Scheduled Next Follow-up Date *',
    progNotes: 'Activity Notes / Details *',
    progSubmit: 'Update Customer Progress'
  }
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

const LeadsTracker = () => {
  const { language } = useLanguage();
  const t = trackerTranslations[language] || trackerTranslations.id;

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

  // Dynamic Countries state from REST Countries API
  const [countries, setCountries] = useState(['Indonesia', 'Singapore', 'Malaysia', 'Australia', 'United States']);

  // Modals state
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showLogActivityModal, setShowLogActivityModal] = useState(false);
  const [activityType, setActivityType] = useState(''); // Type of progress logging

  // Form states: Country and City inputs for both modals
  const [custCountry, setCustCountry] = useState('Indonesia');
  const [custCity, setCustCity] = useState('');
  const [sumCountry, setSumCountry] = useState('Indonesia');
  const [sumCity, setSumCity] = useState('');

  // New Customer Profile Form State (CRM)
  const [newLeadData, setNewLeadData] = useState({
    customerName: '',
    businessName: '',
    phoneNumber: '',
    category: '',
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

  const STATUS_CONFIG = {
    ALL: { label: t.tabCrmProfiles, color: 'rgba(255, 255, 255, 0.4)' },
    responded: { label: language === 'id' ? 'Merespon' : 'Responded', color: '#9b59b6' },
    responded_followup: { label: language === 'id' ? 'Follow-up Hangat' : 'Warm Follow-up', color: '#e67e22' },
    unresponded_followup: { label: language === 'id' ? 'Follow-up Dingin' : 'Cold Follow-up', color: '#7f8c8d' },
    deal: { label: language === 'id' ? 'Deal Ditutup' : 'Deals Closed', color: '#2ecc71' },
    failed: { label: language === 'id' ? 'Gagal/Menolak' : 'Failed/Rejected', color: '#e74c3c' }
  };

  useEffect(() => {
    fetchCrmLeadsData();
    fetchDailySummariesData();
    fetchCountriesData();
  }, []);

  const fetchCountriesData = async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all');
      if (!res.ok) throw new Error('REST countries API failed');
      const data = await res.json();
      const countryNames = data.map(c => c.name.common).sort();
      const sorted = ['Indonesia', ...countryNames.filter(name => name !== 'Indonesia')];
      setCountries(sorted);
    } catch (err) {
      console.error('REST Countries fetch failed. Using hardcoded fallback country list:', err);
    }
  };

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
      const finalArea = custCity ? `${custCountry} - ${custCity}` : custCountry;
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
        status: 'responded',
        leadSource: 'Google Maps Search',
        dealValue: '',
        dealPackage: PACKAGES[0],
        failureReason: FAILURE_REASONS[0],
        notes: '',
        nextFollowupDate: ''
      });
      setCustCountry('Indonesia');
      setCustCity('');
      
      fetchCrmLeadsData();
    } catch (err) {
      alert('Error creating CRM lead: ' + err.message);
    }
  };

  const handleCreateSummary = async (e) => {
    e.preventDefault();
    try {
      const finalRegion = sumCity ? `${sumCountry} - ${sumCity}` : sumCountry;
      const payload = {
        reportDate: newSummaryData.reportDate,
        region: finalRegion,
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
      setSumCountry('Indonesia');
      setSumCity('');
      
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
    if (window.confirm(t.confirmDeleteProfile)) {
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
    if (window.confirm(t.confirmDeleteSummary)) {
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
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={() => setShowSummaryModal(true)}>
            <FiFileText /> {t.btnDailySummary}
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddLeadModal(true)}>
            <FiPlusCircle /> {t.btnCustomerProfile}
          </button>
        </div>
      </div>

      {/* Due for Follow-up alerts widget */}
      {followUpDueLeads.length > 0 && (
        <div className="followup-alert-widget glass animate-reveal">
          <div className="widget-header">
            <h4>
              <FiClock className="icon-pulse" /> {t.followupDueTitle} ({followUpDueLeads.length})
            </h4>
            <span className="subtitle">{t.followupDueSubtitle}</span>
          </div>
          <div className="due-leads-grid">
            {followUpDueLeads.slice(0, 4).map(lead => (
              <div key={lead.id} className="due-lead-card glass" onClick={() => { setActiveLead(lead); setActiveWorkspaceTab('profiles'); }}>
                <div className="due-card-top">
                  <span className="due-badge" style={{ backgroundColor: STATUS_CONFIG[lead.status]?.color }}>
                    {STATUS_CONFIG[lead.status]?.label}
                  </span>
                  <span className="due-date">{t.dueBadge} {new Date(lead.next_followup_date).toLocaleDateString()}</span>
                </div>
                <h5>{lead.business_name || 'No Business Name'}</h5>
                <p>{lead.customer_name} ({lead.phone_number})</p>
                <div className="due-card-footer">
                  <span className="badge-region">{lead.area}</span>
                  <button className="btn-tiny">{t.openProfile}</button>
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
          <FiUsers /> {t.tabCrmProfiles} ({crmLeads.length})
        </button>
        <button 
          className={`workspace-tab ${activeWorkspaceTab === 'summaries' ? 'active' : ''}`}
          onClick={() => { setActiveWorkspaceTab('summaries'); setActiveLead(null); }}
        >
          <FiList /> {t.tabDailySummaries} ({dailySummaries.length})
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
                    placeholder={t.searchPlaceholder} 
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
                  {t.noCrmLeads}
                </div>
              ) : (
                <div className="reports-table-container">
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>{t.colLeadInfo}</th>
                        <th>{t.colCategoryRegion}</th>
                        <th>{t.colSource}</th>
                        <th>{t.colStatus}</th>
                        <th>{t.colNextAction}</th>
                        <th>{t.colActions}</th>
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
                  {t.noDailySummaries}
                </div>
              ) : (
                <div className="reports-table-container">
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>{t.colDate}</th>
                        <th>{t.colCategoryRegion}</th>
                        <th>{t.colOutreachStats}</th>
                        <th>{t.colOutreachResults}</th>
                        <th>{t.colActiveWa}</th>
                        <th>{t.colNotesPlan}</th>
                        <th>{t.colActions}</th>
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
              <h3>{t.drawerTitle}</h3>
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
                <h5>{t.drawerLogProgress}</h5>
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
                        <FiClock /> {t.drawerLogCold}
                      </button>
                      <button 
                        className="btn-action responded" 
                        onClick={() => {
                          setActivityType('response_received');
                          setShowLogActivityModal(true);
                        }}
                      >
                        <FiActivity /> {t.drawerLogResponse}
                      </button>
                      <button 
                        className="btn-action warm" 
                        onClick={() => {
                          setActivityType('warm_followup');
                          setShowLogActivityModal(true);
                        }}
                      >
                        <FiTrendingUp /> {t.drawerLogWarm}
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
                      <FiTarget /> {t.drawerCloseDeal}
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
                      <FiAlertTriangle /> {t.drawerMarkFailed}
                    </button>
                  )}
                </div>
              </div>

              {/* Detailed Lead parameters */}
              <div className="profile-details-list">
                <h5>{t.drawerMetadata}</h5>
                <div className="detail-item">
                  <span className="label"><FiPhone /> {t.drawerPhone}</span>
                  <span className="value">{activeLead.phone_number}</span>
                </div>
                <div className="detail-item">
                  <span className="label"><FiBriefcase /> {t.drawerCategory}</span>
                  <span className="value">{activeLead.category}</span>
                </div>
                <div className="detail-item">
                  <span className="label"><FiMapPin /> {t.drawerRegion}</span>
                  <span className="value">{activeLead.area}</span>
                </div>
                <div className="detail-item">
                  <span className="label"><FiTag /> {t.drawerSource}</span>
                  <span className="value">{activeLead.lead_source}</span>
                </div>
                {activeLead.status === 'deal' && (
                  <>
                    <div className="detail-item highlighted-deal">
                      <span className="label"><FiTarget /> {t.drawerDealPkg}</span>
                      <span className="value">{activeLead.deal_package || 'Not specified'}</span>
                    </div>
                    <div className="detail-item highlighted-deal">
                      <span className="label">💵 {t.drawerDealVal}</span>
                      <span className="value">
                        {activeLead.deal_value ? `IDR ${parseFloat(activeLead.deal_value).toLocaleString('id-ID')}` : 'IDR 0'}
                      </span>
                    </div>
                  </>
                )}
                {activeLead.status === 'failed' && (
                  <div className="detail-item highlighted-failed">
                    <span className="label"><FiAlertTriangle /> {t.drawerReason}</span>
                    <span className="value">{activeLead.failure_reason || 'Not specified'}</span>
                  </div>
                )}
                {activeLead.notes && (
                  <div className="detail-item-notes">
                    <span className="label"><FiMessageSquare /> {t.drawerHistory}</span>
                    <p className="value-notes" style={{ whiteSpace: 'pre-wrap' }}>{activeLead.notes}</p>
                  </div>
                )}
              </div>

              {/* Delete button inside drawer */}
              <div className="profile-danger-zone">
                <button onClick={() => handleDeleteLead(activeLead.id)} className="btn btn-danger btn-full">
                  <FiTrash2 /> {t.drawerDeleteBtn}
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
              <h3><FiPlusCircle /> {t.custModalTitle}</h3>
              <button className="btn-close" onClick={() => setShowAddLeadModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateLead} className="premium-form modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>{t.custBusinessName}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dental Clinic XYZ" 
                    value={newLeadData.businessName}
                    onChange={e => setNewLeadData({...newLeadData, businessName: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{t.custPersonName}</label>
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
                  <label><FiPhone /> {t.custPhone}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 08123456789" 
                    value={newLeadData.phoneNumber}
                    onChange={e => setNewLeadData({...newLeadData, phoneNumber: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label><FiBriefcase /> {t.custCategory}</label>
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
                  <label><FiMapPin /> {t.custRegionCountry}</label>
                  <select 
                    value={custCountry}
                    onChange={e => setCustCountry(e.target.value)}
                    required
                  >
                    {countries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label><FiMapPin /> {t.custRegionCity}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jakarta Barat, Selangor, Sydney"
                    value={custCity}
                    onChange={e => setCustCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FiTag /> {t.custSource}</label>
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
                <div className="form-group">
                  <label><FiActivity /> {t.custStatus}</label>
                  <select 
                    value={newLeadData.status}
                    onChange={e => setNewLeadData({...newLeadData, status: e.target.value})}
                    required
                  >
                    <option value="responded">{language === 'id' ? 'Merespon (Follow-up Belum Kualifikasi)' : 'Responded (Unqualified Follow-up)'}</option>
                    <option value="responded_followup">{language === 'id' ? 'Merespon (Follow-up Hangat)' : 'Responded (Warm Follow-up)'}</option>
                    <option value="unresponded_followup">{language === 'id' ? 'Tidak Merespon (Follow-up Dingin)' : 'Unresponded (Cold Follow-up)'}</option>
                    <option value="deal">{language === 'id' ? 'Deal Ditutup (Closed Won)' : 'Deal Closed (Closed Won)'}</option>
                    <option value="failed">{language === 'id' ? 'Gagal / Ditolak (Closed Lost)' : 'Failed / Rejected (Closed Lost)'}</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FiCalendar /> {t.custFollowupDate}</label>
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
                    <label>{t.custDealPkg}</label>
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
                    <label>{t.custDealVal}</label>
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
                  <label>{t.custFailReason}</label>
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
                <label><FiMessageSquare /> {t.custNotes}</label>
                <textarea 
                  rows="3" 
                  placeholder="Notes about their specific needs, objections, package details..."
                  value={newLeadData.notes}
                  onChange={e => setNewLeadData({...newLeadData, notes: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                {t.custSubmit}
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
              <h3><FiFileText /> {t.sumModalTitle}</h3>
              <button className="btn-close" onClick={() => setShowSummaryModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleCreateSummary} className="premium-form modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>{t.sumDate}</label>
                  <input 
                    type="date" 
                    value={newSummaryData.reportDate}
                    onChange={e => setNewSummaryData({...newSummaryData, reportDate: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{t.sumActiveWa}</label>
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
                  <label><FiMapPin /> {t.sumRegionCountry}</label>
                  <select 
                    value={sumCountry}
                    onChange={e => setSumCountry(e.target.value)}
                    required
                  >
                    {countries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label><FiMapPin /> {t.sumRegionCity}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jakarta Barat, Selangor, Sydney"
                    value={sumCity}
                    onChange={e => setSumCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row font-row">
                <div className="form-group">
                  <label><FiBriefcase /> {t.sumCategory}</label>
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
                  <label>{t.sumOutreachCount}</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 40" 
                    value={newSummaryData.contactCount}
                    onChange={e => setNewSummaryData({...newSummaryData, contactCount: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{t.sumColdFuCount}</label>
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
                  <label>{t.sumWarmFuCount}</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 5" 
                    value={newSummaryData.respondedFollowupCount}
                    onChange={e => setNewSummaryData({...newSummaryData, respondedFollowupCount: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{t.sumResponseCount}</label>
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
                  <label>{t.sumDealsCount}</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 1" 
                    value={newSummaryData.dealCount}
                    onChange={e => setNewSummaryData({...newSummaryData, dealCount: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>{t.sumFailedCount}</label>
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
                <label><FiMessageSquare /> {t.sumNotes}</label>
                <textarea 
                  rows="2" 
                  placeholder="Obstacles, WA account bans, general remarks..."
                  value={newSummaryData.notes}
                  onChange={e => setNewSummaryData({...newSummaryData, notes: e.target.value})}
                ></textarea>
              </div>

              <div className="form-group">
                <label><FiTarget /> {t.sumPlan}</label>
                <textarea 
                  rows="2" 
                  placeholder="Plans for tomorrow, follow-up regions..."
                  value={newSummaryData.nextPlan}
                  onChange={e => setNewSummaryData({...newSummaryData, nextPlan: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                {t.sumSubmit}
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
                {t.progModalTitle}: {
                  activityType === 'cold_followup' ? (language === 'id' ? 'Cold Follow-up' : 'Cold Follow-up') :
                  activityType === 'warm_followup' ? (language === 'id' ? 'Warm Follow-up' : 'Warm Follow-up') :
                  activityType === 'response_received' ? (language === 'id' ? 'Respons Diterima' : 'Response Received') :
                  activityType === 'deal_closed' ? (language === 'id' ? 'Deal Closed' : 'Close Deal') : (language === 'id' ? 'Tandai Gagal' : 'Mark Failed')
                }
              </h3>
              <button className="btn-close" onClick={() => setShowLogActivityModal(false)}><FiX /></button>
            </div>
            
            <form onSubmit={handleLogActivity} className="premium-form modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label><FiCalendar /> {t.progDate}</label>
                  <input 
                    type="date" 
                    value={activityData.activityDate}
                    onChange={e => setActivityData({...activityData, activityDate: e.target.value})}
                    required
                  />
                </div>
                {['cold_followup', 'warm_followup'].includes(activityType) && (
                  <div className="form-group">
                    <label><FiClock /> {t.progNextDate}</label>
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
                    <label>{t.custDealPkg}</label>
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
                    <label>{t.custDealVal}</label>
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
                  <label>{t.custFailReason}</label>
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
                <label><FiMessageSquare /> {t.progNotes}</label>
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
                <FiCheck /> {t.progSubmit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsTracker;
