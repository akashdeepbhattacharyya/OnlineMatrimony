import { ViewProps, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import DottedDivider from '@/assets/images/dotted-divider.svg';

type Props = {
  title: string;
} & ViewProps;

export const ProfileTileHeader = ({ title, ...props }: Props) => {
  return (
    <YStack gap={"$3"} {...props}>
      <Text font="headingBold" size="normal">
        {title}
      </Text>
      <DottedDivider width={'100%'} />
    </YStack>
  );
};
