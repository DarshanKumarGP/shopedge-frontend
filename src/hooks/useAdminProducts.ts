import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:9090/admin',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export interface ProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrl: string;
}

export interface ProductResponse {
  productId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productData: ProductData) => {
      const response = await api.post<ProductResponse>('/products/add', productData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`🎉 Product "${data.name}" added successfully!`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || 'Failed to add product';
      toast.error(`❌ ${msg}`);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: number) => {
      const response = await api.delete('/products/delete', {
        data: { productId }
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('🗑️ Product deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.error || 'Failed to delete product';
      toast.error(`❌ ${msg}`);
    },
  });
};
