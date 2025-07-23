import { UserProfile } from '@/src/models/User';
import { YStack, XStack, getToken, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { Text } from '@/src/components/common/Text';
import DottedDivider from '@/assets/images/dotted-divider.svg';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const PersonalInformation = ({ userProfile, ...props }: Props) => {
  return (
    <YStack
      theme={'profile_tile'}
      width={'100%'}
      gap={'$4'}
      backgroundColor={"$background"}
      padding="$4"
      borderRadius="$8"
      {...props}
    >
      <Text font="heading" size="normal">
        {`Personal Information`}
      </Text>
      <DottedDivider width={'100%'} />
      <ProfileItem
        title="Full Name"
        subtitle={userProfile.personalInformation.fullName}
      />
      <ProfileItem
        title="Date of Birth"
        subtitle={userProfile.personalInformation.dateOfBirth}
      />
      <ProfileItem
        title="Gender"
        subtitle={
          userProfile.gender.charAt(0).toUpperCase() +
          userProfile.gender.slice(1)
        }
      />
      <ProfileItem title="Address" subtitle={userProfile.address} />
      <ProfileItem title="Phone" subtitle={userProfile.phoneNumber} />
    </YStack>
  );
};
