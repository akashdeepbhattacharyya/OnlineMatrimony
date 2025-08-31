import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { YStack } from 'tamagui';
import { HideDeleteProfileItem } from '@/components/settings/account-settings/hide-delete-profile/HideDeleteProfileItem';
import { DottedDivider } from '@/components/common/DottedDivider';
import { useStoreUser } from '@/hooks/useStoreUser';
import { useAppSelector } from '@/services/store/hook';
import { useUserRepository } from '@/services/api/repositories/useUserRepository';

const HideDeleteProfileScreen = () => {
  const { userProfile } = useAppSelector(state => state.user);
  const { hideProfile } = useUserRepository();
  const { storeUserProfile } = useStoreUser();

  const handleHideProfile = async () => {
    const response = await hideProfile();
    if (response) {
      const updatedProfile = { ...userProfile, isHidden: !userProfile.isHidden };
      // Dispatch an action to update the user profile in the store
      storeUserProfile(updatedProfile);
    }
  };

  return (
    <Screen>
      <ScreenHeader headerText="Hide Profile" />
      <YStack padding="$4" gap="$8">
        <HideDeleteProfileItem
          title={userProfile.isHidden ? "Unhide Profile" : "Hide Profile"}
          subTitle={userProfile.isHidden ? "Your Profile Is Currently Hidden" : "Your Profile Is Currently Visible"}
          description="When you hide your profile, you will not be visible on dhol matrimony. You will neither be able to send invitations nor messages"
          buttonTitle={userProfile.isHidden ? "Unhide" : "Hide"}
          onPress={handleHideProfile}
        />
        <DottedDivider />
        {/* <HideDeleteProfileItem
          title="Delete Profile"
          subTitle="Delete Your Profile"
          description="You will permanently lose all profile information, match information and paid memberships"
          buttonTitle="Delete"
          onPress={() => { }}
        /> */}
      </YStack>
    </Screen>
  );
};

export default HideDeleteProfileScreen;
