import { InputProps, View, ViewProps, XStack, YStack } from 'tamagui';
import { Input } from './Input';
import { TextField } from './TextField';
import { Text } from './Text';

type Props = {
  label: string;
  title: string;
  onPress: () => void;
  icon: React.ReactNode;
} & ViewProps;

export const LabelledButton = ({ label, icon, title, ...props }: Props) => {
  return (
    <View theme="input" width={'100%'} {...props}>
      <YStack gap={'$2.5'}>
        <Text size="normal" font="heading" color={'$background'}>
          {label}
        </Text>
        <XStack
          backgroundColor={'$background'}
          paddingHorizontal={'$6'}
          paddingVertical={'$4'}
          borderRadius={'$10'}
          alignItems="center"
          justifyContent="flex-start"
          gap="$3"
        >
          {icon}
          <Text size="normal" font="heading" color={'$placeholder'}>
            {title}
          </Text>
        </XStack>
      </YStack>
    </View>
  );
};
