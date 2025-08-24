import Svg, { Path, SvgProps } from "react-native-svg";
import { View } from "tamagui";
import { TabLabel } from "../../navigation/TabLabel";

type Props = {
  focused: boolean;
} & SvgProps;

export const SearchIcon = ({ focused, ...props }: Props) => {
  return (
    <View top="$4" alignItems="center">
      <Svg width={26} height={26} fill="none" viewBox="0 0 24 22" {...props}>
        <Path
          d="M10.9554 17.6112C15.1283 17.6112 18.511 14.2284 18.511 10.0556C18.511 5.88279 15.1283 2.50006 10.9554 2.50006C6.78263 2.50006 3.3999 5.88279 3.3999 10.0556C3.3999 14.2284 6.78263 17.6112 10.9554 17.6112Z"
          stroke={focused ? "#F15B6A" : "#A9A9A9"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20.3998 19.4999L16.2915 15.3916"
          stroke={focused ? "#F15B6A" : "#A9A9A9"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <TabLabel focused={focused}>{`Search`}</TabLabel>
    </View>
  );
};
