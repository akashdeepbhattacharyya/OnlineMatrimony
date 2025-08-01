import { ViewProps, XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { DottedDivider } from './DottedDivider';
import { TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onSeeAll?: () => void;
  rightButtonTitle?: string;
} & ViewProps;

export const TileHeader = ({
  title,
  onSeeAll,
  rightButtonTitle,
  ...props
}: Props) => {
  return (
    <YStack gap={'$3'} {...props}>
      <XStack justifyContent="space-between" alignItems="center">
        <Text font="headingBold" size="normal">
          {title}
        </Text>
        {rightButtonTitle && (
          <TouchableOpacity onPress={onSeeAll}>
            <Text font="heading" size="normal" color={'$buttonTitle'}>
              {rightButtonTitle}
            </Text>
          </TouchableOpacity>
        )}
      </XStack>
      <DottedDivider />
    </YStack>
  );
};
