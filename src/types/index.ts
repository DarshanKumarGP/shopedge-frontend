// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  badge?: 'bestseller' | 'new' | 'sale';
  category: string;
  inStock: boolean;
  stockCount?: number;
  features?: string[];
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description?: string;
  parentId?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier?: number;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

// Special Offers Types
export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  link: string;
  validUntil: Date;
  backgroundColor: string;
}

// Hero Slide Types
export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
}
