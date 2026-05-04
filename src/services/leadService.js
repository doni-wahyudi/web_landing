const API_BASE_URL = 'http://localhost:5000/api'; // Local backend
// Note: In production, this should be https://aurotech.co.id/api

export const getLeads = async () => {
  const response = await fetch(`${API_BASE_URL}/leads`);
  if (!response.ok) throw new Error('Failed to fetch leads');
  return response.json();
};

export const addLead = async (leadData) => {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });
  if (!response.ok) throw new Error('Failed to add lead');
  return response.json();
};

export const deleteLead = async (id) => {
  const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete lead');
  return true;
};

export const getAnalytics = (leads) => {
  if (!leads || leads.length === 0) return null;

  const totalContacts = leads.reduce((sum, l) => sum + l.contact_count, 0);
  const totalResponded = leads.reduce((sum, l) => sum + l.responded_count, 0);
  const totalDeals = leads.reduce((sum, l) => sum + l.deal_count, 0);
  
  // Calculate stats by region
  const regionStats = leads.reduce((acc, l) => {
    if (!acc[l.region]) acc[l.region] = { name: l.region, contacts: 0, deals: 0 };
    acc[l.region].contacts += l.contact_count;
    acc[l.region].deals += l.deal_count;
    return acc;
  }, {});

  // Calculate stats by field
  const fieldStats = leads.reduce((acc, l) => {
    if (!acc[l.business_field]) acc[l.business_field] = { name: l.business_field, value: 0 };
    acc[l.business_field].value += l.contact_count;
    return acc;
  }, {});

  return {
    totalContacts,
    totalResponded,
    totalDeals,
    responseRate: ((totalResponded / totalContacts) * 100).toFixed(1),
    dealRate: ((totalDeals / totalContacts) * 100).toFixed(1),
    regionData: Object.values(regionStats),
    fieldData: Object.values(fieldStats)
  };
};
