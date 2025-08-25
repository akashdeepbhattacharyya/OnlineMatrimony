import { PartnerPreferences, User, UserProfile } from "@/models/User";
import { useCallback, useEffect, useState } from "react";
import { useStoreUser } from "./useStoreUser";
import { useUserRepository } from "@/services/api/repositories/useUserRepository";
import { useSubscriptionRepository } from "@/services/api/repositories/useSubscriptionRepository";
import { Subscription } from "@/models/Subscription";
import { SubscriptionPlan } from "@/models/SubscriptionPlan";
import { useStoreSubscriptionPlans } from "./useStoreSubscriptionPlans";

export const useFetchUserByUserId = () => {
  const { getProfile, getPartnerPreferences } = useUserRepository();
  const { getMySubscription, getSubscriptionPlans } = useSubscriptionRepository();
  const [error, setError] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(undefined);
  const [partnerPreferences, setPartnerPreferences] = useState<PartnerPreferences | undefined>(undefined);
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { storeUser, storeUserProfile, storePartnerPreferences, storeSubscription } = useStoreUser();
  const { storeSubscriptionPlans } = useStoreSubscriptionPlans();

  const onFetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const user = await getProfile();

      setUser(user);
      setUserProfile(user.profile);

      const preferences = await getPartnerPreferences();
      setPartnerPreferences(preferences.preference);

      const subscription = await getMySubscription();
      setSubscription(subscription);

      const subscriptionPlans = await getSubscriptionPlans();
      setSubscriptionPlans(subscriptionPlans);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error fetching user");
    } finally {
      setLoading(false);
    }
  }, [getProfile, getPartnerPreferences, getMySubscription, getSubscriptionPlans]);

  useEffect(() => {
    if (user) {
      storeUser(user);
    }
  }, [storeUser, user]);

  useEffect(() => {
    if (userProfile) {
      storeUserProfile(userProfile);
    }
  }, [storeUserProfile, userProfile]);

  useEffect(() => {
    if (partnerPreferences) {
      storePartnerPreferences(partnerPreferences);
    }
  }, [storePartnerPreferences, partnerPreferences]);

  useEffect(() => {
    if (subscription) {
      storeSubscription(subscription);
    }
  }, [storeSubscription, subscription]);

  useEffect(() => {
    if (subscriptionPlans) {
      storeSubscriptionPlans(subscriptionPlans);
    }
  }, [storeSubscriptionPlans, subscriptionPlans]);

  return { fetchUser: onFetchUser, error, loading, user, profile: userProfile, partnerPreferences, subscription };
};
