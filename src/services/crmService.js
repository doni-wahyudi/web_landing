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

export const getLeads = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/crm/leads?${query}`, {
    headers: getHeaders()
  });
  return handleResponse(response, 'Failed to fetch CRM leads');
};

export const addLead = async (leadData) => {
  const response = await fetch(`${API_BASE_URL}/crm/leads`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(leadData)
  });
  return handleResponse(response, 'Failed to add CRM lead');
};

export const updateLead = async (id, leadData) => {
  const response = await fetch(`${API_BASE_URL}/crm/leads/${id}`, {
    method: 'PUT',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(leadData)
  });
  return handleResponse(response, 'Failed to update CRM lead');
};

export const deleteLead = async (id) => {
  const response = await fetch(`${API_BASE_URL}/crm/leads/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (response.status === 401) {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_token');
    throw new Error('Sesi admin berakhir. Silakan login ulang.');
  }
  if (!response.ok) throw new Error('Failed to delete CRM lead');
  return true;
};

export const logLeadActivity = async (id, activityData) => {
  const response = await fetch(`${API_BASE_URL}/crm/leads/${id}/activity`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(activityData)
  });
  return handleResponse(response, 'Failed to log lead activity');
};

export const getCrmAnalytics = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/crm/analytics?${query}`, {
    headers: getHeaders()
  });
  return handleResponse(response, 'Failed to fetch CRM analytics');
};

