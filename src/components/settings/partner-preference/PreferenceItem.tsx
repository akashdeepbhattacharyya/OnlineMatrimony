import { Text } from '@/src/components/common/Text';
import { ViewProps, YStack } from 'tamagui';

type Props = {
  title: string;
  children?: React.ReactNode;
} & ViewProps;

export const PreferenceItem = ({ title, children, ...props }: Props) => {
  return (
    <YStack {...props}>
      <Text font="headingLight" size="small">
        {title}
      </Text>
      {children}
    </YStack>
  );
};
