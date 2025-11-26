import axios from 'axios';
import { getIdToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ideas-parking-lot-server.vercel.app';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Firebase token to requests if available
api.interceptors.request.use(async (config) => {
  const token = await getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        // Clear any stored auth state
        const { logout } = await import('./auth');
        await logout();
        // Redirect to login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  verifyToken: async (token) => {
    const response = await api.post('/api/auth/verify-token', { token });
    return response.data;
  },
};

// Ideas API
export const ideasAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/api/ideas', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/ideas/${id}`);
    return response.data;
  },

  getMyIdeas: async () => {
    const response = await api.get('/api/ideas/user/my-ideas');
    return response.data;
  },

  create: async (ideaData) => {
    const response = await api.post('/api/ideas', ideaData);
    return response.data;
  },

  update: async (id, ideaData) => {
    const response = await api.put(`/api/ideas/${id}`, ideaData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/ideas/${id}`);
    return response.data;
  },
};

// Categories API (Public endpoint - no auth required)
export const categoriesAPI = {
  getAll: async () => {
    try {
      // Create a request without auth token for public endpoints
      const response = await axios.get(`${API_BASE_URL}/api/categories`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return empty array on error so UI doesn't break
      return { 
        success: false, 
        categories: [],
        error: error.response?.data?.message || 'Failed to fetch categories'
      };
    }
  },
};

export default api;

