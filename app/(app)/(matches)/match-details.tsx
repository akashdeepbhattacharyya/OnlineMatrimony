import { ScrollView, View, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { useUserMatch } from '@/services/hooks/useUserMatch';
import { MatchProfilePicture } from '@/components/matches/match-details/MatchProfilePicture';
import { MatchAboutSelf } from '@/components/matches/match-details/MatchAboutSelf';
import { MatchPersonalInformation } from '@/components/matches/match-details/MatchPersonalInformation';
import { MatchPreferences } from '@/components/matches/match-details/MatchPreferences';
import { useAppSelector } from '@/services/store/hook';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { ManageMatch } from '@/components/matches/ManageMatch';
import { MatchCommonBetween } from '@/components/matches/match-details/MatchCommonBetween';
import { router, useLocalSearchParams } from 'expo-router';

export default function MatchDetails() {
  const { acceptMatch, rejectMatch } = useUserMatch();
  const { userProfile } = useAppSelector(state => state.user);
  const { bestMatches } = useAppSelector(state => state.match);
  const { matchId } = useLocalSearchParams<{
    matchId: string;
  }>();

  const match = bestMatches.find(item => item.matchId === matchId);

  const handleAcceptMatch = async () => {
    if (match) {
      console.log('Accepting match:', match.matchId);
      await acceptMatch(match.matchId);
      // Refresh best matches after accepting
      router.back();
    } else {
      console.log('No match to accept');
    }
  };

  const handleRejectMatch = async () => {
    if (match) {
      console.log('Rejecting match:', match.matchId);
      await rejectMatch(match.matchId);
      // Refresh best matches after rejecting
      router.back();
    } else {
      console.log('No match to reject');
    }
  };

  return (
    <Screen>
      <ScreenHeader headerText={match?.profileResponse.fullName} />
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
                currentUserProfile={userProfile}
              />
              <MatchCommonBetween
                matchedUserProfile={match.profileResponse}
                currentUserProfile={userProfile}
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
