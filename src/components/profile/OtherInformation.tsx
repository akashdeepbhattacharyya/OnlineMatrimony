import { UserProfile } from '@/src/models/User';
import { YStack, XStack, getToken, ViewProps } from 'tamagui';
import { ProfileItem } from './ProfileItem';
import { Text } from '@/src/components/common/Text';
import DottedDivider from '@/assets/images/dotted-divider.svg';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const OtherInformation = ({ userProfile, ...props }: Props) => {
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
      <Text font="heading" size="normal">
        {`Other Information`}
      </Text>
      <DottedDivider width={'100%'} />
      <ProfileItem title="Diet" subtitle={userProfile.otherInformation.diet} />
      <ProfileItem
        title="Height"
        subtitle={userProfile.otherInformation.height}
      />
      <ProfileItem
        title="Weight"
        subtitle={userProfile.otherInformation.weight}
      />
      <ProfileItem
        title="Religion"
        subtitle={userProfile.otherInformation.religion}
      />
      <ProfileItem
        title="Caste"
        subtitle={userProfile.otherInformation.caste}
      />
      <ProfileItem
        title="Languages"
        subtitle={userProfile.otherInformation.language?.join(', ')}
      />
      <ProfileItem
        title="Marital Status"
        subtitle={userProfile.otherInformation.maritalStatus}
      />
      <ProfileItem
        title="Highest Education"
        subtitle={userProfile.otherInformation.highestEducation}
      />
    </YStack>
  );
};
