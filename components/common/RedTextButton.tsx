import { TextProps } from 'tamagui';
import { Text } from '@/components/common/Text';
import { TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
} & TextProps;

export const RedTextButton = ({
  title,
  onPress,
  ...props
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        theme={'redTextButton'}
        font="heading"
        size="normal"
        color={'$color'}
        {...props}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
