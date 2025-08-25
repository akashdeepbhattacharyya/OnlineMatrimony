import { useCallback } from "react";
import { useAppDispatch } from "@/services/store/hook";
import { SubscriptionPlan } from "@/models/SubscriptionPlan";
import { setSubscriptionPlans } from "@/services/slices/subscription-plan-slice";

export const useStoreSubscriptionPlans = () => {
  const dispatch = useAppDispatch();

  const storeSubscriptionPlans = useCallback(
    async (subscriptionPlans: SubscriptionPlan[]) => {
      console.log("Storing subscription plans:", subscriptionPlans);
      dispatch(setSubscriptionPlans(subscriptionPlans));
    },
    [dispatch],
  );

  return { storeSubscriptionPlans };
};
