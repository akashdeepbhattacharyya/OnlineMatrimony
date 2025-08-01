import { YStack, ViewProps, XStack, View, Image, getToken } from 'tamagui';
import { TileHeader } from '../common/ProfileTileHeader';
import { Match } from '@/src/models/Match';
import { Text } from '../common/Text';
import { UserProfile } from '@/src/models/User';
import MatchBlob from '@/assets/images/match.svg';
import { toUri } from '@/src/utils/utils';

type Props = {
  match: Match;
  currentUserProfile: UserProfile;
} & ViewProps;

export const MatchPreferences = ({
  match,
  currentUserProfile,
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
      <View
        alignItems="center"
        padding="$4.5"
        backgroundColor={getToken('$color.button_bg_red')}
        borderRadius="$8"
      >
        <YStack gap={'$2'} alignItems="center">
          <Text font="headingBold" size="normal">
            {`You And ${
              match.matchedUserProfile.gender === 'FEMALE' ? 'Her' : 'Him'
            }`}
          </Text>
          <View alignItems="center" justifyContent="center" height={94}>
            <XStack gap={'$4'} position="absolute">
              <Image
                source={{
                  uri: toUri(
                    currentUserProfile.fullName,
                    // currentUserProfile.primaryPhotoUrl,
                  ),
                }}
                style={{ width: 94, height: 94, borderRadius: 47 }}
              />
              <Image
                source={{
                  uri: toUri(
                    match.matchedUserProfile.fullName,
                    match.matchedUserProfile.primaryPhotoUrl,
                  ),
                }}
                style={{ width: 94, height: 94, borderRadius: 47 }}
              />
            </XStack>
            <MatchBlob />
          </View>
        </YStack>
      </View>
      <TileHeader
        title={`You Match ${match.matchScore}/12 Of ${
          match.matchedUserProfile.gender === 'FEMALE' ? 'Her' : 'Him'
        } Preferences`}
      />
    </YStack>
  );
};
