import { ViewProps, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { TouchableOpacity } from 'react-native';
import * as Application from 'expo-application';

export const TermsAndConditions = ({ ...props }: ViewProps) => {
  return (
    <YStack theme={'settings_terms_and_conditions'} {...props}>
      <TouchableOpacity
        onPress={() => console.log('Terms & Conditions Pressed')}
      >
        <Text
          font="heading"
          size="normal"
          marginBottom="$3"
          color="$color"
          textDecorationLine="underline"
        >
          {`Terms & Conditions`}
        </Text>
      </TouchableOpacity>
      <Text font="heading" size="normal" color="$color" marginBottom="$1.5">
        {`Copyright © ${new Date().getFullYear()} Dhol Matrimony`}
      </Text>
      <Text font="heading" size="normal" color="$color">
        {`Version ${Application.nativeApplicationVersion}`}
      </Text>
    </YStack>
  );
};
