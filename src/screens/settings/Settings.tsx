import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { SettingsItem } from '@/src/components/settings/SettingsItems';
import { SettingsItemsSection } from '@/src/components/settings/SettingsItemsSection';
import { TermsAndConditions } from '@/src/components/settings/TermsAndConditions';
import { TabHeader } from '@/src/components/common/TabHeader';

export default function Settings() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
          onPress={() => navigation.navigate('PartnerPreference')}
        />
        <SettingsItem
          title="Notifications"
          onPress={() => navigation.navigate('NotificationSettings')}
        />
        <SettingsItem
          title="Account Settings"
          onPress={() => navigation.navigate('AccountSettings')}
        />
        <SettingsItem
          title="Help & Support"
          onPress={() => console.log('Help & Support pressed')}
        />
        {/* <SettingsItem
          title="Upgrade Subscription & Membership"
          onPress={() => console.log('Upgrade pressed')}
        />
        <SettingsItem
          title="Language"
          value={selectedLanguage}
          onPress={() => console.log('Language pressed')}
        /> */}
      </SettingsItemsSection>

      <TermsAndConditions marginTop={'$8'} padding="$4" />
    </Screen>
  );
}
