import apiClient from './client';
import { mockProducts, mockCategories } from './mockData';

// ============================================
// FARM ANALYSIS API
// ============================================
export const analysisAPI = {
  analyzeFarm: async (data) => {
    const response = await apiClient.post('/v1/analyze', data);
    return response.data;
  },
};

// ============================================
// CHATBOT API
// ============================================
export const chatAPI = {
  createSession: async (initialMessage = null, context = {}) => {
    const response = await apiClient.post('/chat/session', {
      initialMessage,
      context,
    });
    return response.data;
  },

  sendMessage: async (message, sessionId, context = {}) => {
    const response = await apiClient.post('/chat/message', {
      message,
      sessionId,
      language: context.language || 'en',
      context,
      isVoice: context.isVoice || false
    });
    return response.data;
  },

  getChatHistory: async (sessionId, limit = 50) => {
    const response = await apiClient.get(`/chat/history/${sessionId}`, {
      params: { limit },
    });
    return response.data;
  },

  getPopularQuestions: async (language = 'en') => {
    const response = await apiClient.get('/chat/popular-questions', {
      params: { language },
    });
    return response.data;
  },

  updateFeedback: async (messageId, feedback) => {
    const response = await apiClient.put(`/chat/feedback/${messageId}`, feedback);
    return response.data;
  },

  getChatSessions: async () => {
    const response = await apiClient.get('/chat/sessions');
    return response.data;
  },
};

// ============================================
// MARKETPLACE API
// ============================================
export const marketplaceAPI = {
  getProducts: async (filters = {}) => {
    try {
      const response = await apiClient.get('/marketplace/products', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.log('Using mock data for marketplace');
      // Filter mock products based on filters
      let filteredProducts = [...mockProducts];
      
      if (filters.category && filters.category !== '') {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(filters.minPrice));
      }
      
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(filters.maxPrice));
      }
      
      // Pagination
      const page = parseInt(filters.page || 1);
      const limit = 6;
      const start = (page - 1) * limit;
      const paginatedProducts = filteredProducts.slice(start, start + limit);
      
      return {
        success: true,
        data: {
          products: paginatedProducts,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(filteredProducts.length / limit),
            totalProducts: filteredProducts.length,
            perPage: limit
          }
        }
      };
    }
  },

  getProductById: async (id) => {
    const response = await apiClient.get(`/marketplace/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await apiClient.post('/marketplace/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/marketplace/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/marketplace/products/${id}`);
    return response.data;
  },

  getCategories: async () => {
    try {
      const response = await apiClient.get('/marketplace/categories');
      return response.data;
    } catch (error) {
      console.log('Using mock categories');
      return {
        success: true,
        data: {
          categories: mockCategories
        }
      };
    }
  },
};

// ============================================
// WEATHER API
// ============================================
export const weatherAPI = {
  getCurrentWeather: async (lat, lon) => {
    const response = await apiClient.get('/weather/current', {
      params: { lat, lon },
    });
    return response.data;
  },

  getForecast: async (lat, lon, days = 7) => {
    const response = await apiClient.get('/weather/forecast', {
      params: { lat, lon, days },
    });
    return response.data;
  },

  getAgricultureAdvice: async (lat, lon, crop) => {
    const response = await apiClient.get('/weather/agriculture', {
      params: { lat, lon, crop },
    });
    return response.data;
  },
};

// ============================================
// AUTH API
// ============================================
export const authAPI = {
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await apiClient.put('/auth/profile', profileData);
    return response.data;
  },
};