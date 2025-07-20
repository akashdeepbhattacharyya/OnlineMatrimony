import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, View, XStack } from 'tamagui';

type Props = {
  icon?: React.ReactNode; // Icon component (from @tamagui/lucide-icons or custom)
  size?: number; // Diameter of the button (default 50)
  onPress?: () => void; // Action handler
};

export const CircularButton = ({
  icon,
  size = 50,
  onPress,
  ...props
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        height={size}
        width={size}
        borderRadius={size / 2}
        padding="$2"
        {...props}
      >
        {icon}
      </View>
    </TouchableOpacity>
    // <Button
    //   unstyled
    //   onPress={onPress}
    //   backgroundColor={color}
    //   width={size}
    //   height={size}
    //   borderRadius={size / 2}
    //   alignItems="center"
    //   justifyContent="center"
    //   pressStyle={{ opacity: 0.8 }}
    // >
    //   {icon}
    // </Button>
  );
};
