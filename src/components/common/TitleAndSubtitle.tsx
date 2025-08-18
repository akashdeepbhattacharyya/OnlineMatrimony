import {
  Image,
  ImageProps,
  TextProps,
  VariantLabels,
  View,
  ViewProps,
  YStack,
} from 'tamagui';
import { Text } from './Text';

type Props = {
  title?: string;
  subtitle?: string;
  secondarySubtitle?: string;
  imageProps?: ImageProps;
  subtitleProps?: TextProps;
  secondarySubtitleProps?: TextProps;
  subtitleFontSize?: 'normal' | 'small' | 'largest';
} & ViewProps;

export const TitleAndSubtitle = ({
  title = 'LOGO',
  subtitle = 'BRINGING HEARTS TOGETHER',
  secondarySubtitle,
  imageProps,
  subtitleProps,
  secondarySubtitleProps,
  subtitleFontSize = 'normal',
  ...props
}: Props) => {
  return (
    <YStack alignItems="center" {...props}>
      <Image
        src={require('@/assets/images/logo.png')}
        width={100}
        height={100}
        {...imageProps}
      />
      <Text font="heading" size={subtitleFontSize} {...subtitleProps}>
        {subtitle}
      </Text>
      {secondarySubtitle && (
        <Text
          font="headingBold"
          size="small"
          marginTop={'$3'}
          {...secondarySubtitleProps}
        >
          {secondarySubtitle}
        </Text>
      )}
    </YStack>
  );
};
