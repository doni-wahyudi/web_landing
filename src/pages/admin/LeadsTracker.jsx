import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiCalendar, FiMapPin, FiBriefcase, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import { getLeads, addLead, deleteLead } from '../../services/leadService';
import './LeadsTracker.css';

const LeadsTracker = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    reportDate: new Date().toISOString().split('T')[0],
    region: '',
    businessField: '',
    contactCount: 0,
    respondedCount: 0,
    dealCount: 0,
    failedCount: 0,
    progressCount: 0,
    notes: ''
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLead(formData);
      fetchLeads();
      // Reset some fields but keep date and region for quick entry
      setFormData(prev => ({
        ...prev,
        contactCount: 0,
        respondedCount: 0,
        dealCount: 0,
        failedCount: 0,
        progressCount: 0,
        notes: ''
      }));
    } catch (err) {
      alert('Error adding lead: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteLead(id);
        fetchLeads();
      } catch (err) {
        alert('Error deleting lead');
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Lead Acquisition Tracker</h1>
        <p>Input daily progress for customer acquisition</p>
      </div>

      <div className="tracker-grid">
        {/* Form Section */}
        <div className="tracker-form-card glass">
          <h3><FiPlus /> New Entry</h3>
          <form onSubmit={handleSubmit} className="premium-form">
            <div className="form-row">
              <div className="form-group">
                <label><FiCalendar /> Report Date</label>
                <input 
                  type="date" 
                  value={formData.reportDate}
                  onChange={e => setFormData({...formData, reportDate: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label><FiMapPin /> Region</label>
                <select 
                  value={formData.region}
                  onChange={e => setFormData({...formData, region: e.target.value})}
                  required
                >
                  <option value="">Pilih Wilayah</option>
                  <option value="Jakarta Pusat">Jakarta Pusat</option>
                  <option value="Jakarta Utara">Jakarta Utara</option>
                  <option value="Jakarta Timur">Jakarta Timur</option>
                  <option value="Jakarta Selatan">Jakarta Selatan</option>
                  <option value="Jakarta Barat">Jakarta Barat</option>
                  <option value="Bekasi">Bekasi</option>
                  <option value="Depok">Depok</option>
                  <option value="Tangerang">Tangerang</option>
                  <option value="Bogor">Bogor</option>
                  <option value="Luar Jabodetabek">Luar Jabodetabek</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label><FiBriefcase /> Business Field</label>
              <input 
                type="text" 
                placeholder="e.g. Clinic, Bimbel, Bakery, Dental"
                value={formData.businessField}
                onChange={e => setFormData({...formData, businessField: e.target.value})}
                required
              />
            </div>

            <div className="stats-row">
              <div className="form-group">
                <label>Contacted</label>
                <input 
                  type="number" 
                  value={formData.contactCount}
                  onChange={e => setFormData({...formData, contactCount: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="form-group">
                <label>Responded</label>
                <input 
                  type="number" 
                  value={formData.respondedCount}
                  onChange={e => setFormData({...formData, respondedCount: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="form-group">
                <label>Deals</label>
                <input 
                  type="number" 
                  value={formData.dealCount}
                  onChange={e => setFormData({...formData, dealCount: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="stats-row">
              <div className="form-group">
                <label>Progress</label>
                <input 
                  type="number" 
                  value={formData.progressCount}
                  onChange={e => setFormData({...formData, progressCount: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="form-group">
                <label>Failed</label>
                <input 
                  type="number" 
                  value={formData.failedCount}
                  onChange={e => setFormData({...formData, failedCount: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="form-group">
              <label><FiMessageSquare /> Notes</label>
              <textarea 
                placeholder="Any specific details (e.g. why they declined)"
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Submit Daily Report
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="tracker-list-card glass">
          <h3><FiTrendingUp /> Recent History</h3>
          {isLoading ? (
            <p>Loading reports...</p>
          ) : (
            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Field</th>
                    <th>Region</th>
                    <th>C/R/D</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <tr key={lead.id}>
                      <td>{new Date(lead.report_date).toLocaleDateString()}</td>
                      <td>{lead.business_field}</td>
                      <td><span className="badge-region">{lead.region}</span></td>
                      <td>
                        <span className="stat-c">{lead.contact_count}</span>/
                        <span className="stat-r">{lead.responded_count}</span>/
                        <span className="stat-d">{lead.deal_count}</span>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(lead.id)} className="btn-icon-delete">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsTracker;
