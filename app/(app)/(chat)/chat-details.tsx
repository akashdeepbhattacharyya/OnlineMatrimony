import React, { useEffect, useMemo, useRef, useState } from 'react';
import { YStack, XStack, ScrollView } from 'tamagui';
import { NoSafeAreaScreen as Screen } from '@/components/layouts/NoSafeAreaScreen';
import SendIcon from '@/assets/images/send.svg';
import { TextArea } from '@/components/common/TextArea';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Message } from '@/models/Chat';
import { MessageTextItem } from '@/components/chat/MessageTextItem';
import useMessaging from '@/services/api/repositories/useMessaging';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/services/store/hook';
import { useLoader } from '@/components/loader/LoaderContext';
import { useChat } from '@/services/hooks/useChat';
import { fetchChatHistory, setMessagesForConversation, setConversationList } from '@/services/slices/conversation-slice';
import { useChatRepository } from '@/services/api/repositories/useChatRepository';
import { ChatDetailsHeader } from '@/components/chat/ChatDetailsHeader';
import { Text } from '@/components/common/Text';
import { formatDate } from '@/utils/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatDetails() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const { conversationId, receiverId } = useLocalSearchParams<{
    conversationId: string;
    receiverId: string;
  }>();
  const { incomingMessage, setIncomingMessage, sendTyping } = useMessaging(conversationId);
  const { mutualMatches } = useAppSelector(state => state.match);
  const { chatHistory } = useAppSelector(state => state.conversation);
  const { id: senderId } = useAppSelector(state => state.user);
  const { showLoader, hideLoader } = useLoader();
  const dispatch = useAppDispatch();
  const { getChatHistory } = useChat();
  const { sendMessage, markMessagesAsRead } = useChatRepository();  
  const { conversationList } = useAppSelector(state => state.conversation);
  const { top } = useSafeAreaInsets();

  // Flat messages array for logic
  const messages: Message[] = useMemo(() => {
    return (chatHistory[Number(conversationId)] || []).slice().sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());
  }, [chatHistory, conversationId]);

  // Group messages by date for rendering
  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: Message[] }[] = [];
    messages.forEach(msg => {
      const date = formatDate(msg.sentAt);
      const lastGroup = groups[groups.length - 1];
      if (!lastGroup || lastGroup.date !== date) {
        groups.push({ date, messages: [msg] });
      } else {
        lastGroup.messages.push(msg);
      }
    });
    return groups;
  }, [messages]);

  const match = mutualMatches.find(match => match.userId.toString() === receiverId);

  useEffect(() => {
    if (incomingMessage) {
      const markAsRead = async () => {
        await markMessagesAsRead(Number(conversationId));
      };
      markAsRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingMessage, conversationId]);

  useEffect(() => {
    const markAsRead = async () => {
      if (messages.some(msg => !msg.isRead && msg.receiverId === senderId)) {
        await markMessagesAsRead(Number(conversationId));
        const updatedConversationList = conversationList.map(conv => {
          if (conv.conversationId === Number(conversationId)) {
            return { ...conv, unreadCount: 0 };
          }
          return conv;
        });
        dispatch(setConversationList(updatedConversationList));
      }
    };
    markAsRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (incomingMessage && incomingMessage.conversationId === Number(conversationId)) {
      // Append the new incoming message to the existing messages
      const updatedMessages = [...messages, incomingMessage];
      dispatch(setMessagesForConversation({ conversationId: Number(conversationId), messages: updatedMessages }));
      const updatedConversationList = conversationList.map(conv => {
        if (conv.conversationId === Number(conversationId)) {
          return { ...conv, lastMessage: incomingMessage };
        }
        return conv;
      });
      dispatch(setConversationList(updatedConversationList));
      setIncomingMessage(undefined); // Clear the incoming message after processing
    }
  }, [conversationId, conversationList, dispatch, incomingMessage, messages, setIncomingMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    if (message && message.length > 0) {
      sendTyping(true);
    } else {
      sendTyping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

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
    if (message && message.trim().length > 0) {
      try {
        const response = await sendMessage(receiverId, message.trim());
        const updatedMessages = [...messages, response];
        dispatch(setMessagesForConversation({ conversationId: Number(conversationId), messages: updatedMessages }));
        const updatedConversationList = conversationList.map(conv => {
          if (conv.conversationId === Number(conversationId)) {
            return { ...conv, lastMessage: response };
          }
          return conv;
        });
        dispatch(setConversationList(updatedConversationList));
        sendTyping(false);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
    setMessage(undefined); // Clear the message input
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  if (!match) {
    return null; // or a loading indicator
  }

  return (
    <Screen>
      <ChatDetailsHeader userProfile={match} marginTop={top} onProfilePress={() => {
        router.push({ pathname: "/(app)/(chat)/mutual-match-profile-details", params: { userId: receiverId } });
      }} />
      <YStack flex={1} backgroundColor="$background">

        {/* CHAT MESSAGES */}
        <ScrollView
          paddingHorizontal="$4"
          contentContainerStyle={{ flexGrow: 1 }}
          ref={scrollViewRef}
        >
          {groupedMessages.map(group => (
            <React.Fragment key={group.date}>
              <Text textAlign='center' paddingVertical="$2">{group.date}</Text>
              {group.messages.map(msg => (
                <MessageTextItem key={msg.id} message={msg} senderId={senderId} receiverId={Number(receiverId)} marginVertical={'$3'} />
              ))}
            </React.Fragment>
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
          paddingBottom={!keyboardVisible ? '$10' : '$3'}
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
