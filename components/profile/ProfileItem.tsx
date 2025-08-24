import { Text } from '@/components/common/Text';
import { YStack } from 'tamagui';

type Props = {
  title: string;
  subtitle?: string | number;
};

export const ProfileItem = ({ title, subtitle }: Props) => {
  return (
    <YStack theme={'$profile_item'} gap={'$2'}>
      <Text font="headingLight" size="extra_small" color={'$title'}>
        {title}
      </Text>
      {subtitle && (
        <Text font="heading" size="small">
          {subtitle}
        </Text>
      )}
    </YStack>
  );
};
