import { Switch, XStack, YStack } from 'tamagui';
import { Text } from '@/src/components/common/Text';
import { DottedDivider } from '@/src/components/common/DottedDivider';

type Props = {
  title: string;
  onCheckedChange: (checked: boolean) => void;
  checked: boolean;
};

export const NotificationItem = ({
  title,
  onCheckedChange,
  checked,
}: Props) => {
  return (
    <YStack theme={'notification_item'}>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={'$3'}
      >
        <Text font="heading" size="normal" color={'$title'}>
          {title}
        </Text>
        <Switch
          size={'$1.5'}
          backgroundColor={checked ? '$backgroundOn' : '$backgroundOff'}
          checked={checked}
          borderColor={checked ? '$borderColorOn' : '$borderColorOff'}
          onCheckedChange={onCheckedChange}
        >
          <Switch.Thumb backgroundColor={checked ? '$thumbOn' : '$thumbOff'} />
        </Switch>
      </XStack>
      <DottedDivider />
    </YStack>
  );
};
