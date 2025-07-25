import { YStack } from 'tamagui';
import { Text } from './Text';
import { Select, SelectProps } from './Select';

type Props = {
  label: string;
  icon: React.ReactNode;
} & SelectProps;

export const LabelledSelect = ({ label, icon, ...props }: Props) => {
  return (
    <YStack width={'100%'} theme="input" gap={'$2.5'}>
      <Text size="normal" font="heading" color={'$background'}>
        {label}
      </Text>
      <Select icon={icon} {...props} />
    </YStack>
  );
};
