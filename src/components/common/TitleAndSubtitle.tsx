import { TextProps, VariantLabels, View, ViewProps, YStack } from 'tamagui';
import { Text } from './Text';

type Props = {
  title?: string;
  subtitle?: string;
  secondarySubtitle?: string;
  titleProps?: TextProps;
  subtitleProps?: TextProps;
  secondarySubtitleProps?: TextProps;
  subtitleFontSize?: "normal" | "small" | "largest";
} & ViewProps;

export const TitleAndSubtitle = ({
  title = 'LOGO',
  subtitle = 'BRINGING HEARTS TOGETHER',
  secondarySubtitle,
  titleProps,
  subtitleProps,
  secondarySubtitleProps,
  subtitleFontSize = 'normal',
  ...props
}: Props) => {
  return (
    <YStack alignItems="center" {...props}>
      <Text font="bodyBold" size="largest" {...titleProps}>
        {title}
      </Text>
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
