import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useAppSelector } from "@/services/store/hook";
import { isPartnerPreferencesUpdated, isUserProfileUpdated } from "@/models/User";

export type OnboardingState = {
  showUserProfile: boolean;
  showPartnerPreferences: boolean;
  showSubscription: boolean;
  showTabs: boolean;
};

const Onboarding = () => {
  const { userProfile, partnerPreferences, subscription } = useAppSelector((state) => state.user);

  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    showUserProfile: false,
    showPartnerPreferences: false,
    showSubscription: false,
    showTabs: false,
  });

  const userProfileUpdated: boolean = isUserProfileUpdated(userProfile);
  const partnerPreferencesUpdated: boolean = isPartnerPreferencesUpdated(partnerPreferences);
  const hasSubscription: boolean = !!subscription;

  useEffect(() => {
    setOnboardingState({
      showUserProfile: !userProfileUpdated,
      showPartnerPreferences: !partnerPreferencesUpdated,
      showSubscription: !hasSubscription,
      showTabs: userProfileUpdated && partnerPreferencesUpdated && hasSubscription,
    });
  }, [setOnboardingState, userProfileUpdated, partnerPreferencesUpdated, hasSubscription]);

  if (onboardingState.showUserProfile) {
    return (
      <Redirect
        href={{
          pathname: '/(app)/(profile)/(update)',
          params: { purpose: 'ONBOARDING' },

        }}
      />
    );
  } else if (onboardingState.showPartnerPreferences) {
    return (
      <Redirect
        href={{
          pathname: "/(app)/(settings)/partner-preferences",
          params: {
            source: "ONBOARDING",
          },
        }}
      />
    );
  } else if (onboardingState.showSubscription) {
    return (
      <Redirect
        href={{
          pathname: '/(auth)/purchase-subscription',
        }}
      />
    );
  } else if (onboardingState.showTabs) {
    return <Redirect href="/(app)/(tabs)" />;
  } else {
    return <ActivityIndicator />;
  }
};

export default Onboarding;
