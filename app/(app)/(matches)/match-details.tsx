import { ScrollView, YStack } from 'tamagui';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { useUserMatch } from '@/services/hooks/useUserMatch';
import { ProfilePicture } from '@/components/user-profile/ProfilePicture';
import { AboutSelf } from '@/components/user-profile/AboutSelf';
import { PersonalInformation } from '@/components/user-profile/PersonalInformation';
import { MatchPreferences } from '@/components/matches/match-details/MatchPreferences';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { ManageMatch } from '@/components/matches/ManageMatch';
import { MatchCommonBetween } from '@/components/matches/match-details/MatchCommonBetween';
import { router, useLocalSearchParams } from 'expo-router';
import { setSentMatches, setBestMatches } from '@/services/slices/match-slice';
import { Match, SentMatch } from '@/models/Match';

export default function MatchDetails() {
  const { rejectMatch, sendRequest } = useUserMatch();
  const { userProfile } = useAppSelector(state => state.user);
  const { bestMatches, sentMatches } = useAppSelector(state => state.match);
  const { matchId } = useLocalSearchParams<{
    matchId: string;
  }>();
  const dispatch = useAppDispatch();

  const match = bestMatches.find(item => item.matchId === matchId);

  const handleSendRequest = async () => {
    if (match) {
      console.log('Sending match:', match.profileResponse.userId);
      await sendRequest(match.profileResponse.userId);
      // Refresh sent matches after sending
      const sentMatch: SentMatch = { matchId: match.matchId, profile: match.profileResponse };
      const matches = [
        ...sentMatches,
        sentMatch
      ]
      dispatch(setSentMatches(matches));

      // Remove from best matches
      const filteredMatches = bestMatches.filter(item => item.matchId !== matchId);
      dispatch(setBestMatches(filteredMatches));
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
      const rejectedMatch: Match = { ...match, matchStatus: 'REJECTED' };
      const matches = [
        ...bestMatches.filter(item => item.matchId !== match.matchId),
        rejectedMatch
      ]
      // dispatch(setBestMatches(matches));
      // router.back();
    } else {
      console.log('No match to reject');
    }
  };

  return (
    <Screen>
      <ScreenHeader headerText={match?.profileResponse.fullName} />
      <ManageMatch
        onAccept={handleSendRequest}
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
          {match && (
            <YStack key={0} gap={'$4'}>
              <ProfilePicture userProfile={match.profileResponse} />
              <AboutSelf userProfile={match.profileResponse} />
              <PersonalInformation
                userProfile={match.profileResponse}
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
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
