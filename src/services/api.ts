
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const casesApi = {
  getAllCases: async () => {
    try {
      const response = await api.get('/cases');
      return response.data;
    } catch (error) {
      console.error('Error fetching cases:', error);
      throw error;
    }
  },

  getCaseById: async (id: string) => {
    try {
      const response = await api.get(`/cases/${id}`);
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
