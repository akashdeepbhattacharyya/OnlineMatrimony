import { CheckBox } from './CheckBox';
import { View, ViewProps, XStack } from 'tamagui';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from './Text';
import { CheckBoxOption } from '@/resources/form';

type Props<T> = {
  testID?: string;
  option: CheckBoxOption<T>;
  selected: boolean;
  enabled?: boolean;
  size?: number;
  onChange: (option: CheckBoxOption<T>) => void;
} & ViewProps;

export const CheckBoxButton = <T = string,>({
  testID = 'checkbox-button',
  option,
  selected,
  enabled = true,
  size = 24,
  onChange,
  ...props
}: Props<T>) => {
  const onCheckBoxPress = () => {
    onChange(option);
  };

  return (
    <View width={'100%'} theme="checkbox" {...props}>
      <TouchableOpacity accessibilityRole="button" onPress={onCheckBoxPress}>
        <XStack testID={testID} alignItems="center" height="auto" gap="$2">
          <CheckBox size={size} selected={selected} enabled={enabled} />
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
          {option.icon}
        </XStack>
      </TouchableOpacity>
    </View>
  );
};
