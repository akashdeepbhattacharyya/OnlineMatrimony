import { PartnerPreferences, User, UserProfile } from "@/models/User";
import { useCallback, useEffect, useState } from "react";
import { useStoreUser } from "./useStoreUser";
import { useUserRepository } from "@/services/api/repositories/useUserRepository";
import { useSubscriptionRepository } from "@/services/api/repositories/useSubscriptionRepository";
import { Subscription } from "@/models/Subscription";

export const useFetchUserByUserId = () => {
  const { getProfile, getPartnerPreferences } = useUserRepository();
  const { getMySubscription } = useSubscriptionRepository();
  const [error, setError] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(undefined);
  const [partnerPreferences, setPartnerPreferences] = useState<PartnerPreferences | undefined>(undefined);
  const [subscription, setSubscription] = useState<Subscription | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { storeUser, storeUserProfile, storePartnerPreferences, storeSubscription } = useStoreUser();

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
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error fetching user");
    } finally {
      setLoading(false);
    }
  }, [getProfile, getPartnerPreferences, getMySubscription]);

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

  return { fetchUser: onFetchUser, error, loading, user, profile: userProfile, partnerPreferences, subscription };
};
