import React, { useEffect, useRef, useState } from 'react';
import { YStack, XStack, Avatar, ScrollView } from 'tamagui';
import { NoSafeAreaScreen as Screen } from '@/src/components/layouts/NoSafeAreaScreen';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { RootStackParamList } from '@/src/navigation/RootNavigator';
import { RouteProp } from '@react-navigation/native';
import { Text } from '@/src/components/common/Text';
import OnlineIcon from '@/assets/images/online.svg';
import SendIcon from '@/assets/images/send.svg';
import SmileyIcon from '@/assets/images/smiley.svg';
import { TextArea } from '@/src/components/common/TextArea';
import { Animated, Dimensions, Keyboard, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { MessageFormType } from '@/src/resources/form';
import { messageValidationSchema } from '@/src/resources/validations/message';
import { Message } from '@/src/models/Chat';
import { MessageTextItem } from '@/src/components/chat/MessageTextItem';

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

type Props = {
  route: RouteProp<RootStackParamList, 'Message'>;
};

export default function ChatDetailsScreen({
  route: {
    params: {
      data: { chat },
    },
  },
}: Props) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const initialValues: MessageFormType = {
    text: '',
    senderId: '<USER_ID>',
    chatId: chat.id,
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

  const onSend = (values: MessageFormType) => {
    // Handle sending the message
    console.log('Message sent:', values);
    messages.push({
      id: String(messages.length + 1),
      text: values.text,
      time: new Date().toLocaleTimeString(),
      sender: 'me',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    });
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
        <Formik<MessageFormType>
          initialValues={initialValues}
          validationSchema={messageValidationSchema}
          onSubmit={onSend}
        >
          {({ values, handleSubmit, setFieldValue }) => (
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
                value={values.text}
                onChangeText={text => setFieldValue('text', text)}
              />
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  handleSubmit();
                  scrollToBottom();
                }}
              >
                <SendIcon width={24} height={24} />
              </TouchableOpacity>
            </XStack>
          )}
        </Formik>
      </YStack>
    </Screen>
  );
}
