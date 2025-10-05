import axios from 'axios';
import { getAuthToken } from '../utils/auth';

export interface ApiError {
  message: string;
  statusCode?: number;
}
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const apiClient = axios.create({
  baseURL: BASE_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor untuk inject token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request:', config);
    return config;
  },
  (error) => Promise.reject(error)
);

//handle 401 
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized, logging out...');
    }
    console.log('Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
