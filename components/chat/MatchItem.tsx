import { XStack, Avatar, YStack } from 'tamagui';
import { Text } from '../common/Text';
import { TouchableOpacity } from 'react-native';
import { MutualMatch } from '@/models/Match';
import { formatDateTime, toUri } from '@/utils/utils';
import { Conversation } from '@/models/Chat';
import { useAppSelector } from '@/services/store/hook';

type Props = {
  match: MutualMatch;
  conversation?: Conversation;
  onPress: (chat: MutualMatch) => void;
};

export const MatchItem = ({ match, conversation, onPress }: Props) => {
  const { id: senderId } = useAppSelector(state => state.user);

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
            {conversation && (
              <Text font="heading" size="normal" color="$color" numberOfLines={2} ellipsizeMode="tail">
                {senderId === conversation.lastMessage?.senderId ? "You: " : ""}{conversation.lastMessage?.message}
              </Text>
            )}
          </YStack>
        </XStack>
        {conversation && (
          <YStack theme={'unread'} alignItems="flex-end" gap="$2">
            <Text font="heading" size="normal" color="$color">
              {formatDateTime(conversation.lastMessage?.sentAt || "")}
            </Text>
            {conversation.unreadCount > 0 && (
              <Text font="headingBold" size="small" color="$color" paddingHorizontal={'$1.5'} paddingVertical={'$1'} backgroundColor={"$background"} borderRadius={'$6'}>
                {conversation.unreadCount}
              </Text>
            )}
          </YStack>
        )}
      </XStack>
    </TouchableOpacity>
  );
};
