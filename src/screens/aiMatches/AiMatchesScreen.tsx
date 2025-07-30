import { ScrollView, View, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import Header from '@/src/components/common/ScreenHeader';
import { useUserMatch } from '@/src/hooks/useUserMatch';
import { useCallback, useEffect, useState } from 'react';
import { useLoader } from '@/src/context/LoaderContext';
import { MatchProfilePicture } from '@/src/components/ai-matches/MatchProfilePicture';
import { MatchAboutSelf } from '@/src/components/ai-matches/MatchAboutSelf';
import { MatchPersonalInformation } from '@/src/components/ai-matches/MatchPersonalInformation';
import { MatchContactInformation } from '@/src/components/ai-matches/MatchContactInformations';
import { MatchPreferences } from '@/src/components/ai-matches/MatchPreferences';
import { accountStateItem } from '@/src/services/repositories/slices/userSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '@/src/services/repositories/store/hook';
import { fetchPendingMatches } from '@/src/services/repositories/slices/match-slice';
import { useFooterEvent } from '@/src/hooks/useFooterEvent';

export default function AiMatchesScreen() {
  const [page, setPage] = useState(0);
  const { data, getPendingMatches } = useUserMatch();
  const { showLoader, hideLoader } = useLoader();
  const { userData } = useAppSelector(accountStateItem);
  const dispatch = useAppDispatch();

  useEffect(() => {
    showLoader();
    dispatch(
      fetchPendingMatches({
        getPendingMatches: () => getPendingMatches(page, 1),
      }),
    );
    hideLoader();
  }, [page]);

  const handleAcceptMatch = useCallback(() => {
    // Handle accept match logic here
    console.log('Accept match callback triggered');
  }, []);

  const handleRejectMatch = useCallback(() => {
    // Handle reject match logic here
    console.log('Reject match callback triggered');
  }, []);

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
        <YStack flex={1} marginBottom={'$12'} paddingHorizontal={'$4'}>
          {data.length > 0 ? (
            data.map((match, index) => (
              <YStack key={index} gap={'$4'}>
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
            ))
          ) : (
            <View justifyContent="center" alignItems="center">
              <Text color="$text">
                No matches found.
              </Text>
            </View>
          )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
