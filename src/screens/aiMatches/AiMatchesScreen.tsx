import { ScrollView, View, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import Header from '@/src/components/common/ScreenHeader';
import { useUserMatch } from '@/src/hooks/useUserMatch';
import { useEffect, useMemo } from 'react';
import { useLoader } from '@/src/context/LoaderContext';
import { MatchProfilePicture } from '@/src/components/ai-matches/MatchProfilePicture';
import { MatchAboutSelf } from '@/src/components/ai-matches/MatchAboutSelf';
import { MatchPersonalInformation } from '@/src/components/ai-matches/MatchPersonalInformation';
import { MatchContactInformation } from '@/src/components/ai-matches/MatchContactInformations';
import { MatchPreferences } from '@/src/components/ai-matches/MatchPreferences';
import {
  useAppDispatch,
  useAppSelector,
} from '@/src/services/repositories/store/hook';
import { fetchPendingMatches } from '@/src/services/repositories/slices/match-slice';
import { useFooterEvent } from '@/src/hooks/useFooterEvent';

export default function AiMatchesScreen() {
  const { getPendingMatches, acceptMatch, rejectMatch } = useUserMatch();
  const { showLoader, hideLoader } = useLoader();
  const { userData } = useAppSelector(state => state.user);
  const { pendingMatches } = useAppSelector(state => state.match);
  const dispatch = useAppDispatch();

  const match = useMemo(() => {
    console.log('Pending matches:', pendingMatches);
    return pendingMatches.length > 0 ? pendingMatches[0] : undefined;
  }, [pendingMatches]);

  useEffect(() => {
    showLoader();
    dispatch(
      fetchPendingMatches({
        getPendingMatches: () => getPendingMatches(0),
      }),
    );
    hideLoader();
  }, []);

  const handleAcceptMatch = async () => {
    if (match) {
      console.log('Accepting match:', match.id);
      await acceptMatch(match.id);
      // Refresh pending matches after accepting
      dispatch(
        fetchPendingMatches({ getPendingMatches: () => getPendingMatches(0) }),
      );
    } else {
      console.log('No match to accept');
    }
  };

  const handleRejectMatch = async () => {
    if (match) {
      console.log('Rejecting match:', match.id);
      await rejectMatch(match.id);
      // Refresh pending matches after rejecting
      dispatch(
        fetchPendingMatches({ getPendingMatches: () => getPendingMatches(0) }),
      );
    } else {
      console.log('No match to reject');
    }
  };

  useFooterEvent('ACCEPT_MATCH', handleAcceptMatch);
  useFooterEvent('REJECT_MATCH', handleRejectMatch);

  return (
    <Screen>
      <Header headerText="Matches" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1} marginBottom={'$19'} paddingHorizontal={'$4'}>
          {match ? (
            <YStack key={0} gap={'$4'}>
              <MatchProfilePicture
                matchedUserProfile={match.matchedUserProfile}
              />
              <MatchAboutSelf matchedUserProfile={match.matchedUserProfile} />
              <MatchPersonalInformation
                matchedUserProfile={match.matchedUserProfile}
              />
              <MatchContactInformation
                matchedUserProfile={match.matchedUserProfile}
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
              <Text font="heading" size="large" color="$text">
                No matches found.
              </Text>
            </View>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
