import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button as TamaButton, View, ViewProps, XStack } from 'tamagui';
import ArrowRight from '../../../assets/images/arrow-right.svg';
import { Text } from './Text';

type Props = {
  title: string;
  onPress: () => void;
} & ViewProps;

export const PrimaryButton = ({ title, disabled, onPress, ...props }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View
      theme="primary_button"
      width="100%"
      backgroundColor="$background"
      paddingHorizontal="$16"
      paddingVertical="$4.5"
      borderRadius="$10"
      opacity={disabled ? 0.6 : 1}
      {...props}
    >
      
        <XStack justifyContent="center" alignItems="center" gap="$2.5">
          <Text font="headingSemiBold" size="normal" weight="bold">
            {title}
          </Text>
          <ArrowRight width={19} height={15} />
        </XStack>
      
    </View>
    </TouchableOpacity>
  );
};
