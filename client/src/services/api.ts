import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        useAuthStore.getState().logout();
      } else if (status === 429) {
        window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Too many requests. Please wait a moment and try again.', type: 'warning' } }));
      } else if (status === 403) {
        window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Access denied: You do not have permission', type: 'warning' } }));
      } else if (status === 404) {
        window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Resource not found', type: 'error' } }));
      } else if (status >= 500) {
        window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Server unavailable. Please try again later.', type: 'error' } }));
      }
    } else if (error.request) {
      window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Network error. Please check your connection.', type: 'error' } }));
    }
    return Promise.reject(error);
  }
);

export default api;
