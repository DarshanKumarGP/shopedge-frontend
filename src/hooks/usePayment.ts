import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentService } from '../services/paymentService';
import { PaymentOrderRequest, RazorpayResponse, RazorpayOptions } from '../types/payment';
import toast from 'react-hot-toast';

const RAZORPAY_KEY_ID = 'rzp_test_RIFybs9gcoLRhg';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const processPayment = useCallback(async (
    orderData: PaymentOrderRequest,
    userDetails: { name: string; email: string; contact: string }
  ) => {
    if (isProcessing) {
      toast.error('Payment is already in progress');
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create Razorpay order
      toast.loading('Preparing payment...', { id: 'payment-process' });
      
      const razorpayOrderId = await paymentService.createOrder(orderData);
      
      toast.loading('Opening payment gateway...', { id: 'payment-process' });

      // Step 2: Configure Razorpay options
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: Math.round(orderData.totalAmount * 100), // Convert to paise
        currency: 'INR',
        name: 'ShopEdge',
        description: 'Purchase from ShopEdge',
        order_id: razorpayOrderId,
        handler: async (response: RazorpayResponse) => {
          await handlePaymentSuccess(response);
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.contact,
        },
        theme: {
          color: '#6366f1',
        },
        modal: {
          ondismiss: () => {
            toast.dismiss('payment-process');
            setIsProcessing(false);
            toast.error('Payment cancelled');
          },
        },
      };

      // Step 3: Open Razorpay checkout
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded');
      }

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      
      toast.dismiss('payment-process');

    } catch (error) {
      console.error('Payment processing error:', error);
      toast.dismiss('payment-process');
      setIsProcessing(false);
      
      if (error instanceof Error) {
        toast.error(`Payment failed: ${error.message}`);
      } else {
        toast.error('Payment failed. Please try again.');
      }
    }
  }, [isProcessing]);

  const handlePaymentSuccess = async (response: RazorpayResponse) => {
    try {
      toast.loading('Verifying payment...', { id: 'payment-verify' });

      // Step 4: Verify payment on backend
      const verificationResult = await paymentService.verifyPayment({
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      });

      toast.dismiss('payment-verify');

      if (verificationResult) {
        toast.success('Payment successful! 🎉');
        
        // Redirect to success page or customer home
        setTimeout(() => {
          navigate('/customerhome');
        }, 2000);
      } else {
        toast.error('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast.dismiss('payment-verify');
      toast.error('Payment verification failed. Please contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processPayment,
    isProcessing,
  };
};
