import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from '../../profile/ProfileItem';
import { TileHeader } from '../../common/TileHeader';
import { genders } from '@/src/resources/gender';
import { cities, states } from '@/src/resources/city-state';
import { formatDateString } from '@/src/utils/dateFormatter';
import { MatchedUserProfile } from '@/src/models/Match';

type Props = {
  matchedUserProfile: MatchedUserProfile;
} & ViewProps;

export const MatchPersonalInformation = ({
  matchedUserProfile,
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
            matchedUserProfile.dateOfBirth,
            'yyyy-MM-dd',
            'MMMM d, yyyy',
          ) || 'N/A'
        }
      />
      <ProfileItem
        title="Gender"
        subtitle={genders[matchedUserProfile.gender as keyof typeof genders]}
      />
      <ProfileItem
        title="Address"
        subtitle={
          [
            matchedUserProfile.city
              ? cities[matchedUserProfile.city as keyof typeof cities]
              : undefined,
            matchedUserProfile.state
              ? states[matchedUserProfile.state as keyof typeof states]
              : undefined,
            `India`,
          ]
            .filter(Boolean)
            .join(', ') +
          (matchedUserProfile.pincode ? ` - ${matchedUserProfile.pincode}` : '')
        }
      />
    </YStack>
  );
};
