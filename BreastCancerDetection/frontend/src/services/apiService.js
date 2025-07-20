import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token for protected routes
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current logged in user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get user profile details
  getUserProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user profile' };
    }
  }
};

// Detection services
export const detectionService = {
  // Process image for breast cancer detection
  detectBreastCancer: async (imageBase64) => {
    try {
      const response = await api.post('/detection', { imageBase64 });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Detection failed' };
    }
  },

  // Get detection history for current user
  getDetectionHistory: async () => {
    try {
      const response = await api.get('/detection/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get detection history' };
    }
  },

  // Get a specific detection result
  getDetectionById: async (id) => {
    try {
      const response = await api.get(`/detection/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get detection details' };
    }
  },

  // Fetch image history for a user
  getImageHistory: async () => {
    try {
      const response = await api.get('/images/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch image history' };
    }
  }
};

export default {
  authService,
  detectionService
};
