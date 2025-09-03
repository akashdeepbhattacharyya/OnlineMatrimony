import React, { useEffect, useRef, useState } from 'react';
import { YStack, XStack, Avatar, ScrollView } from 'tamagui';
import { NoSafeAreaScreen as Screen } from '@/components/layouts/NoSafeAreaScreen';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Text } from '@/components/common/Text';
import OnlineIcon from '@/assets/images/online.svg';
import SendIcon from '@/assets/images/send.svg';
import { TextArea } from '@/components/common/TextArea';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Message } from '@/models/Chat';
import { MessageTextItem } from '@/components/chat/MessageTextItem';
import useChat from '@/services/api/repositories/useChat';

const messages: Message[] = [
  {
    id: '1',
    text: 'Hi, massa sed ultricies. Aliquam dolor urna, efficitur eu est lobortis, cursus faucibus ante.',
    time: '5:30',
    sender: 'them',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    text: 'Hello...',
    time: '5:31',
    sender: 'me',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '3',
    text: 'Hi, massa sed ultricies. Aliquam dolor urna, efficitur eu est lobortis, cursus faucibus ante.',
    time: '5:32',
    sender: 'them',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '4',
    text: 'Massa sed ultricies. Aliquam dolor urna, efficitur eu est lobortis, cursus faucibus ante.',
    time: '15:30',
    sender: 'me',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
];

export default function ChatDetails() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  // const { messages, typingUsers, readReceipts, sendMessage, sendTyping, markAsRead } = useChat(conversationId);
  const chat = {
    id: '1',
    name: 'Kakali M',
    msg: 'Hello, How are you...',
    time: '23 min',
    unread: 3,
    image: 'https://i.pravatar.cc/150?img=6',
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSend = () => {
    // Handle sending the message
    console.log('Message sent:', message);
    if (message && message.trim().length > 0) {
      messages.push({
        id: String(messages.length + 1),
        text: message.trim(),
        time: new Date().toLocaleTimeString(),
        sender: 'me',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      });
    }
    setMessage(undefined); // Clear the message input
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <Screen>
      <ScreenHeader headerText={chat.name} marginTop={'$11'} />
      <YStack flex={1} backgroundColor="$background">
        {/* HEADER */}
        <XStack
          theme={'chat_message_banner'}
          backgroundColor="$background"
          paddingHorizontal="$3"
          paddingVertical="$3.5"
          alignItems="center"
          justifyContent="space-between"
          borderRadius={'$8'}
          margin={'$4'}
        >
          <XStack alignItems="center" gap="$3">
            <Avatar circular size="$6">
              <Avatar.Image source={{ uri: chat.image }} />
              <Avatar.Fallback backgroundColor="$gray5" />
            </Avatar>
            <YStack gap="$2">
              <Text font="headingBold" size="medium">
                {chat.name}
              </Text>
              <XStack alignItems="center" gap="$2">
                <OnlineIcon />
                <Text font="heading" size="normal">
                  Online
                </Text>
              </XStack>
            </YStack>
          </XStack>
        </XStack>

        {/* CHAT MESSAGES */}
        <ScrollView
          paddingHorizontal="$4"
          contentContainerStyle={{ flexGrow: 1 }}
          ref={scrollViewRef}
        >
          {messages.map(msg => (
            <MessageTextItem key={msg.id} message={msg} marginVertical={'$3'} />
          ))}
        </ScrollView>

        {/* MESSAGE INPUT */}
        <XStack
          theme={'chat_message_input'}
          paddingTop={'$3'}
          paddingHorizontal={'$3'}
          alignItems="center"
          backgroundColor="$background"
          gap={'$4'}
          borderTopRightRadius={'$8'}
          borderTopLeftRadius={'$8'}
          paddingBottom={!keyboardVisible ? '$8' : '$3'}
        >
          <TextArea
            flex={1}
            font="heading"
            placeholder="Type a message"
            borderRadius={'$8'}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              onSend();
              scrollToBottom();
            }}
          >
            <SendIcon width={24} height={24} />
          </TouchableOpacity>
        </XStack>
      </YStack>
    </Screen>
  );
}
