import { ScrollView, View, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import { useUserMatch } from '@/services/hooks/useUserMatch';
import { useEffect } from 'react';
import { useLoader } from '@/context/LoaderContext';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { fetchBestMatches } from '@/services/slices/match-slice';
import { TabHeader } from '@/components/common/TabHeader';
import { MatchItem } from '@/components/matches/MatchItem';
import { Match } from '@/models/Match';
import { router } from 'expo-router';

export default function Matches() {
  const { getBestMatches } = useUserMatch();
  const { showLoader, hideLoader } = useLoader();
  const { bestMatches } = useAppSelector(state => state.match);
  const dispatch = useAppDispatch();

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

  const handleMatchPress = (match: Match) => {
    router.push({
      pathname: "/(app)/(matches)/match-details",
      params: { matchId: match.matchId }
    });
  };

  return (
    <Screen>
      <TabHeader headerText="Matches" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1} marginBottom={'$19'} paddingHorizontal={'$4'}>
          {bestMatches ? (
            <YStack gap={'$2.5'}>
              {bestMatches.map((match, index) => (
                <MatchItem
                  key={index}
                  match={match}
                  onPress={() => handleMatchPress(match)}
                />
              ))}
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
