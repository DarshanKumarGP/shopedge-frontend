import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export interface LoginData {
  username: string;
  password: string;
}
export interface AuthResponse {
  token?: string;
  username: string;
  role: string;
}

// --- this hook is used by your RegisterPage ---
export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => api.post('/users/register', data),
    onSuccess: (data) => {
      toast.success('Registration successful!');
      console.log('User registered:', data);
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Registration failed';
      toast.error(message);
      console.error('Registration error:', error);
    },
  });
};

// --- Main auth logic hook ---
export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => api.post<AuthResponse>('/auth/login', data).then(res => res.data),
    onSuccess: () => {
      toast.success('Login successful!');
      queryClient.clear();
      navigate('/customerhome', { replace: true });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || 'Login failed';
      toast.error(msg);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.post<{ message: string }>('/auth/logout').then(res => res.data),
    onSuccess: () => {
      document.cookie = 'authToken=; path=/; max-age=0';
      toast.success('Logged out successfully!');
      queryClient.clear();
      navigate('/login', { replace: true });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Logout failed';
      toast.error(msg);
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
};
