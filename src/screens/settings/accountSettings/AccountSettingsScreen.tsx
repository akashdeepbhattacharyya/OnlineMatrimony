import { StyleSheet } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { YStack } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { AccountSettingsItem } from '@/src/components/settings/account-settings/AccountSettingsItem';

export default function AccountSettingsScreen() {
  const { clearSession } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handelOnPress = (label: string) => {
    switch (label) {
      case 'Contact Filters':
        navigation.navigate('ContactFilters');
        break;
      case 'Hide / Delete Profile':
        navigation.navigate('HideDeleteProfile');
        break;
      case 'Subscription Renewal':
        navigation.navigate('Subscription');
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
          title="Contact Filters"
          onPress={() => handelOnPress('Contact Filters')}
        />
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
