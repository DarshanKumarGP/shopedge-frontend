import { PaymentOrderRequest } from '../types/payment';

export const validatePaymentOrder = (orderData: PaymentOrderRequest): string | null => {
  if (!orderData.totalAmount || orderData.totalAmount <= 0) {
    return 'Invalid total amount';
  }

  if (!orderData.cartItems || orderData.cartItems.length === 0) {
    return 'Cart is empty';
  }

  for (const item of orderData.cartItems) {
    if (!item.productId || item.productId <= 0) {
      return 'Invalid product ID';
    }
    if (!item.quantity || item.quantity <= 0) {
      return 'Invalid quantity';
    }
    if (!item.price || item.price <= 0) {
      return 'Invalid product price';
    }
  }

  return null;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};
