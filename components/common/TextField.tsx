import { type InputProps, XStack } from 'tamagui';
import { Input } from './Input';

type Props = {
  icon: React.ReactNode;
} & InputProps;

export const TextField = ({ icon, ...props }: Props) => {
  return (
    <XStack
      theme="input"
      backgroundColor="$background"
      width="100%"
      paddingVertical="$1.5"
      paddingHorizontal="$6"
      borderRadius="$10"
      alignItems="center"
      justifyContent="flex-start"
    >
      {icon}
      <Input
        unstyled
        placeholderTextColor="$placeholder"
        color={'$color'}
        {...props}
      />
    </XStack>
  );
};
