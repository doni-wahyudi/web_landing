import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiEye, FiEyeOff, FiCopy, FiCheck } from 'react-icons/fi';
import { getCpanelAccounts, addCpanelAccount, updateCpanelAccount, deleteCpanelAccount } from '../../services/cpanelService';
import CpanelAccountModal from '../../components/admin/CpanelAccountModal';
import './CpanelAccounts.css';

const CpanelAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  
  // States for password visibility/copying within the table
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const data = await getCpanelAccounts();
      setAccounts(data);
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleOpenModal = (account = null) => {
    setAccountToEdit(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAccountToEdit(null);
  };

  const handleSaveAccount = async (formData) => {
    try {
      if (accountToEdit) {
        await updateCpanelAccount(accountToEdit.id, formData);
      } else {
        await addCpanelAccount(formData);
      }
      handleCloseModal();
      fetchAccounts();
    } catch (error) {
      console.error("Failed to save account", error);
      alert("An error occurred while saving the account.");
    }
  };

  const handleDeleteAccount = async (id) => {
    if (window.confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
      try {
        await deleteCpanelAccount(id);
        fetchAccounts();
      } catch (error) {
        console.error("Failed to delete account", error);
      }
    }
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyPassword = (password, id) => {
    navigator.clipboard.writeText(password);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">cPanel Accounts</h1>
          <p className="admin-subtitle">Manage client website and cPanel credentials.</p>
        </div>
        <button className="btn btn-primary btn-add" onClick={() => handleOpenModal()}>
          <FiPlus /> Add New Account
        </button>
      </div>

      <div className="admin-table-container glass">
        {isLoading ? (
          <div className="admin-loading">Loading accounts...</div>
        ) : accounts.length === 0 ? (
          <div className="admin-empty-state">
            <p>No cPanel accounts found. Add one to get started.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Website URL</th>
                <th>cPanel URL</th>
                <th>Username</th>
                <th>Password</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(acc => (
                <tr key={acc.id}>
                  <td>
                    <a href={acc.websiteUrl} target="_blank" rel="noopener noreferrer" className="table-link">
                      {acc.websiteUrl.replace(/^https?:\/\//, '')} <FiExternalLink size={12} />
                    </a>
                  </td>
                  <td>
                    <a href={acc.cpanelUrl} target="_blank" rel="noopener noreferrer" className="table-link">
                      {acc.cpanelUrl.replace(/^https?:\/\//, '')} <FiExternalLink size={12} />
                    </a>
                  </td>
                  <td><span className="badge-user">{acc.username}</span></td>
                  <td>
                    <div className="table-password-cell">
                      <span className="password-mask">
                        {visiblePasswords[acc.id] ? acc.password : '••••••••'}
                      </span>
                      <div className="password-actions">
                        <button 
                          className="btn-icon-small" 
                          onClick={() => togglePasswordVisibility(acc.id)}
                          title={visiblePasswords[acc.id] ? "Hide Password" : "Show Password"}
                        >
                          {visiblePasswords[acc.id] ? <FiEyeOff /> : <FiEye />}
                        </button>
                        <button 
                          className="btn-icon-small" 
                          onClick={() => copyPassword(acc.password, acc.id)}
                          title="Copy Password"
                        >
                          {copiedId === acc.id ? <FiCheck className="text-success" /> : <FiCopy />}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon edit" onClick={() => handleOpenModal(acc)} title="Edit">
                        <FiEdit2 />
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDeleteAccount(acc.id)} title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <CpanelAccountModal 
        key={isModalOpen ? (accountToEdit?.id || 'new') : 'closed'}
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveAccount} 
        accountToEdit={accountToEdit} 
      />
    </div>
  );
};

export default CpanelAccounts;
