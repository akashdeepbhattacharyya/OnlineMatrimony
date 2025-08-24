import { ViewProps, XStack, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { DottedDivider } from './DottedDivider';
import { TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onRightButton?: () => void;
  rightButtonTitle?: string;
} & ViewProps;

export const TileHeader = ({
  title,
  onRightButton,
  rightButtonTitle,
  ...props
}: Props) => {
  return (
    <YStack theme={'tile_header'} gap={'$3'} {...props}>
      <XStack justifyContent="space-between" alignItems="center">
        <Text font="headingBold" size="normal">
          {title}
        </Text>
        {rightButtonTitle && (
          <TouchableOpacity onPress={onRightButton}>
            <Text
              theme={'right_button'}
              font="heading"
              size="normal"
              color={'$color'}
            >
              {rightButtonTitle}
            </Text>
          </TouchableOpacity>
        )}
      </XStack>
      <DottedDivider />
    </YStack>
  );
};
