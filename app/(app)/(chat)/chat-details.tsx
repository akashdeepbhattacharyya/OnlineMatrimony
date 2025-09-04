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
import useMessaging from '@/services/api/repositories/useMessaging';
import { useLocalSearchParams } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { toUri } from '@/utils/utils';
import { useLoader } from '@/components/loader/LoaderContext';
import { useChat } from '@/services/hooks/useChat';
import { fetchChatHistory, setMessagesForConversation } from '@/services/slices/conversation-slice';
import { useChatRepository } from '@/services/api/repositories/useChatRepository';

export default function ChatDetails() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const { conversationId, receiverId } = useLocalSearchParams<{
    conversationId: string;
    receiverId: string;
  }>();
  // const { messages: chatMessages, typingUsers, readReceipts, sendTyping } = useMessaging(conversationId);
  const { mutualMatches } = useAppSelector(state => state.match);
  const { chatHistory } = useAppSelector(state => state.conversation);
  const { id: senderId } = useAppSelector(state => state.user);
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useAppDispatch();
  const { getChatHistory } = useChat();
  const { sendMessage } = useChatRepository();


  const messages: Message[] = chatHistory[Number(conversationId)] || [];
  // Find the chat user details from mutual matches using receiverId

  const match = mutualMatches.find(match => match.userId.toString() === receiverId);

  useEffect(() => {
    showLoader();
    dispatch(
      fetchChatHistory({
        getChatHistory: getChatHistory,
        conversationId: Number(conversationId),
        page: 0,
        size: 100,
      }),
    );
    hideLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const onSend = async () => {
    // Handle sending the message
    console.log('Message sent:', message);
    if (message && message.trim().length > 0) {
      try {
        const response = await sendMessage(receiverId, message.trim());
        const updatedMessages = [...messages, response];
        dispatch(setMessagesForConversation({ conversationId: Number(conversationId), messages: updatedMessages }));
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
    setMessage(undefined); // Clear the message input
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <Screen>
      <ScreenHeader headerText={match?.fullName} marginTop={'$11'} />
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
              <Avatar.Image src={toUri(match?.fullName || "", match?.primaryPhotoUrl)} />
              <Avatar.Fallback backgroundColor="$gray5" />
            </Avatar>
            <YStack gap="$2">
              <Text font="headingBold" size="medium">
                {match?.fullName}
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
            <MessageTextItem key={msg.id} message={msg} senderId={senderId} receiverId={Number(receiverId)} marginVertical={'$3'} />
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
