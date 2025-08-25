import React from 'react';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { SettingsItem } from '@/components/settings/SettingsItems';
import { SettingsItemsSection } from '@/components/settings/SettingsItemsSection';
import { TermsAndConditions } from '@/components/settings/TermsAndConditions';
import { TabHeader } from '@/components/common/TabHeader';
import { router } from 'expo-router';

export default function Settings() {
  return (
    <Screen>
      <TabHeader headerText="Settings" />
      <SettingsItemsSection
        title="Options & Settings"
        marginTop={'$2'}
        padding={'$4'}
      >
        <SettingsItem
          title="Partner Preferences"
          onPress={() =>
            router.push({
              pathname: "/(app)/(settings)/partner-preferences",
              params: { purpose: 'UPDATE' },
            })
          }
        />
        {/* <SettingsItem
          title="Notifications"
          onPress={() => router.push({
            pathname: "/(app)/(settings)/notification-settings",
          })}
        /> */}
        <SettingsItem
          title="Account Settings"
          onPress={() => router.push({
            pathname: "/(app)/(settings)/account-settings",
          })}
        />
        <SettingsItem
          title="Help & Support"
          onPress={() => console.log('Help & Support pressed')}
        />
        <SettingsItem
          title="Upgrade Subscription & Membership"
          onPress={() => router.push({
            pathname: "/(app)/(settings)/(subscription)",
          })}
        />
        {/* <SettingsItem
          title="Language"
          value={selectedLanguage}
          onPress={() => console.log('Language pressed')}
        /> */}
      </SettingsItemsSection>

      <TermsAndConditions marginTop={'$8'} padding="$4" />
    </Screen>
  );
}
