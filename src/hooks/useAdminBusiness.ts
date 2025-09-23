import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/admin',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export interface BusinessAnalytics {
  totalRevenue: number;
  categorySales: Record<string, number>;
  categoryRevenue: Record<string, number>;
  totalItemsSold: number;
  uniqueCategories: number;
  topPerformingCategory: string;
  topRevenueCategory: string;
  period: string;
  totalOrders: number;
  averageOrderValue?: number;
  totalBusiness?: number;
}

export function useMonthlyBusiness(params: { month: number, year: number } | null) {
  return useQuery({
    queryKey: ['monthlyBusiness', params],
    queryFn: async () => {
      if (!params) return null;
      const { data } = await api.get(`/business/monthly?month=${params.month}&year=${params.year}`);
      return data as BusinessAnalytics;
    },
    enabled: !!params,
  });
}

export function useDailyBusiness(date: string | null) {
  return useQuery({
    queryKey: ['dailyBusiness', date],
    queryFn: async () => {
      if (!date) return null;
      const { data } = await api.get(`/business/daily?date=${date}`);
      return data as BusinessAnalytics;
    },
    enabled: !!date,
  });
}

export function useYearlyBusiness(year: number | null) {
  return useQuery({
    queryKey: ['yearlyBusiness', year],
    queryFn: async () => {
      if (!year) return null;
      const { data } = await api.get(`/business/yearly?year=${year}`);
      return data as BusinessAnalytics;
    },
    enabled: !!year,
  });
}

export function useOverallBusiness(fetch: boolean) {
  return useQuery({
    queryKey: ['overallBusiness'],
    queryFn: async () => {
      const { data } = await api.get('/business/overall');
      return data as BusinessAnalytics;
    },
    enabled: fetch,
  });
}
