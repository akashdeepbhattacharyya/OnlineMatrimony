import { Platform, TouchableOpacity } from "react-native";
import { getToken, View } from "tamagui";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabLabel } from "./TabLabel";
import { useState } from "react";
import { ROUTES } from "@/resources/routes";
import LinearGradient from "react-native-linear-gradient";

export function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [selectedTabName, setSelectedTabName] = useState<string>(ROUTES.home);
  // const onChangeMenuItem = (trackingType: TrackingType) => {
  //   onPress(trackingType);
  //   setSelectedTabName(ROUTES.home);
  // };

  // const onClickToCloseHoverMenu = () => {
  //   setSelectedTabName(ROUTES.home);
  // };

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

        {/* <View
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          bottom: 0,
          height: 82,
          backgroundColor: getToken('$color.primary'),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      /> */}

        {/* <Animated.View
        style={{
          height: 110,
          width: "100%",
          position: "absolute",
          zIndex: 1,
          bottom: 0,
        }}
      > */}

        <View
          style={{
            flexDirection: "row",
            backgroundColor: getToken("$color.primary"),
            height: "100%",
            width: "100%",
            // top: 100,
            paddingTop: 14,
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
              setSelectedTabName(route.name);
            };

            // const onLongPress = () => {
            //   navigation.emit({
            //     type: "tabLongPress",
            //     target: route.key,
            //   });
            // };

            if (!options.tabBarIcon) return;

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                // activeOpacity={route.name === ROUTES.track_menu ? 0.9 : 0.6}
                // onLongPress={onLongPress}
                style={{
                  flex: 1,
                  gap: 4,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  // marginLeft: index === 1 || index === 2 ? -30 : 0,
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
