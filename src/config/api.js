const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/api/auth/login`,
  REGISTER: `${API_URL}/api/auth/register`,
  USER_DATA: `${API_URL}/api/auth/me`,
  REPORTS: `${API_URL}/api/reports`,
  REPORTS_STATS: `${API_URL}/api/reports/stats`
};

export default API_URL; 