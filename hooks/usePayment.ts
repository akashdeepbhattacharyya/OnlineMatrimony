import RazorpayCheckout from 'react-native-razorpay';
import Constants from 'expo-constants';
import { useState } from 'react';

type PaymentOptions = {
  description: string;
  amount: number;
  prefill: {
    email?: string;
    contact?: string;
    name?: string;
  };
};

var key = Constants.expoConfig?.extra?.keys.RAZORPAY_KEY;

type PaymentFailure = {
  description: string;
};

type PaymentSuccess = {
  id: string;
};

export const usePayment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState<PaymentSuccess | undefined>(undefined);
  const [paymentFailure, setPaymentFailure] = useState<PaymentFailure | undefined>(undefined);

  const initiatePayment = async (paymentOptions: PaymentOptions) => {
    const options = {
      description: paymentOptions.description,
      currency: 'INR',
      key: key,
      amount: paymentOptions.amount * 100, // Convert to paise
      name: 'Dhol',
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
        setPaymentSuccess({ id: data.razorpay_payment_id });
      })
      .catch((error: any) => {
        setPaymentFailure({ description: error.description });
      });
  };

  return { initiatePayment, paymentSuccess, paymentFailure };
};
