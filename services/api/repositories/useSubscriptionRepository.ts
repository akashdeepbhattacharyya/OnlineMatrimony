import { mapFeatureResponseToFeature, SubscriptionPlanResponse } from '@/models/ApiResponse';
import { handleApiResponse } from '@/utils/handleApiResponse';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';
import { apiClient } from '../HttpClient';
import { Subscription } from '@/models/Subscription';
import { Order } from '@/models/Order';

export function useSubscriptionRepository() {
  const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
    const response: SubscriptionPlanResponse[] = await handleApiResponse(apiClient.get('/subscriptions/getPlans'));
    return response.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      durationWeeks: plan.durationWeeks,
      features: mapFeatureResponseToFeature(JSON.parse(plan.features)),
    }));
  };

  const subscribeToPlan = async (planId: number, orderId: string, paymentId: string, signature: string): Promise<Subscription> => {
    return await handleApiResponse(apiClient.post(`/subscriptions/subscribe`, { planId, orderId, paymentId, signature }));
  };

  const getMySubscription = async (): Promise<Subscription> => {
    return await handleApiResponse(apiClient.get('/subscriptions/mySubscription'));
  };

  const createOrder = async (planId: number): Promise<Order> => {
    return await handleApiResponse(apiClient.post(`/subscriptions/createOrder/${planId}`));
  };

  return {
    getSubscriptionPlans,
    subscribeToPlan,
    getMySubscription,
    createOrder,
  };
}
