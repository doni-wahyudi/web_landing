// Replace this with your actual live domain (e.g., https://aurotech.co.id)
const API_BASE_URL = 'https://aurotech.co.id/api';

export const getCpanelAccounts = async () => {
  const response = await fetch(`${API_BASE_URL}/cpanel-accounts`);
  if (!response.ok) throw new Error('Failed to fetch accounts');
  return response.json();
};

export const addCpanelAccount = async (account) => {
  const response = await fetch(`${API_BASE_URL}/cpanel-accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(account)
  });
  if (!response.ok) throw new Error('Failed to add account');
  return response.json();
};

export const updateCpanelAccount = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/cpanel-accounts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
  if (!response.ok) throw new Error('Failed to update account');
  return response.json();
};

export const deleteCpanelAccount = async (id) => {
  const response = await fetch(`${API_BASE_URL}/cpanel-accounts/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete account');
  return true;
};
