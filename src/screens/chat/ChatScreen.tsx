import { SafeAreaScreen as Screen } from '@/src/components/layouts/SafeAreaScreen';
import React, { useState } from 'react';
import { XStack, YStack } from 'tamagui';
import { TabHeader } from '@/src/components/common/TabHeader';
import { FilterItem } from '@/src/components/chat/FilterItem';
import { Chat } from '@/src/models/Chat';
import { ChatItem } from '@/src/components/chat/ChatItem';
import { Filter, filters } from '@/src/resources/filter';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';

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

export default function ChatScreen() {
  const [currentFilter, setCurrentFilter] = useState<Filter>('All');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Screen>
      <TabHeader headerText="Chat" />
      <YStack padding="$4">
        {/* FILTER BUTTONS */}
        <XStack gap="$3.5">
          {filters.map((filter, i) => {
            const isActive = currentFilter === filter;
            return (
              <FilterItem
                key={i}
                filter={filter}
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
                navigation.navigate('Message', { data: { chat } });
              }}
            />
          ))}
        </YStack>
      </YStack>
    </Screen>
  );
}
