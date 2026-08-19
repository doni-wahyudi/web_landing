const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://aurotech.co.id/api';

const getHeaders = (extraHeaders = {}) => {
  const token = sessionStorage.getItem('admin_token');
  return {
    ...extraHeaders,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

const handleResponse = async (response, defaultError) => {
  if (response.status === 401) {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_token');
    throw new Error('Sesi admin berakhir. Silakan login ulang.');
  }
  if (!response.ok) throw new Error(defaultError);
  return response.json();
};

export const getLeads = async () => {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    headers: getHeaders()
  });
  return handleResponse(response, 'Failed to fetch leads');
};

export const addLead = async (leadData) => {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(leadData)
  });
  return handleResponse(response, 'Failed to add lead');
};

export const deleteLead = async (id) => {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (response.status === 401) {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_token');
    throw new Error('Sesi admin berakhir. Silakan login ulang.');
  }
  if (!response.ok) throw new Error('Failed to delete lead');
  return true;
};


export const getAnalytics = (leads) => {
  if (!leads || leads.length === 0) return null;

  const totalContacts = leads.reduce((sum, l) => sum + l.contact_count, 0);
  const totalResponded = leads.reduce((sum, l) => sum + l.responded_count, 0);
  const totalDeals = leads.reduce((sum, l) => sum + l.deal_count, 0);
  
  // Calculate stats by region
  const regionStats = leads.reduce((acc, l) => {
    if (!acc[l.region]) acc[l.region] = { name: l.region, contacts: 0, deals: 0 };
    acc[l.region].contacts += l.contact_count;
    acc[l.region].deals += l.deal_count;
    return acc;
  }, {});

  // Calculate stats by field
  const fieldStats = leads.reduce((acc, l) => {
    if (!acc[l.business_field]) acc[l.business_field] = { name: l.business_field, value: 0 };
    acc[l.business_field].value += l.contact_count;
    return acc;
  }, {});

  return {
    totalContacts,
    totalResponded,
    totalDeals,
    responseRate: ((totalResponded / totalContacts) * 100).toFixed(1),
    dealRate: ((totalDeals / totalContacts) * 100).toFixed(1),
    regionData: Object.values(regionStats),
    fieldData: Object.values(fieldStats)
  };
};
