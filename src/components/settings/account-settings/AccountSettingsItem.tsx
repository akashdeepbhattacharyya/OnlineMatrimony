import { TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/common/Text';
import { XStack, YStack } from 'tamagui';
import ChevronRightIcon from '@/assets/images/chevron-right.svg';
import { DottedDivider } from '@/src/components/common/DottedDivider';

type Props = {
  title: string;
  showChevron?: boolean;
  onPress: () => void;
};

export const AccountSettingsItem = ({
  title,
  showChevron = true,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <YStack>
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingVertical={'$3'}
        >
          <Text
            font="heading"
            size="normal"
            theme={'settings_item_title'}
            color={'$color'}
          >
            {title}
          </Text>
          {showChevron && <ChevronRightIcon />}
        </XStack>
        <DottedDivider />
      </YStack>
    </TouchableOpacity>
  );
};
