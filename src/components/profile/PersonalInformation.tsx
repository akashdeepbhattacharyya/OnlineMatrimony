import { User } from '@/src/models/User';
import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { ProfileTileHeader } from '../common/ProfileTileHeader';
import { genders } from '@/src/resources/gender';
import { cities, states } from '@/src/resources/city-state';

type Props = {
  userData: User;
} & ViewProps;

export const PersonalInformation = ({ userData, ...props }: Props) => {
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
      <ProfileItem title="Full Name" subtitle={userData.profile.fullName} />
      <ProfileItem
        title="Date of Birth"
        subtitle={userData.profile.dateOfBirth || 'N/A'}
      />
      <ProfileItem
        title="Gender"
        subtitle={genders[userData.profile.gender as keyof typeof genders]}
      />
      <ProfileItem
        title="Address"
        subtitle={
          [
            cities[userData.profile.city as keyof typeof cities],
            states[userData.profile.state as keyof typeof states],
            `India`,
          ]
            .filter(Boolean)
            .join(', ') +
          (userData.profile.pincode ? ` - ${userData.profile.pincode}` : '')
        }
      />
      <ProfileItem title="Phone" subtitle={userData.phone || 'N/A'} />
    </YStack>
  );
};
