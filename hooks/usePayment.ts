import RazorpayCheckout from 'react-native-razorpay';
import Constants from 'expo-constants';
import { useCallback, useState } from 'react';

type PaymentOptions = {
  description: string;
  amount: number;
  prefill: {
    email?: string;
    contact?: string;
    name?: string;
  };
  orderId: string;
};

const key = Constants.expoConfig?.extra?.keys.RAZORPAY_KEY;

type PaymentFailure = {
  description: string;
};

type PaymentSuccess = {
  paymentId: string;
  orderId: string;
  signature: string;
};

export const usePayment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState<PaymentSuccess | undefined>(undefined);
  const [paymentFailure, setPaymentFailure] = useState<PaymentFailure | undefined>(undefined);

  const initiatePayment = useCallback(async (paymentOptions: PaymentOptions) => {
    setPaymentSuccess(undefined);
    setPaymentFailure(undefined);
    
    const options = {
      description: paymentOptions.description,
      currency: 'INR',
      key: key,
      amount: paymentOptions.amount * 100, // Convert to paise
      name: 'Dhol',
      order_id: paymentOptions.orderId,
      prefill: {
        email: paymentOptions.prefill.email,
        contact: paymentOptions.prefill.contact,
        name: paymentOptions.prefill.name,
      },
      theme: {
        color: '#F37254',
      },
    };

    RazorpayCheckout.open(options)
      .then((data: any) => {
        setPaymentSuccess({ orderId: data.razorpay_order_id, paymentId: data.razorpay_payment_id, signature: data.razorpay_signature });
      })
      .catch((error: any) => {
        setPaymentFailure({ description: error.description });
      });
  }, []);

  return { initiatePayment, paymentSuccess, paymentFailure };
};
