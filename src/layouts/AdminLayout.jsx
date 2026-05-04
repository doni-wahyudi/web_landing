import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FiServer, FiLogOut, FiHome, FiFileText, FiTarget, FiTrendingUp } from 'react-icons/fi';
import './AdminLayout.css';
import { useEffect } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();

  // Simple mock auth check
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('admin_logged_in');
    if (!isLoggedIn && window.location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    navigate('/admin/login');
  };

  // If on login page, don't show sidebar
  if (window.location.pathname === '/admin/login') {
    return <div className="admin-root"><Outlet /></div>;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar glass">
        <div className="admin-sidebar-header">
          <h2>Aurotech Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/cpanel" className="admin-nav-link">
            <FiServer /> cPanel Accounts
          </Link>
          <Link to="/admin/articles" className="admin-nav-link">
            <FiFileText /> Manage Articles
          </Link>
          <Link to="/admin/leads" className="admin-nav-link">
            <FiTarget /> Leads Tracker
          </Link>
          <Link to="/admin/dashboard" className="admin-nav-link">
            <FiTrendingUp /> Dashboard
          </Link>
          <Link to="/" className="admin-nav-link">
            <FiHome /> Back to Site
          </Link>
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
