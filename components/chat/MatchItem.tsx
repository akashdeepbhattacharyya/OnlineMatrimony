import { XStack, Avatar, YStack, Circle } from 'tamagui';
import { Text } from '../common/Text';
import { TouchableOpacity } from 'react-native';
import { MutualMatch } from '@/models/Match';
import { toUri } from '@/utils/utils';

type Props = {
  match: MutualMatch;
  onPress: (chat: MutualMatch) => void;
};

export const MatchItem = ({ match, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(match)}>
      <XStack gap="$4" justifyContent="space-between">
        <XStack gap="$4">
          <Avatar circular size="$6">
            <Avatar.Image src={toUri(match.fullName, match.primaryPhotoUrl)} />
          </Avatar>
          <YStack gap="$3" justifyContent="center">
            <Text font="headingBold" size="normal" color="$color">
              {match.fullName}
            </Text>
            <Text font="heading" size="normal" color="$color">
              {"Hello"}
            </Text>
          </YStack>
        </XStack>
        <YStack theme={'unread'} alignItems="flex-end" gap="$2">
          <Text font="heading" size="normal" color="$color">
            {"1:00 PM"}
          </Text>
          <Circle
            size={'$1'}
            backgroundColor="$background"
            alignItems="center"
            justifyContent="center"
          >
            <Text font="headingBold" size="small" color="$color">
              {0}
            </Text>
          </Circle>
        </YStack>
      </XStack>
    </TouchableOpacity>
  );
};
