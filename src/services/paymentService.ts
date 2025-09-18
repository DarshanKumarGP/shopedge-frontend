import { PaymentOrderRequest, PaymentVerificationRequest } from '../types/payment';

const API_BASE_URL = 'http://localhost:9090';

export const paymentService = {
  /**
   * Creates a Razorpay order on the backend
   * @param orderData - Order data including total amount and cart items
   * @returns Promise<string> - Razorpay order ID
   */
  createOrder: async (orderData: PaymentOrderRequest): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create order: ${errorText}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  },

  /**
   * Verifies payment with Razorpay response
   * @param verificationData - Razorpay response data
   * @returns Promise<boolean> - Whether verification was successful
   */
  verifyPayment: async (verificationData: PaymentVerificationRequest): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(verificationData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Payment verification failed:', errorText);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  },
};
