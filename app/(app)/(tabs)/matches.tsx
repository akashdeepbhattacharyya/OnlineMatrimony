import { ScrollView, View, XStack, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { useUserMatch } from '@/services/hooks/useUserMatch';
import { useEffect, useState } from 'react';
import { useLoader } from '@/context/LoaderContext';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { fetchBestMatches } from '@/services/slices/match-slice';
import { TabHeader } from '@/components/common/TabHeader';
import { MatchItem } from '@/components/matches/MatchItem';
import { Match } from '@/models/Match';
import { router } from 'expo-router';
import { RedTextButton } from '@/components/common/RedTextButton';
import { FilterItem } from '@/components/common/FilterItem';
import { matchFilter, MatchFilter } from '@/resources/filter';

export default function Matches() {
  const { getBestMatches } = useUserMatch();
  const { showLoader, hideLoader } = useLoader();
  const { bestMatches } = useAppSelector(state => state.match);
  // const { subscription } = useAppSelector(state => state.user);
  // const { subscriptionPlans } = useAppSelector(state => state.subscriptionPlans);
  const dispatch = useAppDispatch();
  const [matches, setMatches] = useState<Match[] | undefined>(undefined);
  const [currentFilter, setCurrentFilter] = useState<MatchFilter>('PENDING');

  useEffect(() => {
    showLoader();
    dispatch(
      fetchBestMatches({
        getBestMatches: () => getBestMatches(),
      }),
    );
    hideLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bestMatches) {
      const filteredMatches = bestMatches.filter(item => item.matchStatus.toLowerCase() === currentFilter.toLowerCase());
      setMatches(filteredMatches);
    }
  }, [bestMatches, currentFilter]);

  const handleMatchPress = (match: Match) => {
    router.push({
      pathname: "/(app)/(matches)/match-details",
      params: { matchId: match.matchId }
    });
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
          {matches ?
            matches.length > 0 ?
              (
                <YStack gap={'$2.5'}>
                  {matches.map((match, index) => (
                    <MatchItem
                      key={index}
                      match={match}
                      onPress={() => handleMatchPress(match)}
                    />
                  ))}
                </YStack>
              )
              :
              null
            :
            (
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
                  {`No matches found.`}
                </Text>
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
              </View>
            )}
        </YStack>
      </ScrollView>
    </Screen>
  );
}
