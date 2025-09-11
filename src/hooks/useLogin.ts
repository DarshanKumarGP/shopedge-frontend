import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  role: 'ADMIN' | 'CUSTOMER';
  username: string;
}

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      toast.success(`Welcome back, ${data.username}!`);
      
      // Role-based redirection
      if (data.role === 'CUSTOMER') {
        navigate('/customerhome');
      } else if (data.role === 'ADMIN') {
        navigate('/adminhome');
      }
    },
    onError: (error: any) => {
      // Extract the error message safely
      let message = 'Login failed';
      
      if (error?.response?.data?.error) {
        message = error.response.data.error;
      } else if (error?.message) {
        message = error.message;
      }
      
      toast.error(message);
      console.error('Login error:', error);
    },
  });
};
