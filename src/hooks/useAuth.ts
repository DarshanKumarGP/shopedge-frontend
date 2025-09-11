import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post('/users/register', data);
      return response.data;
    },
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
