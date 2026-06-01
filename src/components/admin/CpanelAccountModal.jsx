import { useState } from 'react';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import './CpanelAccountModal.css';

const CpanelAccountModal = ({ isOpen, onClose, onSave, accountToEdit }) => {
  const [formData, setFormData] = useState({
    websiteUrl: accountToEdit?.websiteUrl || '',
    cpanelUrl: accountToEdit?.cpanelUrl || '',
    username: accountToEdit?.username || '',
    password: accountToEdit?.password || ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal glass animate-entrance">
        <div className="admin-modal-header">
          <h3>{accountToEdit ? 'Edit cPanel Account' : 'Add New cPanel Account'}</h3>
          <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="form-group">
            <label htmlFor="websiteUrl">Website URL</label>
            <input 
              type="url" 
              id="websiteUrl" 
              name="websiteUrl" 
              placeholder="https://example.com" 
              value={formData.websiteUrl}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cpanelUrl">cPanel Login URL</label>
            <input 
              type="url" 
              id="cpanelUrl" 
              name="cpanelUrl" 
              placeholder="https://example.com:2083" 
              value={formData.cpanelUrl}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                placeholder="cpaneluser" 
                value={formData.username}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-action">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
                <button 
                  type="button" 
                  className="btn-input-action"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="admin-modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CpanelAccountModal;
