
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

// Mock data for development when backend is not available
const mockProfile = {
  id: 'victim1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1985-06-15',
  gender: 'Male',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    country: 'USA'
  },
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '(555) 987-6543'
  },
  medicalInfo: {
    bloodType: 'O+',
    allergies: 'Penicillin',
    medicalConditions: 'None'
  },
  joinDate: '2023-10-15'
};

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
  },

  // User profile API functions
  getUserProfile: async (userId?: string) => {
    try {
      // For real implementation:
      // const response = await api.get(`/users/${userId || 'current'}/profile`);
      // return response.data;
      
      // For development when backend is not available, return mock data
      console.log('Fetching profile for user:', userId);
      return mockProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  updateProfile: async (profileData: any) => {
    try {
      // For real implementation:
      // const response = await api.put(`/users/${profileData.id}/profile`, profileData);
      // return response.data;
      
      // For development when backend is not available
      console.log('Profile update data:', profileData);
      return { success: true, data: { ...mockProfile, ...profileData } };
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
};
