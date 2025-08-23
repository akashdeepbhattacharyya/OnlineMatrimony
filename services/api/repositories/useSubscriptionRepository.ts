import { mapFeatureResponseToFeature, SubscriptionPlanResponse } from '@/models/ApiResponse';
import { handleApiResponse } from '@/utils/handleApiResponse';
import { useHttpClient } from '../useHttpClient';
import { useAuth } from '@/context/AuthContext';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';

export function useSubscriptionRepository() {
  const { token, saveToken } = useAuth();
  const client = useHttpClient({}, token, saveToken);

  const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
    const response: SubscriptionPlanResponse[] = await handleApiResponse(client.get('/subscriptions/plans'));
    return response.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      price: plan.price,
      durationMonths: plan.durationMonths,
      features: mapFeatureResponseToFeature(JSON.parse(plan.features)),
    }));
  };

  const subscribeToPlan = async (planId: string, paymentId: string): Promise<void> => {
    await handleApiResponse(client.post(`/subscriptions/subscribe`, { planId, paymentId }));
  };

  return {
    getSubscriptionPlans,
    subscribeToPlan,
  };
}
