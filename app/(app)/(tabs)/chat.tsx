import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import React, { useEffect, useState } from 'react';
import { XStack, YStack } from 'tamagui';
import { TabHeader } from '@/components/common/TabHeader';
import { FilterItem } from '@/components/common/FilterItem';
import { MatchItem } from '@/components/chat/MatchItem';
import { chatFilter, ChatFilter } from '@/resources/filter';
import { router } from 'expo-router';
import { useUserMatch } from '@/services/hooks/useUserMatch';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { useLoader } from '@/components/loader/LoaderContext';
import { fetchMutualMatches } from '@/services/slices/match-slice';

export default function Chats() {
  const [currentFilter, setCurrentFilter] = useState<ChatFilter>('ALL');
  const { getMutualMatches } = useUserMatch();
  const { showLoader, hideLoader } = useLoader();
  const { mutualMatches } = useAppSelector(state => state.match);
  // const { subscription } = useAppSelector(state => state.user);
  // const { subscriptionPlans } = useAppSelector(state => state.subscriptionPlans);
  const dispatch = useAppDispatch();

  useEffect(() => {
    showLoader();
    dispatch(
      fetchMutualMatches({
        getMutualMatches: () => getMutualMatches(),
      }),
    );
    hideLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Screen>
      <TabHeader headerText="Chat" />
      <YStack padding="$4">
        {/* FILTER BUTTONS */}
        <XStack gap="$3.5">
          {Object.keys(chatFilter).map((filter, i) => {
            const isActive = currentFilter === filter;
            return (
              <FilterItem
                key={i}
                filter={filter as ChatFilter}
                filterLabel={chatFilter[filter as ChatFilter]}
                isActive={isActive}
                onPress={setCurrentFilter}
              />
            );
          })}
        </XStack>

        {/* CHAT LIST */}
        <YStack
          theme={'chat'}
          backgroundColor={'$background'}
          padding="$4"
          marginTop={'$4'}
          borderRadius={'$6'}
          gap="$6"
        >
          {mutualMatches.map(match => (
            <MatchItem
              key={match.userId}
              match={match}
              onPress={() => {
                router.push({
                  pathname: "/(app)/(chat)/chat-details",
                  params: { userId: match.userId }
                })
              }}
            />
          ))}
        </YStack>
      </YStack>
    </Screen>
  );
}
