import { Platform, TouchableOpacity } from "react-native";
import { getToken, View } from "tamagui";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabLabel } from "./TabLabel";
import LinearGradient from "react-native-linear-gradient";

export function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <>
      <View height={182} width={"100%"} position="absolute" zIndex={1} bottom={0} >
        <LinearGradient
          colors={['#2D152A00', '#000000']}
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            backgroundColor: getToken("$color.primary"),
            width: "100%",
            bottom: 0,
            paddingBottom: Platform.OS === "android" ? 0 : 7,
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 3,
            zIndex: 10,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.title !== undefined ? options.title : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              navigation.navigate(route.name, route.params);
            };

            if (!options.tabBarIcon) return;

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                style={{
                  flex: 1,
                  gap: 4,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <options.tabBarIcon
                  focused={isFocused}
                  color="red"
                  size={20}
                />
                <TabLabel focused={isFocused}>{label}</TabLabel>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
}
