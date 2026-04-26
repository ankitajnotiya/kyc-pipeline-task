import axios from 'axios';
import { KYCData } from '../types/kyc';

const API_BASE_URL = 'http://localhost:8000/api/v1/kyc';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const kycApi = {
  submitKYC: async (formData: FormData) => {
    const response = await api.post('/submit/', formData);
    return response.data;
  },

  getKYCStatus: async (id: number) => {
    const response = await api.get(`/${id}/`);
    return response.data;
  },

  getKYCQueue: async () => {
    const response = await api.get('/queue/');
    return response.data;
  },

  updateKYCStatus: async (id: number, data: Partial<KYCData>) => {
    const response = await api.put(`/${id}/`, data);
    return response.data;
  },
};
