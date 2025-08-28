import { TouchableOpacity } from 'react-native';
import {
  getToken,
  View,
  ViewProps,
  XStack,
} from 'tamagui';
import ArrowRight from '@/assets/images/arrow-right.svg';
import { Text } from './Text';

type Props = {
  title: string;
  theme?: string;
  onPress: () => void;
  showArrow?: boolean;
} & ViewProps;

export const PrimaryButton = ({
  title,
  theme = 'primary_button',
  disabled,
  onPress,
  showArrow = true,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
      }}
      disabled={disabled}
    >
      <View
        width="100%"
        theme={theme}
        backgroundColor="$background"
        paddingHorizontal="$6"
        paddingVertical="$4.5"
        borderRadius="$10"
        borderWidth={'$1'}
        borderColor={'$borderColor'}
        // opacity={disabled ? 0.6 : 1}
        disabled={disabled}
        {...props}
      >
        <XStack justifyContent="center" alignItems="center" gap="$2.5">
          <Text
            font="headingSemiBold"
            size="normal"
            weight="bold"
            color={'$color'}
          >
            {title}
          </Text>
          {showArrow && (
            <ArrowRight
              width={19}
              height={15}
              color={
                theme === 'primary_button'
                  ? getToken('$color.white')
                  : getToken('$color.button_bg_red')
              }
            />
          )}
        </XStack>
      </View>
    </TouchableOpacity>

  );
};
