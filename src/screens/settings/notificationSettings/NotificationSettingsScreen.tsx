import { useState } from 'react';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { YStack } from 'tamagui';
import { NotificationItem } from '@/src/components/settings/notifications/NotificationItem';

const notifications = [
  'Message',
  'Profile Updates',
  'New Matches',
  'Notifications',
  'Subscription Renewal',
];

export default function NotificationSettingsScreen() {
  const [toggles, setToggles] = useState(
    notifications.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {} as { [key: string]: boolean }),
  );

  const toggleSwitch = (checked: boolean, key: string) => {
    setToggles(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <Screen>
      <ScreenHeader headerText="Notifications" />
      <YStack padding="$4">
        {notifications.map((item, index) => (
          <NotificationItem
            key={index}
            title={item}
            onCheckedChange={checked => toggleSwitch(checked, item)}
            checked={toggles[item]}
          />
        ))}
      </YStack>
    </Screen>
  );
}
