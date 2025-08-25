import { mapFeatureResponseToFeature, SubscriptionPlanResponse } from '@/models/ApiResponse';
import { handleApiResponse } from '@/utils/handleApiResponse';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';
import { apiClient } from '../HttpClient';
import { Subscription } from '@/models/Subscription';

export function useSubscriptionRepository() {
  const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
    const response: SubscriptionPlanResponse[] = await handleApiResponse(apiClient.get('/subscriptions/getPlans'));
    return response.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      durationMonths: plan.durationMonths,
      features: mapFeatureResponseToFeature(JSON.parse(plan.features)),
    }));
  };

  const subscribeToPlan = async (planId: string, paymentId: string): Promise<Subscription> => {
    return await handleApiResponse(apiClient.post(`/subscriptions/subscribe`, { planId, paymentId }));
  };

  const getMySubscription = async (): Promise<Subscription> => {
    return await handleApiResponse(apiClient.get('/subscriptions/mySubscription'));
  };

  return {
    getSubscriptionPlans,
    subscribeToPlan,
    getMySubscription,
  };
}
