const STORAGE_KEY = 'auro_leads';
const LOGS_KEY = 'auro_lead_logs';
const COUNTER_KEY = 'auro_lead_counter';

const getNextId = () => {
  const id = parseInt(localStorage.getItem(COUNTER_KEY) || '0') + 1;
  localStorage.setItem(COUNTER_KEY, id.toString());
  return id;
};

const getAll = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
};

const saveAll = (leads) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
};

const getAllLogs = () => {
  try { return JSON.parse(localStorage.getItem(LOGS_KEY) || '[]'); }
  catch { return []; }
};

const saveAllLogs = (logs) => {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
};

export const getLeads = async (params = {}) => {
  let leads = getAll();
  if (params.status) leads = leads.filter(l => l.status === params.status);
  if (params.region) leads = leads.filter(l => l.region?.toLowerCase().includes(params.region.toLowerCase()));
  if (params.date_from) leads = leads.filter(l => l.contacted_date >= params.date_from);
  if (params.date_to) leads = leads.filter(l => l.contacted_date <= params.date_to);
  return leads.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
};

export const createLead = async (lead) => {
  const leads = getAll();
  const now = new Date().toISOString();
  const newLead = { ...lead, id: getNextId(), created_at: now, updated_at: now };
  leads.push(newLead);
  saveAll(leads);
  return newLead;
};

export const updateLead = async (id, data) => {
  const leads = getAll();
  const idx = leads.findIndex(l => l.id === id);
  if (idx === -1) throw new Error('Lead not found');
  leads[idx] = { ...leads[idx], ...data, id, updated_at: new Date().toISOString() };
  saveAll(leads);
  return leads[idx];
};

export const deleteLead = async (id) => {
  const leads = getAll().filter(l => l.id !== id);
  saveAll(leads);
  return true;
};

export const getLeadStats = async () => {
  const leads = getAll();
  const total = leads.length;
  const responded = leads.filter(l => ['responded', 'negotiating', 'deal_won'].includes(l.status)).length;
  const deals = leads.filter(l => l.status === 'deal_won').length;
  const lost = leads.filter(l => ['deal_lost', 'not_interested'].includes(l.status)).length;
  const active = leads.filter(l => ['new', 'contacted', 'followed_up'].includes(l.status)).length;
  const followingUp = leads.filter(l => l.status === 'followed_up').length;
  const needsFollowUp = leads.filter(l =>
    ['contacted', 'responded', 'negotiating'].includes(l.status) &&
    l.last_follow_up &&
    new Date(l.last_follow_up) < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  ).length;

  const regions = {};
  leads.forEach(l => {
    const r = l.region || 'Unknown';
    if (!regions[r]) regions[r] = { total: 0, responded: 0, deals: 0 };
    regions[r].total++;
    if (['responded', 'negotiating', 'deal_won'].includes(l.status)) regions[r].responded++;
    if (l.status === 'deal_won') regions[r].deals++;
  });

  const statusDistribution = {};
  leads.forEach(l => {
    statusDistribution[l.status] = (statusDistribution[l.status] || 0) + 1;
  });

  return {
    total,
    responded,
    deals,
    lost,
    active,
    followingUp,
    needsFollowUp,
    responseRate: total > 0 ? Math.round((responded / total) * 100) : 0,
    conversionRate: total > 0 ? Math.round((deals / total) * 100) : 0,
    regions,
    statusDistribution
  };
};

export const getDailyLogs = async () => {
  return getAllLogs().sort((a, b) => new Date(b.log_date) - new Date(a.log_date));
};

export const getLogByDate = async (date) => {
  const logs = getAllLogs();
  return logs.find(l => l.log_date === date) || null;
};

export const saveDailyLog = async (log) => {
  const logs = getAllLogs();
  const existing = logs.findIndex(l => l.log_date === log.log_date);
  const now = new Date().toISOString();
  if (existing !== -1) {
    logs[existing] = { ...logs[existing], ...log, id: logs[existing].id, updated_at: now };
  } else {
    log.id = getNextId();
    log.created_at = now;
    log.updated_at = now;
    logs.push(log);
  }
  saveAllLogs(logs);
  return log;
};
