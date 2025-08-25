import { SafeAreaScreen as Screen } from '@/components/layouts/SafeAreaScreen';
import React, { useState } from 'react';
import { XStack, YStack } from 'tamagui';
import { TabHeader } from '@/components/common/TabHeader';
import { FilterItem } from '@/components/common/FilterItem';
import { Chat } from '@/models/Chat';
import { ChatItem } from '@/components/chat/ChatItem';
import { chatFilter, ChatFilter } from '@/resources/filter';
import { router } from 'expo-router';

const chats: Chat[] = [
  {
    id: '1',
    name: 'Kakali M',
    msg: 'Hello, How are you...',
    time: '23 min',
    unread: 3,
    image: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: '2',
    name: 'Kakali M',
    msg: 'Hello, How are you...',
    time: '30 min',
    unread: 3,
    image: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: '3',
    name: 'Kakali M',
    msg: 'Hello, How are you...',
    time: '1 hours',
    unread: 3,
    image: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: '4',
    name: 'Kakali M',
    msg: 'Hello, How are you...',
    time: '1 hours',
    unread: 3,
    image: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: '5',
    name: 'Kakali M',
    msg: 'Hello, How are you...',
    time: '1 hours',
    unread: 3,
    image: 'https://i.pravatar.cc/150?img=10',
  },
];

export default function Chats() {
  const [currentFilter, setCurrentFilter] = useState<ChatFilter>('ALL');

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
          {chats.map(chat => (
            <ChatItem
              key={chat.id}
              chat={chat}
              onPress={() => {
                router.push({
                  pathname: "/(app)/(chat)/chat-details",
                  params: { chatId: chat.id }
                })
              }}
            />
          ))}
        </YStack>
      </YStack>
    </Screen>
  );
}
