import { InputProps, XStack, YStack } from 'tamagui';
import { Input } from './Input';
import { TextField } from './TextField';
import { Text } from './Text';

type Props = {
  label: string;
  icon?: React.ReactNode;
  multiline?: boolean;
} & InputProps;

export const LabelledTextField = ({ label, icon, multiline, ...props }: Props) => {
  return (
    <YStack width={'100%'} theme="input" gap={'$2.5'}>
      <Text size="normal" font="heading" color={'$background'}>
        {label}
      </Text>
      <TextField icon={icon} {...props} />
    </YStack>
  );
};
