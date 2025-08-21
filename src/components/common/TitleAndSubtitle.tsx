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
import Logo from '@/assets/images/logo.svg';

type Props = {
  title?: string;
  subtitle?: string;
  secondarySubtitle?: string;
  imageProps?: ImageProps;
  subtitleProps?: TextProps;
  secondarySubtitleProps?: TextProps;
  subtitleFontSize?: 'normal' | 'small' | 'medium';
  logoSize?: { width: number; height: number };
} & ViewProps;

export const TitleAndSubtitle = ({
  title = 'LOGO',
  subtitle = 'BRINGING HEARTS TOGETHER',
  secondarySubtitle,
  imageProps,
  subtitleProps,
  secondarySubtitleProps,
  subtitleFontSize = 'medium',
  logoSize = { width: 187, height: 64 },
  ...props
}: Props) => {
  return (
    <YStack alignItems="center" {...props}>
      <Logo width={logoSize.width} height={logoSize.height} />
      <Text marginTop={"$5"} font="heading" size={subtitleFontSize} {...subtitleProps}>
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
