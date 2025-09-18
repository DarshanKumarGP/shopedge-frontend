import { useState, useEffect, useCallback } from 'react';
import { OrdersState, OrderProduct, OrderFilters } from '../types/order.types';
import { orderService } from '../services/orderService';

export const useOrders = () => {
  const [state, setState] = useState<OrdersState>({
    orders: [],
    loading: true,
    error: null,
    username: '',
    totalOrders: 0,
    totalSpent: 0,
  });

  const [filters, setFilters] = useState<OrderFilters>({
    searchTerm: '',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  /**
   * Fetch orders from the API
   */
  const fetchOrders = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const [ordersData, statsData] = await Promise.all([
        orderService.fetchOrders(),
        orderService.fetchOrderStats(),
      ]);

      setState(prev => ({
        ...prev,
        orders: ordersData.orders?.products || [],
        username: ordersData.username || 'Guest',
        totalOrders: statsData.total_orders,
        totalSpent: statsData.total_spending,
        loading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch orders',
      }));
    }
  }, []);

  /**
   * Filter and sort orders based on current filters
   */
  const filteredOrders = useCallback(() => {
    let filtered = [...state.orders];

    // Search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(order =>
        order.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        order.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        order.order_id.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'amount':
          comparison = a.total_price - b.total_price;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = a.order_id.localeCompare(b.order_id);
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [state.orders, filters]);

  /**
   * Refresh orders data
   */
  const refreshOrders = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters: Partial<OrderFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      sortBy: 'date',
      sortOrder: 'desc',
    });
  }, []);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    ...state,
    filteredOrders: filteredOrders(),
    filters,
    updateFilters,
    clearFilters,
    refreshOrders,
    hasOrders: state.orders.length > 0,
    hasFilteredResults: filteredOrders().length > 0,
  };
};
