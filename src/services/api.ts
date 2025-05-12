
import axios from 'axios';

// Use environment variable for API URL with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for consistent error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    
    // Provide more helpful error messages based on error type
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your internet connection.'));
    }
    
    if (error.response.status === 404) {
      return Promise.reject(new Error('Resource not found. Please check the request URL.'));
    }
    
    return Promise.reject(error);
  }
);

export const casesApi = {
  getAllCases: async () => {
    try {
      const response = await api.get('/cases');
      // Normalize response format from Oracle to camelCase for consistency
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Transform oracle's lowercase_snake format to camelCase
        return response.data.data.map((caseItem: any) => ({
          id: caseItem.ID || caseItem.id,
          title: caseItem.TITLE || caseItem.title,
          status: caseItem.STATUS || caseItem.status,
          type: caseItem.TYPE || caseItem.type,
          description: caseItem.DESCRIPTION || caseItem.description,
          victim: caseItem.VICTIM || caseItem.victim,
          assignedStaff: caseItem.ASSIGNED_STAFF || caseItem.assignedStaff,
          openDate: caseItem.OPEN_DATE || caseItem.openDate,
          lastUpdated: caseItem.LAST_UPDATED || caseItem.lastUpdated
        }));
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching cases:', error);
      throw error;
    }
  },

  getCaseById: async (id: string) => {
    try {
      const response = await api.get(`/cases/${id}`);
      
      // Normalize data structure
      if (response.data && response.data.data) {
        const caseData = response.data.data;
        return {
          id: caseData.ID || caseData.id,
          title: caseData.TITLE || caseData.title,
          status: caseData.STATUS || caseData.status,
          type: caseData.TYPE || caseData.type,
          description: caseData.DESCRIPTION || caseData.description,
          victim: caseData.VICTIM || caseData.victim,
          assignedStaff: caseData.ASSIGNED_STAFF || caseData.assignedStaff,
          openDate: caseData.OPEN_DATE || caseData.openDate,
          lastUpdated: caseData.LAST_UPDATED || caseData.lastUpdated
        };
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching case ${id}:`, error);
      throw error;
    }
  },
  
  testConnection: async () => {
    try {
      const response = await api.get('/test-connection');
      return response.data;
    } catch (error) {
      console.error('Error testing database connection:', error);
      throw error;
    }
  }
};
