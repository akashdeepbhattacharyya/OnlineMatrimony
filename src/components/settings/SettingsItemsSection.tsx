import { ViewProps, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';

type Props = {
  title: string;
  children?: React.ReactNode;
} & ViewProps;

export const SettingsItemsSection = ({ title, children, ...props }: Props) => {
  return (
    <YStack {...props}>
      <Text font="headingBold" size="medium" marginBottom={'$4'}>
        {title}
      </Text>
      {children}
    </YStack>
  );
};
