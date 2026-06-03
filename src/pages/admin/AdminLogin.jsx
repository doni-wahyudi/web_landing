import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser } from 'react-icons/fi';
import './AdminLogin.css';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://aurotech.co.id/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        sessionStorage.setItem('admin_logged_in', 'true');
        sessionStorage.setItem('admin_token', data.token);
        navigate('/admin/cpanel');
      } else {
        setError(data.error || 'Invalid username or password');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Server connection failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card glass">
        <div className="admin-login-header">
          <h2>Admin Access</h2>
          <p>Sign in to manage your services</p>
        </div>
        
        {error && <div className="admin-alert error">{error}</div>}
        
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <div className="input-with-icon">
              <FiUser className="input-icon" />
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

