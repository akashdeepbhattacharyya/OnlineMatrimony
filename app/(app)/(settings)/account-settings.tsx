import { useAuth } from '@/context/AuthContext';
import { YStack } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { AccountSettingsItem } from '@/components/settings/account-settings/AccountSettingsItem';
import { router } from 'expo-router';

export default function AccountSettings() {
  const { clearSession } = useAuth();

  const handelOnPress = (label: string) => {
    switch (label) {
      case 'Hide / Delete Profile':
        router.push('HideDeleteProfile');
        break;
      case 'Subscription Renewal':
        router.push('Subscription');
        break;
      case 'Logout':
        clearSession();
        break;
      default:
        console.log(`${label} pressed`);
    }
  };

  return (
    <Screen>
      <ScreenHeader headerText="Account Settings" />
      <YStack padding="$4">
        <AccountSettingsItem
          title="Hide / Delete Profile"
          onPress={() => handelOnPress('Hide / Delete Profile')}
        />
        <AccountSettingsItem
          title="Subscription Renewal"
          onPress={() => handelOnPress('Subscription Renewal')}
        />
        <AccountSettingsItem
          title="Logout"
          showChevron={false}
          onPress={() => handelOnPress('Logout')}
        />
      </YStack>
    </Screen>
  );
}
