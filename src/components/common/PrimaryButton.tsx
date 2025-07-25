import { TouchableOpacity } from 'react-native';
import { Button as TamaButton, View, ViewProps, XStack } from 'tamagui';
import ArrowRight from '../../../assets/images/arrow-right.svg';
import { Text } from './Text';

type Props = {
  title: string;
  onPress: () => void;
  showArrow?: boolean;
} & ViewProps;

export const PrimaryButton = ({
  title,
  disabled,
  onPress,
  showArrow = true,
  ...props
}: Props) => {
  return (
    <View
      width="100%"
      theme="primary_button"
      backgroundColor="$background"
      paddingHorizontal="$6"
      paddingVertical="$4.5"
      borderRadius="$10"
      borderWidth={"$1"}
      borderColor={'$borderColor'}
      opacity={disabled ? 0.6 : 1}
      disabled={disabled}
      {...props}
    >
      <TouchableOpacity onPress={onPress}>
        <XStack justifyContent="center" alignItems="center" gap="$2.5">
          <Text
            font="headingSemiBold"
            size="normal"
            weight="bold"
            color={'$color'}
          >
            {title}
          </Text>
          {showArrow && <ArrowRight width={19} height={15} />}
        </XStack>
      </TouchableOpacity>
    </View>
  );
};
