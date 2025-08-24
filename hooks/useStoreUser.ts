import { useCallback } from "react";
import * as Storage from "@/services/local-storage";
import { PartnerPreferences, User, UserProfile } from "@/models/User";
import { setUserId, setEmail, setPhone, setPartnerPreferences, setUserProfile, setSubscription } from "@/services/slices/user-slice";
import { Subscription } from "@/models/Subscription";
import { useAppDispatch } from "@/services/store/hook";
import { Token } from "@/models/Authentication";

export const useStoreUser = () => {
  const dispatch = useAppDispatch();

  const storeUser = useCallback(
    async (user: User, token?: Token) => {
      if (__DEV__) {
        console.log("userId", user.id);
      }
      await Storage.setUserIdAndToken(String(user.id), token);
      dispatch(setUserId(user.id));
      dispatch(setEmail(user.email));
      dispatch(setPhone(user.phone));
    },
    [
      dispatch,
      setEmail,
      setPhone,
      setUserId,
    ],
  );

  const storePartnerPreferences = useCallback(
    async (partnerPreferences: PartnerPreferences) => {
      dispatch(setPartnerPreferences(partnerPreferences));
    },
    [
      dispatch,
      setPartnerPreferences,
    ],
  );

  const storeUserProfile = useCallback(
    async (userProfile: UserProfile) => {
      dispatch(setUserProfile(userProfile));
    },
    [
      dispatch,
      setUserProfile,
    ],
  );

  const storeSubscription = useCallback(
    async (subscription: Subscription) => {
      dispatch(setSubscription(subscription));
    },
    [
      dispatch,
      setSubscription,
    ],
  );

  return { storeUser, storePartnerPreferences, storeUserProfile, storeSubscription };
};
