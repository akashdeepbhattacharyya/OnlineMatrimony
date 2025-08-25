import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from '../profile/ProfileItem';
import { TileHeader } from '../common/TileHeader';
import { genders } from '@/resources/gender';
import { cities, states } from '@/resources/city-state';
import { formatDateString } from '@/utils/dateFormatter';
import { UserProfile } from '@/models/User';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const PersonalInformation = ({
  userProfile,
  ...props
}: Props) => {
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
      <TileHeader title="Personal Information" />
      <ProfileItem
        title="Date of Birth"
        subtitle={
          formatDateString(
            userProfile.dateOfBirth,
            'yyyy-MM-dd',
            'MMMM d, yyyy',
          ) || 'N/A'
        }
      />
      <ProfileItem
        title="Gender"
        subtitle={genders[userProfile.gender as keyof typeof genders]}
      />
      <ProfileItem
        title="Address"
        subtitle={
          [
            userProfile.city
              ? cities[userProfile.city as keyof typeof cities]
              : undefined,
            userProfile.state
              ? states[userProfile.state as keyof typeof states]
              : undefined,
            `India`,
          ]
            .filter(Boolean)
            .join(', ') +
          (userProfile.pincode ? ` - ${userProfile.pincode}` : '')
        }
      />
    </YStack>
  );
};
