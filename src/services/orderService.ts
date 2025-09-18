import { OrdersResponse, OrderStats } from '../types/order.types';

class OrderService {
  private readonly baseURL = 'http://localhost:9090';

  /**
   * Fetch user orders with full error handling
   */
  async fetchOrders(): Promise<OrdersResponse> {
    try {
      const response = await fetch(`${this.baseURL}/api/orders`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please login to view your orders');
        } else if (response.status === 404) {
          throw new Error('No orders found');
        } else {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }
      }

      const data: OrdersResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error while fetching orders');
    }
  }

  /**
   * Fetch order statistics
   */
  async fetchOrderStats(): Promise<OrderStats> {
    try {
      const response = await fetch(`${this.baseURL}/api/orders/stats`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order statistics');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching order stats:', error);
      return { total_orders: 0, total_spending: 0 };
    }
  }

  /**
   * Refresh order data
   */
  async refreshOrders(): Promise<OrdersResponse> {
    return this.fetchOrders();
  }
}

export const orderService = new OrderService();
