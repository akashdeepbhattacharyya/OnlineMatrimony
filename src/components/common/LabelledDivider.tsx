import { XStack, type ViewProps } from 'tamagui';
import { Divider } from './Divider';
import { Text } from './Text';

type Props = {
  label: string;
  width: string;
} & ViewProps;

export const LabelledDivider = ({ label, width, ...props }: Props) => {
  return (
    <XStack gap={'$4'} justifyContent="center" alignItems="center" {...props}>
      <Divider width={width} />
      <Text size="normal" font="heading" color="$color">
        {label}
      </Text>
      <Divider width={width} />
    </XStack>
  );
};
