import { CheckBox } from './CheckBox';
import { View, ViewProps, XStack } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { Text } from './Text';
import { OptionWithIcon } from '@/resources/form';

type Props<T> = {
  testID?: string;
  option: OptionWithIcon<T>;
  selected: boolean;
  enabled?: boolean;
  size?: number;
  onChange: (option: OptionWithIcon<T>) => void;
  onLabelPress?: () => void;
} & ViewProps;

export const CheckBoxButton = <T = string,>({
  testID = 'checkbox-button',
  option,
  selected,
  enabled = true,
  size = 24,
  onChange,
  onLabelPress,
  ...props
}: Props<T>) => {
  const onCheckBoxPress = () => {
    onChange(option);
  };

  return (
    <View width={'100%'} theme="checkbox" {...props}>
      <XStack testID={testID} alignItems="center" height="auto" gap="$2">
        <TouchableOpacity accessibilityRole="button" onPress={onCheckBoxPress}>
          <CheckBox size={size} selected={selected} enabled={enabled} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={onLabelPress}
          disabled={!onLabelPress}
        >
          <Text
            size="small"
            font="heading"
            flexShrink={1}
            color={
              enabled ? '$background' : selected ? '$color' : '$unselected'
            }
          >
            {option.label}
          </Text>
        </TouchableOpacity>
        {option.icon}
      </XStack>
    </View>
  );
};
