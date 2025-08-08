import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { YStack } from 'tamagui';
import { HideDeleteProfileItem } from '@/src/components/settings/account-settings/hide-delete-profile/HideDeleteProfileItem';
import { DottedDivider } from '@/src/components/common/DottedDivider';

const HideDeleteProfileScreen = () => {
  return (
    <Screen>
      <ScreenHeader headerText="Hide / Delete Profile" />
      <YStack padding="$4" gap="$8">
        <HideDeleteProfileItem
          title="Hide Profile"
          subTitle="Your Profile Is Currently Visible"
          description="When you hide your profile, you will not be visible on dhol matrimony. You will neither be able to send invitations nor messages"
          buttonTitle="Hide"
          onPress={() => {}}
        />
        <DottedDivider />
        <HideDeleteProfileItem
          title="Delete Profile"
          subTitle="Delete Your Profile"
          description="You will permanently lose all profile information, match information and paid memberships"
          buttonTitle="Delete"
          onPress={() => {}}
        />
      </YStack>
    </Screen>
  );
};

export default HideDeleteProfileScreen;
