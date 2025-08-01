import { ViewProps, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { DottedDivider } from './DottedDivider';

type Props = {
  title: string;
} & ViewProps;

export const TileHeader = ({ title, ...props }: Props) => {
  return (
    <YStack gap={'$3'} {...props}>
      <Text font="headingBold" size="normal">
        {title}
      </Text>
      <DottedDivider />
    </YStack>
  );
};
