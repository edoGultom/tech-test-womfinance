import axios from 'axios';
import { getAuthToken } from '../utils/auth';

export interface ApiError {
  message: string;
  statusCode?: number;
}
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const api = axios.create({
  baseURL: BASE_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor untuk inject token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//handle 401 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized, logging out...');
    }
    return Promise.reject(error);
  }
);

export default api;
