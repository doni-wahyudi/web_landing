const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://aurotech.co.id/api';

export const getLeads = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/crm/leads?${query}`);
  if (!response.ok) throw new Error('Failed to fetch CRM leads');
  return response.json();
};

export const addLead = async (leadData) => {
  const response = await fetch(`${API_BASE_URL}/crm/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });
  if (!response.ok) throw new Error('Failed to add CRM lead');
  return response.json();
};

export const updateLead = async (id, leadData) => {
  const response = await fetch(`${API_BASE_URL}/crm/leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });
  if (!response.ok) throw new Error('Failed to update CRM lead');
  return response.json();
};

export const deleteLead = async (id) => {
  const response = await fetch(`${API_BASE_URL}/crm/leads/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete CRM lead');
  return true;
};

export const logLeadActivity = async (id, activityData) => {
  const response = await fetch(`${API_BASE_URL}/crm/leads/${id}/activity`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activityData)
  });
  if (!response.ok) throw new Error('Failed to log lead activity');
  return response.json();
};

export const getCrmAnalytics = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/crm/analytics?${query}`);
  if (!response.ok) throw new Error('Failed to fetch CRM analytics');
  return response.json();
};
