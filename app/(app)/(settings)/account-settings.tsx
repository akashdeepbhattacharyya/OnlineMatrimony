import { YStack } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { AccountSettingsItem } from '@/components/settings/account-settings/AccountSettingsItem';
import { router } from 'expo-router';
import { wipeOutUserData } from '@/services/slices/user-slice';
import * as Storage from "@/services/local-storage";

export default function AccountSettings() {

  const onLogout = async () => {
    wipeOutUserData();
    await Storage.clear();
    router.replace('/get-started');
  };

  const handelOnPress = (label: 'hide_delete_profile' | 'subscription_renewal' | 'logout') => {
    switch (label) {
      case 'hide_delete_profile':
        router.push('/(app)/(settings)/(hide-profile)');
        break;
      case 'subscription_renewal':
        router.push('/(app)/(settings)/(subscription)');
        break;
      case 'logout':
        onLogout();
        break;
    }
  };

  return (
    <Screen>
      <ScreenHeader headerText="Account Settings" />
      <YStack padding="$4">
        <AccountSettingsItem
          title="Hide / Delete Profile"
          onPress={() => handelOnPress('hide_delete_profile')}
        />
        <AccountSettingsItem
          title="Subscription Renewal"
          onPress={() => handelOnPress('subscription_renewal')}
        />
        <AccountSettingsItem
          title="Logout"
          showChevron={false}
          onPress={() => handelOnPress('logout')}
        />
      </YStack>
    </Screen>
  );
}
