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

export const getArticles = async () => {
  const response = await fetch(`${API_BASE_URL}/articles`);
  if (!response.ok) throw new Error('Fetch failed');
  return response.json();
};

export const createArticle = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: 'POST',
    headers: getHeaders(),
    body: formData // Form data handles multipart files automatically
  });
  if (!response.ok) throw new Error('Post failed');
  return response.json();
};

export const updateArticle = async (id, formData) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: formData
  });
  if (!response.ok) throw new Error('Update failed');
  return response.json();
};

export const deleteArticle = async (id) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Delete failed');
  return true;
};

