import { Button, XStack, YStack } from 'tamagui';
import { Text } from '@/components/common/Text';
import { TouchableOpacity } from 'react-native';
import InfoIcon from '@/assets/images/info.svg';

type Props = {
  title: string;
  subTitle: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
};

export const HideDeleteProfileItem = ({
  title,
  subTitle,
  description,
  buttonTitle,
  onPress,
}: Props) => {
  return (
    <YStack theme={'hide_delete_profile_item'} gap={'$3'}>
      <Text font="headingLight" size="small" color="$title">
        {title}
      </Text>
      <XStack justifyContent="space-between" alignItems="center">
        <Text font="heading" size="normal" color="$subtitle">
          {subTitle}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text font="heading" size="normal" color="$buttonTitle">
            {buttonTitle}
          </Text>
        </TouchableOpacity>
      </XStack>
      <XStack gap={'$3'} alignItems="flex-start">
        <InfoIcon />
        <Text
          font="headingLight"
          size="small"
          color="$description"
          width={'93%'}
        >
          {description}
        </Text>
      </XStack>
    </YStack>
  );
};
