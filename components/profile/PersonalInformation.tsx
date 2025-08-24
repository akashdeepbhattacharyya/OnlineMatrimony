import { User, UserProfile } from '@/models/User';
import { YStack, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { TileHeader } from '../common/TileHeader';
import { genders } from '@/resources/gender';
import { cities, states } from '@/resources/city-state';

type Props = {
  userProfile: UserProfile;
  phone: string;
} & ViewProps;

export const PersonalInformation = ({ userProfile, phone, ...props }: Props) => {
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
      <ProfileItem title="Full Name" subtitle={userProfile.fullName} />
      <ProfileItem
        title="Age"
        subtitle={
          userProfile.age ? `${userProfile.age} years` : 'N/A'
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
            cities[userProfile.city as keyof typeof cities],
            states[userProfile.state as keyof typeof states],
            `India`,
          ]
            .filter(Boolean)
            .join(', ') +
          (userProfile.pincode ? ` - ${userProfile.pincode}` : '')
        }
      />
      <ProfileItem title="Phone" subtitle={phone || 'N/A'} />
    </YStack>
  );
};
