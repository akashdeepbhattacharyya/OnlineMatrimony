import { YStack, ViewProps } from 'tamagui';
import { Text } from '@/components/common/Text';
import { TileHeader } from '../common/TileHeader';
import { UserProfile } from '@/models/User';

type Props = {
  userProfile: UserProfile;
} & ViewProps;

export const AboutSelf = ({ userProfile, ...props }: Props) => {
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
      <TileHeader title={`About ${userProfile.fullName}`} />
      <Text font="heading" size="normal">
        {userProfile.aboutMe || 'No information provided.'}
      </Text>
    </YStack>
  );
};
