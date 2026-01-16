import axios from 'axios';
import type { PullRequest, FileChange } from '../types/pr';
import { getToken } from './auth-service';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const prService = {
  // Get all pull requests
  async getPullRequests(): Promise<PullRequest[]> {
    try {
      const response = await apiClient.get('/pull-requests');
      return response.data;
    } catch (error) {
      console.error('Error fetching PRs:', error);
      throw error;
    }
  },

  // Get single pull request
  async getPullRequest(id: string): Promise<PullRequest | null> {
    try {
      const response = await apiClient.get(`/pull-requests/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching PR:', error);
      throw error;
    }
  },

  // Get file changes for a PR
  async getFileChanges(prId: string): Promise<FileChange[]> {
    try {
      const response = await apiClient.get(`/pull-requests/${prId}/files`);
      return response.data;
    } catch (error) {
      console.error('Error fetching file changes:', error);
      throw error;
    }
  },
};

export default prService;
