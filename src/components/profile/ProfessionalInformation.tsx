import { UserProfile } from '@/src/models/User';
import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { ProfileTileHeader } from './ProfileTileHeader';
import { occupations } from '@/src/resources/update-profile';

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
        subtitle={
          occupations[userProfile.occupation as keyof typeof occupations]
        }
      />
      <ProfileItem title="Annual Income" subtitle={userProfile.annualIncome} />
    </YStack>
  );
};
