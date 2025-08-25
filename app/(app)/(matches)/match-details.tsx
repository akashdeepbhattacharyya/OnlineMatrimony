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
import { setBestMatches } from '@/services/slices/match-slice';
import { Match } from '@/models/Match';

export default function MatchDetails() {
  const { acceptMatch, rejectMatch } = useUserMatch();
  const { userProfile } = useAppSelector(state => state.user);
  const { bestMatches } = useAppSelector(state => state.match);
  const { matchId } = useLocalSearchParams<{
    matchId: string;
  }>();
  const dispatch = useAppDispatch();

  const match = bestMatches.find(item => item.matchId === matchId);

  const handleAcceptMatch = async () => {
    if (match) {
      console.log('Accepting match:', match.matchId);
      await acceptMatch(match.matchId);
      // Refresh best matches after accepting
      const acceptedMatch: Match = { ...match, matchStatus: 'ACCEPTED' };
      const matches = [
        ...bestMatches.filter(item => item.matchId !== match.matchId),
        acceptedMatch
      ]
      dispatch(setBestMatches(matches));
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
      dispatch(setBestMatches(matches));
      router.back();
    } else {
      console.log('No match to reject');
    }
  };

  return (
    <Screen>
      <ScreenHeader headerText={match?.profileResponse.fullName} />
      <ManageMatch
        match={match}
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
