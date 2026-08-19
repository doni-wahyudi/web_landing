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
  return handleResponse(response, 'Post failed');
};

export const updateArticle = async (id, formData) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: formData
  });
  return handleResponse(response, 'Update failed');
};

export const deleteArticle = async (id) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (response.status === 401) {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_token');
    throw new Error('Sesi admin berakhir. Silakan login ulang.');
  }
  if (!response.ok) throw new Error('Delete failed');
  return true;
};

