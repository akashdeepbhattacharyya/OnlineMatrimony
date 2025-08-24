import { View, ViewProps, XStack } from 'tamagui';

type Props = {
  size?: number;
  numberOfDots?: number;
  dotProps?: ViewProps;
} & ViewProps;

export const DottedDivider = ({
  size = 2,
  numberOfDots = 70,
  dotProps,
  ...props
}: Props) => {
  return (
    <XStack
      theme={'divider'}
      justifyContent="space-between"
      width="100%"
      height={size}
      {...props}
    >
      {Array.from({ length: numberOfDots }).map((_, i) => (
        <View
          key={i}
          width={size}
          height={size}
          borderRadius={size / 2}
          backgroundColor={'$background'}
          {...dotProps}
        />
      ))}
    </XStack>
  );
};
