import { TextAreaProps, YStack } from 'tamagui';
import { TextArea } from './TextArea';
import { Text } from './Text';

type Props = {
  label: string;
} & TextAreaProps;

export const LabelledTextArea = ({ label, ...props }: Props) => {
  return (
    <YStack width={'100%'} theme="input" gap={'$2.5'}>
      <Text size="normal" font="heading" color={'$background'}>
        {label}
      </Text>
      <TextArea {...props} />
    </YStack>
  );
};
