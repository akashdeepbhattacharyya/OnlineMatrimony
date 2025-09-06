import { XStack, Avatar, YStack, Circle } from 'tamagui';
import { Text } from '../common/Text';
import { TouchableOpacity } from 'react-native';
import { MutualMatch } from '@/models/Match';
import { toUri } from '@/utils/utils';
import { Conversation } from '@/models/Chat';

type Props = {
  match: MutualMatch;
  conversation: Conversation;
  onPress: (chat: MutualMatch) => void;
};

export const MatchItem = ({ match, conversation, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(match)}>
      <XStack gap="$4" alignItems="center" justifyContent="space-between">
        <XStack gap="$4">
          <Avatar circular size="$6">
            <Avatar.Image src={toUri(match.fullName, match.primaryPhotoUrl)} />
          </Avatar>
          <YStack gap="$3" justifyContent="center">
            <Text font="headingBold" size="normal" color="$color">
              {match.fullName}
            </Text>
            <Text font="heading" size="normal" color="$color">
              {conversation.lastMessage?.message}
            </Text>
          </YStack>
        </XStack>
        <YStack theme={'unread'} alignItems="flex-end" gap="$2">
          <Text font="heading" size="normal" color="$color">
            {conversation.lastMessage?.sentAt}
          </Text>
          {conversation.unreadCount > 0 && (
            <Circle
              size={'$1'}
              backgroundColor="$background"
              alignItems="center"
              justifyContent="center"
            >
              <Text font="headingBold" size="small" color="$color">
                {conversation.unreadCount}
              </Text>
            </Circle>
          )}
        </YStack>
      </XStack>
    </TouchableOpacity>
  );
};
