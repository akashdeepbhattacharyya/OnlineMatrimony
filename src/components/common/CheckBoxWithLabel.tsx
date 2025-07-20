import { CheckBox } from './CheckBox';
import { ViewProps, XStack } from 'tamagui';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from './Text';

type Props = {
  testID?: string;
  label: string;
  isSelected: boolean;
  size?: number;
  onChange: (isSelected: boolean) => void;
} & ViewProps;

export const CheckBoxWithLabel = ({
  testID,
  label,
  isSelected,
  size = 32,
  onChange,
  ...props
}: Props) => {
  const [isChecked, setIsChecked] = useState(isSelected);

  const onLabelPress = () => {
    setIsChecked(isChecked => {
      onChange(!isChecked);
      return !isChecked;
    });
  };

  return (
    <TouchableOpacity accessibilityRole="button" onPress={onLabelPress}>
      <XStack
        testID={testID}
        alignItems="center"
        height="auto"
        borderRadius="$20"
        padding={5}
        gap="$2"
        backgroundColor="$backgroundFade"
        marginBottom={10}
        paddingVertical="$2.5"
        paddingHorizontal="$4"
        {...props}
      >
        <CheckBox
          borderRadius={10}
          backgroundColor="$backgroundColor"
          size={size}
          isSelected={isChecked}
          onSelect={(status: boolean) => {
            setIsChecked(status);
            onChange(status);
          }}
        />
        <Text size="small" font="heading" flexShrink={1}>
          {label}
        </Text>
      </XStack>
    </TouchableOpacity>
  );
};
