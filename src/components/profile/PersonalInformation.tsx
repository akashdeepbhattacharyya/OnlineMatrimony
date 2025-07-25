import { UserProfile } from '@/src/models/User';
import { YStack, XStack, getToken, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { Text } from '@/src/components/common/Text';
import DottedDivider from '@/assets/images/dotted-divider.svg';
import { ProfileTileHeader } from './ProfileTileHeader';
import { genders } from '@/src/resources/gender';
import { cities, states } from '@/src/resources/update-profile';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const PersonalInformation = ({ userProfile, ...props }: Props) => {
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
      <ProfileTileHeader title="Personal Information" />
      <ProfileItem title="Full Name" subtitle={userProfile.fullName} />
      <ProfileItem title="Date of Birth" subtitle={userProfile.dateOfBirth} />
      <ProfileItem
        title="Gender"
        subtitle={genders[userProfile.gender as keyof typeof genders]}
      />
      <ProfileItem
        title="Address"
        subtitle={[
          cities[userProfile.city as keyof typeof cities],
          states[userProfile.state as keyof typeof states],
          userProfile.country,
          userProfile.pincode,
        ]
          .filter(Boolean)
          .join(', ')}
      />
      <ProfileItem title="Phone" subtitle={userProfile.phoneNumber} />
    </YStack>
  );
};
