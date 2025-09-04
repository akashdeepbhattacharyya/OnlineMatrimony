import { ViewProps, XStack, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { Message } from '@/models/Chat';

type Props = {
  message: Message;
  senderId: number;
  receiverId: number;
} & ViewProps;

export const MessageTextItem = ({ message, senderId, receiverId, ...props }: Props) => {
  const isSender = message.senderId === senderId;
  const isReceiver = message.senderId === receiverId;
  return (
    <YStack
      theme={
        isSender
          ? 'chat_message_outgoing'
          : 'chat_message_incoming'
      }
      alignItems={isSender ? 'flex-end' : 'flex-start'}
      {...props}
    >
      <XStack gap="$2" maxWidth={'80%'} alignItems="flex-end">
        <YStack
          backgroundColor={'$background'}
          borderTopRightRadius={'$10'}
          borderTopLeftRadius={'$10'}
          borderBottomLeftRadius={isSender ? '$10' : '$0'}
          borderBottomRightRadius={isSender ? '$0' : '$10'}
          padding="$4"
          gap="$2"
        >
          <Text font="heading" color={'$color'}>
            {message.message}
          </Text>
          <Text
            font="heading"
            color={'$color'}
            alignSelf={isReceiver ? 'flex-end' : 'flex-start'}
          >
            {message.sentAt}
          </Text>
        </YStack>
      </XStack>
    </YStack>
  );
};
