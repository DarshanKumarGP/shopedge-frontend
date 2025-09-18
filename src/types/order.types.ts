export interface OrderProduct {
  order_id: string;
  product_id: number;
  name: string;
  description: string;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  image_url: string | null;
}

export interface OrdersResponse {
  username: string;
  role: string;
  orders: {
    products: OrderProduct[];
  };
}

export interface OrdersState {
  orders: OrderProduct[];
  loading: boolean;
  error: string | null;
  username: string;
  totalOrders: number;
  totalSpent: number;
}

export interface OrderStats {
  total_orders: number;
  total_spending: number;
}

export interface OrderFilters {
  searchTerm: string;
  sortBy: 'date' | 'amount' | 'name';
  sortOrder: 'asc' | 'desc';
}
