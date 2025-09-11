import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
  withCredentials: true,
});

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

interface ProductsResponse {
  user: {
    name: string;
    role: string;
  };
  products: Product[];
}

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async (): Promise<ProductsResponse> => {
      const url = category ? `/products?category=${category}` : '/products';
      const response = await api.get(url);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/products/categories');
      return response.data;
    },
  });
};
