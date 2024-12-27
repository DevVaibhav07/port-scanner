import axios from 'axios';
import { ScanRequest, ScanResult } from '../types/scan';

const API_URL = 'http://localhost:3000/api';

export const checkServerConnection = async (): Promise<boolean> => {
  try {
    await axios.get(`${API_URL}/health`);
    return true;
  } catch (error) {
    return false;
  }
};

export const scanPorts = async (request: ScanRequest): Promise<ScanResult[]> => {
  const response = await axios.post(`${API_URL}/scan`, request);
  return response.data;
};