import { Text } from '@/components/common/Text';
import { getToken, ViewProps, YStack } from 'tamagui';

type Props = {
  title: string;
  children?: React.ReactNode;
} & ViewProps;

export const PreferenceItem = ({ title, children, ...props }: Props) => {
  return (
    <YStack {...props}>
      <Text
        font="headingLight"
        size="small"
        color={getToken('$color.gray_lighter')}
      >
        {title}
      </Text>
      {children}
    </YStack>
  );
};
