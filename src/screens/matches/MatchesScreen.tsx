import { ScrollView, View, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import { useUserMatch } from '@/src/hooks/useUserMatch';
import { useEffect } from 'react';
import { useLoader } from '@/src/context/LoaderContext';
import { useAppDispatch, useAppSelector } from '@/src/services/store/hook';
import { fetchBestMatches } from '@/src/services/slices/match-slice';
import { TabHeader } from '@/src/components/common/TabHeader';
import { MatchItem } from '@/src/components/matches/MatchItem';
import { Match } from '@/src/models/Match';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/RootNavigator';

export default function MatchesScreen() {
  const { getBestMatches } = useUserMatch();
  const { showLoader, hideLoader } = useLoader();
  const { userData } = useAppSelector(state => state.user);
  const { bestMatches } = useAppSelector(state => state.match);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    showLoader();
    dispatch(
      fetchBestMatches({
        getBestMatches: () => getBestMatches(),
      }),
    );
    hideLoader();
  }, []);

  const handleMatchPress = (match: Match) => {
    navigation.navigate('MatchDetails', { data: { match } });
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
