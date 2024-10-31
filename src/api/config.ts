import axios from 'axios';

const API_BASE_URL = 'https://api.example.com/v1'; // Replace with your actual API URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw error;
};