import { XStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { TouchableOpacity } from 'react-native';

export const TileHeader = ({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll: () => void;
}) => {
  return (
    <XStack justifyContent="space-between" alignItems="center">
      <Text font="headingBold" size="normal">
        {title}
      </Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text font="heading" size="normal" color={'$buttonTitle'}>
          {`See All`}
        </Text>
      </TouchableOpacity>
    </XStack>
  );
};
