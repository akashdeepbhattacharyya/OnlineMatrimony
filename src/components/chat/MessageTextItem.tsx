import { ViewProps, XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { Message } from '@/src/models/Chat';

type Props = {
  message: Message;
} & ViewProps;

export const MessageTextItem = ({ message, ...props }: Props) => {
  return (
    <YStack
      theme={
        message.sender === 'me'
          ? 'chat_message_outgoing'
          : 'chat_message_incoming'
      }
      alignItems={message.sender === 'me' ? 'flex-end' : 'flex-start'}
      {...props}
    >
      <XStack gap="$2" maxWidth={'80%'} alignItems="flex-end">
        <YStack
          backgroundColor={'$background'}
          borderTopRightRadius={'$10'}
          borderTopLeftRadius={'$10'}
          borderBottomLeftRadius={message.sender === 'me' ? '$10' : '$0'}
          borderBottomRightRadius={message.sender === 'me' ? '$0' : '$10'}
          padding="$4"
          gap="$2"
        >
          <Text font="heading" color={'$color'}>
            {message.text}
          </Text>
          <Text
            font="heading"
            color={'$color'}
            alignSelf={message.sender === 'them' ? 'flex-end' : 'flex-start'}
          >
            {message.time}
          </Text>
        </YStack>
      </XStack>
    </YStack>
  );
};
