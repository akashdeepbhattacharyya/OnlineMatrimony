import { FC } from "react";
import { Text, getToken } from "tamagui";
import type { TextProps } from "tamagui";

interface Props extends TextProps {
  focused?: boolean;
  children: React.ReactNode;
}
export const TabLabel: FC<Props> = ({ children, focused, ...props }) => {
  return (
    <Text
      allowFontScaling={false}
      position="relative"
      marginBottom="$4"
      fontFamily={
        focused ? getToken("$font.bodySemiBold") : getToken("$font.body")
      }
      color={focused ? getToken("$color.button_bg_red") : getToken("$color.gray")}
      {...props}
    >
      {children}
    </Text>
  );
};
