import LogoAndTitleBlob from "@/assets/images/logo.svg";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2B2B2B",
      }}
    >
      <LogoAndTitleBlob />
    </View>
  );
}
