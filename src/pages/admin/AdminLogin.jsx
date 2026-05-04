import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser } from 'react-icons/fi';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        sessionStorage.setItem('admin_logged_in', 'true');
        navigate('/admin/cpanel');
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 800);
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
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <div className="admin-login-footer">
          <p>Demo Credentials: admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
