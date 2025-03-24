import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: async (data: { email: string; password: string; name: string }) => {
    const response = await api.post('/auth/register', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const cars = {
  getAll: async (params?: {
    location?: string;
    type?: string;
    maxPrice?: number;
  }) => {
    const response = await api.get('/cars', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },
};

export const bookings = {
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  create: async (data: {
    car_id: string;
    pickup_date: Date;
    return_date: Date;
    total_price: number;
  }) => {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  cancel: async (id: string) => {
    const response = await api.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
};

export default api;