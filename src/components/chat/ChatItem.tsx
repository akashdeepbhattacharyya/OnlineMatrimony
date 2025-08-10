import { XStack, Avatar, YStack, Circle } from 'tamagui';
import { Text } from '../common/Text';
import { Chat } from '@/src/models/Chat';
import { TouchableOpacity } from 'react-native';

type Props = {
  chat: Chat;
  onPress: (chat: Chat) => void;
};

export const ChatItem = ({ chat, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(chat)}>
      <XStack gap="$4" justifyContent="space-between">
        <XStack gap="$4">
          <Avatar circular size="$6">
            <Avatar.Image src={chat.image} />
          </Avatar>
          <YStack gap="$3" justifyContent="center">
            <Text font="headingBold" size="normal" color="$color">
              {chat.name}
            </Text>
            <Text font="heading" size="normal" color="$color">
              {chat.msg}
            </Text>
          </YStack>
        </XStack>
        <YStack theme={'unread'} alignItems="flex-end" gap="$2">
          <Text font="heading" size="normal" color="$color">
            {chat.time}
          </Text>
          <Circle
            size={'$1'}
            backgroundColor="$background"
            alignItems="center"
            justifyContent="center"
          >
            <Text font="headingBold" size="small" color="$color">
              {chat.unread}
            </Text>
          </Circle>
        </YStack>
      </XStack>
    </TouchableOpacity>
  );
};
