import { Suspense, lazy, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@/src/context/AuthContext';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import FooterNavigator from '../components/common/footer';
import { User } from '../models/User';
import { tabItems } from '../resources/tab-item';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  Otp: { data: { email: string; password: string } };
  ProfileSelection: { data: { email: string; password: string } };
  Settings: undefined;
  Search: undefined;
  PartnerPreference: undefined;
  NotificationSettings: undefined;
  AccountSettings: undefined;
  ContactFilters: undefined;
  HideDeleteProfile: undefined;
  Subscription: undefined;
  Profile: undefined;
  UpdateProfile: { data: User };
  AiMatches: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeScreen = lazy(() => import('../screens/home/HomeScreen'));
const LoginScreen = lazy(() => import('../screens/login/LoginScreen'));
const SignUpScreen = lazy(() => import('../screens/signUp/SignUpScreen'));
const OtpValidationScreen = lazy(
  () => import('../screens/otpValidation/OtpValidationScreen'),
);
const Onboarding = lazy(() => import('../screens/onBoarding/Onboarding'));
const ProfileSelection = lazy(
  () => import('../screens/profileSelection/ProfileSelection'),
);
const SettingsScreen = lazy(() => import('../screens/settings/Settings'));
const SearchScreen = lazy(() => import('../screens/search/SearchScreen'));
const PartnerPreferenceScreen = lazy(
  () => import('../screens/partnerPreference/PartnerPreferenceScreen'),
);
const NotificationSettingsScreen = lazy(
  () => import('../screens/notificationSettings/NotificationSettingsScreen'),
);
const AccountSettingsScreen = lazy(
  () => import('../screens/accountSettings/AccountSettingsScreen'),
);
const ContactFiltersScreen = lazy(
  () => import('../screens/contactFilters/ContactFiltersScreen'),
);
const HideDeleteProfileScreen = lazy(
  () => import('../screens/hideDeleteProfile/HideDeleteProfileScreen'),
);
const SubscriptionScreen = lazy(
  () => import('../screens/subscription/SubscriptionScreen'),
);
const Profile = lazy(() => import('@/src/screens/profile/Profile'));
const UpdateProfile = lazy(() => import('@/src/screens/profile/UpdateProfile'));
const AiMatchesScreen = lazy(
  () => import('@/src/screens/aiMatches/AiMatchesScreen'),
);

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" />
  </View>
);

type RootNavigatorProps = { currentRoute: string };

const RootNavigator = ({ currentRoute }: RootNavigatorProps) => {
  const { user } = useAuth();

  const isActiveTab = useMemo(() => {
    return tabItems.some(item => item.route === currentRoute);
  }, [currentRoute]);

  return (
    <Suspense fallback={<Loading />}>
      <View style={styles.wrapper}>
        <Stack.Navigator
          initialRouteName={user ? 'Home' : 'Onboarding'}
          screenOptions={{ headerShown: false }}
        >
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen
                name="PartnerPreference"
                component={PartnerPreferenceScreen}
              />
              <Stack.Screen
                name="NotificationSettings"
                component={NotificationSettingsScreen}
              />
              <Stack.Screen
                name="AccountSettings"
                component={AccountSettingsScreen}
              />
              <Stack.Screen
                name="ContactFilters"
                component={ContactFiltersScreen}
              />
              <Stack.Screen
                name="HideDeleteProfile"
                component={HideDeleteProfileScreen}
              />
              <Stack.Screen
                name="Subscription"
                component={SubscriptionScreen}
              />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
              <Stack.Screen name="AiMatches" component={AiMatchesScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Otp" component={OtpValidationScreen} />
              <Stack.Screen
                name="ProfileSelection"
                component={ProfileSelection}
              />
            </>
          )}
        </Stack.Navigator>

        {isActiveTab && <FooterNavigator currentRoute={currentRoute} />}
      </View>
    </Suspense>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
