import { UserProfile } from '@/src/models/User';
import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { ProfileTileHeader } from './ProfileTileHeader';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const ProfessionalInformation = ({ userProfile, ...props }: Props) => {
  return (
    <YStack
      theme={'profile_tile'}
      width={'100%'}
      gap={'$4'}
      backgroundColor={'$background'}
      padding="$4"
      borderRadius="$8"
      {...props}
    >
      <ProfileTileHeader title="Professional Information" />
      <ProfileItem
        title="Occupation"
        subtitle={userProfile.professionalInformation?.occupation}
      />
      <ProfileItem
        title="Annual Income"
        subtitle={userProfile.professionalInformation?.annualIncome}
      />
    </YStack>
  );
};
