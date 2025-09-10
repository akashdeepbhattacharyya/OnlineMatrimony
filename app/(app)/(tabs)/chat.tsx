import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import React, { useEffect, useState } from 'react';
import { View, XStack, YStack } from 'tamagui';
import { TabHeader } from '@/components/common/TabHeader';
import { FilterItem } from '@/components/common/FilterItem';
import { MatchItem } from '@/components/chat/MatchItem';
import { chatFilter, ChatFilter } from '@/resources/filter';
import { router } from 'expo-router';
import { useUserMatch } from '@/services/hooks/useUserMatch';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { useLoader } from '@/components/loader/LoaderContext';
import { fetchMutualMatches } from '@/services/slices/match-slice';
import { useChatRepository } from '@/services/api/repositories/useChatRepository';
import { fetchConversations, setConversationList } from '@/services/slices/conversation-slice';
import { useError } from '@/components/error/useError';
import { useChat } from '@/services/hooks/useChat';
import { Text } from '@/components/common/Text';

export default function Chats() {
  const [currentFilter, setCurrentFilter] = useState<ChatFilter>('ALL');
  const { getMutualMatches } = useUserMatch();
  const { showLoader, hideLoader } = useLoader();
  const { mutualMatches } = useAppSelector(state => state.match);
  const [filteredMatches, setFilteredMatches] = useState(mutualMatches);
  // const { subscription } = useAppSelector(state => state.user);
  // const { subscriptionPlans } = useAppSelector(state => state.subscriptionPlans);
  const dispatch = useAppDispatch();
  const { conversationList } = useAppSelector(state => state.conversation);
  const { getConversations } = useChat();
  const { startChat } = useChatRepository();
  const { showError } = useError();

  useEffect(() => {
    showLoader();
    dispatch(
      fetchMutualMatches({
        getMutualMatches: () => getMutualMatches(),
      }),
    );
    dispatch(
      fetchConversations({
        getConversations: () => getConversations(),
      })
    );
    hideLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentFilter === 'ALL') {
      setFilteredMatches(mutualMatches);
    } else {
      const filtered = mutualMatches.filter(match => {
        return conversationList.some(conversation =>
          conversation.otherUserProfile.userId === match.userId && conversation.unreadCount > 0
        );
      });
      setFilteredMatches(filtered);
    }
  }, [mutualMatches, currentFilter, conversationList]);

  const startConversation = async (receiverId: number) => {
    // Check if a conversation already exists with this user
    const existingConversation = conversationList.find(conversation =>
      conversation.otherUserProfile.userId === receiverId
    );

    if (existingConversation) {
      // Navigate to the existing conversation
      router.push({
        pathname: "/(app)/(chat)/chat-details",
        params: {
          conversationId: existingConversation.convId.toString(),
          receiverId: receiverId.toString()
        }
      });
    } else {
      try {
        const newConversation = await startChat(receiverId);
        dispatch(setConversationList([...conversationList, newConversation]));
        router.push({
          pathname: "/(app)/(chat)/chat-details",
          params: {
            conversationId: newConversation.convId.toString(),
            receiverId: receiverId.toString()
          }
        });
      } catch (error) {
        showError({ description: "Error starting chat" });
        console.error("Error starting chat:", error);
      }
    }
  };


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
        {filteredMatches.length === 0 ? (
          <View
            justifyContent="center"
            alignItems="center"
            width={'100%'}
            height={'85%'}
          >
            <Text font="heading" size="normal" color="$color">
              {`No Unread Chats`}
            </Text>
          </View>
        ) : (
          <YStack
            theme={'chat'}
            backgroundColor={'$background'}
            padding="$4"
            marginTop={'$4'}
            borderRadius={'$6'}
            gap="$6"
          >
            {filteredMatches.map(match => {
              const conversation = conversationList.find(conv => conv.otherUserProfile.userId === match.userId);
              return (
                <MatchItem
                  key={match.userId}
                  match={match}
                  conversation={conversation}
                  onPress={() => {
                    startConversation(match.userId);
                  }}
                />
              );
            })}
          </YStack>
        )}
      </YStack>
    </Screen>
  );
}
