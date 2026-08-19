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

export const getCpanelAccounts = async () => {
  const response = await fetch(`${API_BASE_URL}/cpanel-accounts`, {
    headers: getHeaders()
  });
  return handleResponse(response, 'Failed to fetch accounts');
};

export const addCpanelAccount = async (account) => {
  const response = await fetch(`${API_BASE_URL}/cpanel-accounts`, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(account)
  });
  return handleResponse(response, 'Failed to add account');
};

export const updateCpanelAccount = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/cpanel-accounts/${id}`, {
    method: 'PUT',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(updatedData)
  });
  return handleResponse(response, 'Failed to update account');
};

export const deleteCpanelAccount = async (id) => {
  const response = await fetch(`${API_BASE_URL}/cpanel-accounts/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (response.status === 401) {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_token');
    throw new Error('Sesi admin berakhir. Silakan login ulang.');
  }
  if (!response.ok) throw new Error('Failed to delete account');
  return true;
};

