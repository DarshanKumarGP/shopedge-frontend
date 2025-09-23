// src/hooks/useAdminAuth.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Base URL WITHOUT trailing /api
const API_BASE = 'http://localhost:9090';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Remove problematic custom headers (esp X-Timestamp) to avoid CORS issues
api.interceptors.request.use(
  (config) => {
    if (config.headers) {
      delete config.headers['X-Timestamp'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      document.cookie = 'authToken=; path=/; max-age=0';
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface AdminLoginData {
  username: string;
  password: string;
}
export interface AdminAuthResponse {
  token?: string;
  username: string;
  role: string;
  userId: number;
}

// Auth mutation
export const useAdminAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adminLoginMutation = useMutation({
    mutationFn: async (data: AdminLoginData) => {
      if (!data.username.trim() || !data.password.trim()) {
        throw new Error('Username and password are required');
      }
      const response = await api.post<AdminAuthResponse>('/auth/login', {
        ...data,
        loginType: 'ADMIN_PORTAL',
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.role !== 'ADMIN') {
        toast.error('🚨 Access Denied: Administrator privileges required');
        throw new Error('Insufficient privileges');
      }
      console.info(
        `[ADMIN ACCESS] User ${data.username} logged in at ${new Date().toISOString()}`
      );
      toast.success(`🎉 Welcome Administrator ${data.username}!`);
      queryClient.clear();
      navigate('/admin/dashboard', { replace: true });
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.error || error.message || 'Admin authentication failed';
      toast.error(`🔒 ${errorMsg}`);
      console.warn(
        `[ADMIN ACCESS DENIED] Failed login attempt at ${new Date().toISOString()}`
      );
    },
  });

  const adminLogoutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/auth/logout');
      return response.data;
    },
    onSuccess: () => {
      document.cookie = 'authToken=; path=/; max-age=0';
      localStorage.removeItem('adminSession');
      sessionStorage.clear();
      toast.success('🔐 Admin session ended securely');
      queryClient.clear();
      navigate('/admin/login', { replace: true });
      window.location.reload();
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Logout failed';
      toast.error(`⚠️ ${msg}`);
    },
  });

  return {
    adminLogin: adminLoginMutation.mutateAsync,
    isAdminLoggingIn: adminLoginMutation.isPending,
    adminLogout: adminLogoutMutation.mutateAsync,
    isAdminLoggingOut: adminLogoutMutation.isPending,
  };
};

// Verification hook (checks admin session/role)
export const useAdminVerification = () => {
  return useQuery({
    queryKey: ['adminVerification'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/verify');
        const userData = response.data;
        if (userData.role !== 'ADMIN') {
          throw new Error('ADMIN_ACCESS_DENIED');
        }
        if (!userData.username || !userData.userId) {
          throw new Error('INVALID_ADMIN_TOKEN');
        }
        return userData;
      } catch (error: any) {
        if (
          error.response?.status === 401 ||
          error.message.includes('ADMIN')
        ) {
          document.cookie = 'authToken=; path=/; max-age=0';
        }
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: true,
    refetchInterval: 5 * 60 * 1000,
  });
};
