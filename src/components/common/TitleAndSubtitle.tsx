import { View, ViewProps } from 'tamagui';
import { Text } from './Text';

type Props = {
  title?: string;
  subtitle?: string;
} & ViewProps;

export const TitleAndSubtitle = ({
  title = 'LOGO',
  subtitle = 'BRINGING HEARTS TOGETHER',
  ...props
}: Props) => {
  return (
    <View alignItems="center" justifyContent="center" {...props}>
      <Text font='bodyBold' size='largest'>
        {title}
      </Text>
      <Text font='heading' size='normal'>{subtitle}</Text>
    </View>
  );
};
