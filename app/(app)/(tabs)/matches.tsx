import { ScrollView, View, XStack, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { useUserMatch } from '@/services/hooks/useUserMatch';
import { useEffect, useState } from 'react';
import { useLoader } from '@/context/LoaderContext';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { fetchBestMatches, fetchReceivedMatches, fetchSentMatches } from '@/services/slices/match-slice';
import { TabHeader } from '@/components/common/TabHeader';
import { MatchItem } from '@/components/matches/MatchItem';
import { Match, ReceivedMatch, SentMatch } from '@/models/Match';
import { router } from 'expo-router';
import { RedTextButton } from '@/components/common/RedTextButton';
import { FilterItem } from '@/components/common/FilterItem';
import { matchFilter, MatchFilter } from '@/resources/filter';

export default function Matches() {
  const { getBestMatches, getSentMatches, getReceivedMatches } = useUserMatch();
  const { showLoader, hideLoader } = useLoader();
  const { bestMatches, sentMatches, receivedMatches } = useAppSelector(state => state.match);
  // const { subscription } = useAppSelector(state => state.user);
  // const { subscriptionPlans } = useAppSelector(state => state.subscriptionPlans);
  const dispatch = useAppDispatch();
  const [matches, setMatches] = useState<Match[] | undefined>(undefined);
  const [currentFilter, setCurrentFilter] = useState<MatchFilter>('MATCH');

  useEffect(() => {
    showLoader();
    dispatch(
      fetchBestMatches({
        getBestMatches: () => getBestMatches(),
      }),
    );
    dispatch(
      fetchSentMatches({
        getSentMatches: () => getSentMatches(),
      })
    );
    dispatch(
      fetchReceivedMatches({
        getReceivedMatches: () => getReceivedMatches(),
      })
    );
    hideLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentFilter === 'MATCH') {
      const filteredMatches = bestMatches.filter(item => item.matchStatus.toLowerCase() === currentFilter.toLowerCase());
      setMatches(filteredMatches);
    }
  }, [bestMatches, currentFilter]);

  const handleBestMatchPress = (match: Match) => {
    router.push({
      pathname: "/(app)/(matches)/match-details",
      params: { matchId: match.matchId }
    });
  };

  const handleSentMatchPress = (matchedUserProfile: SentMatch) => {
    router.push({
      pathname: "/(app)/(matches)/sent-match-details",
      params: { matchId: matchedUserProfile.matchId }
    });
  };

  const handleReceivedMatchPress = (matchedUserProfile: ReceivedMatch) => {
    router.push({
      pathname: "/(app)/(matches)/received-match-details",
      params: { matchId: matchedUserProfile.matchId }
    });
  };

  const getNoMatchFound = (filter: MatchFilter) => {
    switch (filter) {
      case 'MATCH':
        return 'No matches found.';
      case 'SENT':
        return 'No sent matches found.';
      case 'RECEIVED':
        return 'No received matches found.';
      default:
        return 'No matches found.';
    }
  };

  const renderNoMatches = (filter: MatchFilter) => {
    return (
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
          {getNoMatchFound(filter)}
        </Text>
        {filter === 'MATCH' && (
          <YStack gap={'$2.5'} alignItems='center'>
            <RedTextButton
              title="Update Preferences"
              onPress={() => {
                router.push({
                  pathname: '/(app)/(settings)/partner-preferences',
                  params: { purpose: 'UPDATE' }
                });
              }}
            />
            <RedTextButton
              title="Update Profile"
              onPress={() => {
                router.push({
                  pathname: '/(app)/(profile)/(update)',
                  params: { purpose: 'UPDATE' },
                });
              }}
            />
          </YStack>
        )}
      </View>
    );
  };

  const renderMatchList = (filter: MatchFilter) => {
    switch (filter) {
      case 'MATCH':
        return matches ?
          matches.length > 0 ?
            matches.map(match => (
              <MatchItem
                key={match.matchId}
                userProfile={match.profileResponse}
                onPress={() => handleBestMatchPress(match)}
              />
            ))
            : null
          : renderNoMatches(filter);
      case 'SENT':
        return sentMatches.length > 0 ? sentMatches.map(match => (
          <MatchItem
            key={match.matchId}
            userProfile={match.profile}
            onPress={() => handleSentMatchPress(match)}
          />
        )) : renderNoMatches(filter);
      case 'RECEIVED':
        return receivedMatches.length > 0 ? receivedMatches.map(match => (
          <MatchItem
            key={match.matchId}
            userProfile={match.profile}
            onPress={() => handleReceivedMatchPress(match)}
          />
        )) : renderNoMatches(filter);
      default:
        return null;
    }
  };

  return (
    <Screen>
      <TabHeader headerText="Matches" />
      <XStack gap={"$3.5"} paddingTop={"$4"} paddingHorizontal={"$4"}>
        {Object.keys(matchFilter).map((filter, i) => {
          const isActive = currentFilter === filter;
          return (
            <FilterItem
              key={i}
              filter={filter as MatchFilter}
              filterLabel={matchFilter[filter as MatchFilter]}
              isActive={isActive}
              onPress={setCurrentFilter}
            />
          );
        })}
      </XStack>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
        marginTop={'$4'}
        flex={1}
      >
        <YStack flex={1} marginBottom={'$19'} paddingHorizontal={'$4'}>
          <YStack gap={"$2"}>
            {renderMatchList(currentFilter)}
          </YStack>
        </YStack>
      </ScrollView>
    </Screen>
  );
}
