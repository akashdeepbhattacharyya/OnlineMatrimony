import { ScrollView, View, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { useUserMatch } from '@/src/hooks/useUserMatch';
import { MatchProfilePicture } from '@/src/components/matches/match-details/MatchProfilePicture';
import { MatchAboutSelf } from '@/src/components/matches/match-details/MatchAboutSelf';
import { MatchPersonalInformation } from '@/src/components/matches/match-details/MatchPersonalInformation';
import { MatchPreferences } from '@/src/components/matches/match-details/MatchPreferences';
import { useAppSelector } from '@/src/services/store/hook';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { ManageMatch } from '@/src/components/navigation/ManageMatch';

type Props = {
  route: RouteProp<RootStackParamList, 'MatchDetails'>;
};

export default function MatchDetailsScreen({
  route: {
    params: {
      data: { match },
    },
  },
}: Props) {
  const { acceptMatch, rejectMatch } = useUserMatch();
  const { userData } = useAppSelector(state => state.user);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAcceptMatch = async () => {
    if (match) {
      console.log('Accepting match:', match.id);
      await acceptMatch(match.id);
      // Refresh best matches after accepting
      navigation.goBack();
    } else {
      console.log('No match to accept');
    }
  };

  const handleRejectMatch = async () => {
    if (match) {
      console.log('Rejecting match:', match.id);
      await rejectMatch(match.id);
      // Refresh best matches after rejecting
      navigation.goBack();
    } else {
      console.log('No match to reject');
    }
  };

  return (
    <Screen>
      <ScreenHeader headerText={match.profileResponse.fullName} />
      <ManageMatch
        onAccept={handleAcceptMatch}
        onReject={handleRejectMatch}
        position="absolute"
        bottom={'$0'}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1} marginBottom={'$11'} paddingHorizontal={'$4'}>
          {match ? (
            <YStack key={0} gap={'$4'}>
              <MatchProfilePicture matchedUserProfile={match.profileResponse} />
              <MatchAboutSelf matchedUserProfile={match.profileResponse} />
              <MatchPersonalInformation
                matchedUserProfile={match.profileResponse}
              />
              <MatchPreferences
                match={match}
                currentUserProfile={userData.profile}
              />
            </YStack>
          ) : (
            <View
              justifyContent="center"
              alignItems="center"
              width={'100%'}
              height={'100%'}
            >
              <Text
                font="heading"
                size="large"
                color="$text"
                textAlign="center"
                padding={'$4'}
              >
                {`No matches found. \nPlease update your profile and partner preferences.`}
              </Text>
            </View>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
