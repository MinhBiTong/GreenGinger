import axios from 'axios';

const endpoint = '/auth';
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'}${endpoint}`;

export const LoginApi = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  },
  register: async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
    return response.data;
  }
};