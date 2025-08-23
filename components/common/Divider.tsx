import { View, ViewProps } from "tamagui";

type Props = {
  width: number | string;
  height?: number | string;
  testID?: string;
} & ViewProps;

export const Divider = ({ width = "100%", height = 1, testID = 'divider', ...props }: Props) => {
  return (
    <View
      testID={testID}
      theme={"divider"}
      width={width}
      height={height}
      backgroundColor="$background"
      {...props}
    />
  );
};