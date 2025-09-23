import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:9090/admin',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export interface UserData {
  userId: number;
  username?: string;
  email?: string;
  role?: string;
}

export interface UserResponse {
  userId: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const useGetUser = () =>
  useMutation({
    mutationFn: async (userId: number) => {
      const response = await api.post<UserResponse>('/user/getbyid', { userId });
      return response.data;
    },
    onSuccess: (data) => toast.success(`👤 User "${data.username}" retrieved successfully!`),
    onError: (error: any) => {
      const msg = error.response?.data?.error || 'Failed to fetch user';
      toast.error(`❌ ${msg}`);
    }
  });

export const useModifyUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: UserData) => {
      const response = await api.put<UserResponse>('/user/modify', userData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`✨ User "${data.username}" updated successfully!`);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || 'Failed to update user';
      toast.error(`❌ ${msg}`);
    },
  });
};
