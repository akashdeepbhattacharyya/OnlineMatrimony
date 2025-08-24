import { YStack, ViewProps } from 'tamagui';
import { Text } from '@/components/common/Text';
import { TileHeader } from '../../common/TileHeader';
import { MatchedUserProfile } from '@/models/Match';

type Props = {
  matchedUserProfile: MatchedUserProfile;
} & ViewProps;

export const MatchAboutSelf = ({ matchedUserProfile, ...props }: Props) => {
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
      <TileHeader title={`About ${matchedUserProfile.fullName}`} />
      <Text font="heading" size="normal">
        {matchedUserProfile.aboutMe || 'No information provided.'}
      </Text>
    </YStack>
  );
};
