import { TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/common/Text';
import { XStack, YStack } from 'tamagui';
import ChevronRightIcon from '@/assets/images/chevron-right.svg';
import { DottedDivider } from '../common/DottedDivider';

type Props = {
  title: string;
  value?: string;
  onPress?: () => void;
};

export const SettingsItem = ({ title, value, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <YStack>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingVertical={'$4'}
        >
          <Text
            font="heading"
            size="normal"
            theme={'settings_item_title'}
            color={'$color'}
          >
            {title}
          </Text>
          <XStack alignItems="center" gap={'$3'}>
            {value && (
              <Text
                font="heading"
                size="normal"
                theme={'settings_item_value'}
                color={'$color'}
              >
                {value}
              </Text>
            )}
            <ChevronRightIcon />
          </XStack>
        </XStack>
        <DottedDivider />
      </YStack>
    </TouchableOpacity>
  );
};
