import { ChatIcon } from "@/components/icons/tabs/ChatIcon";
import { HomeIcon } from "@/components/icons/tabs/HomeIcon";
import { MatchesIcon } from "@/components/icons/tabs/MatchesIcon";
import { SearchIcon } from "@/components/icons/tabs/SearchIcon";
import { SettingsIcon } from "@/components/icons/tabs/SettingsIcon";
import { TabBar } from "@/components/navigation/TabBar";
import { ROUTES } from "@/resources/routes";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <>
      <Tabs
        tabBar={(props) => (
          <TabBar
            {...props}
          />
        )}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name={ROUTES.home}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name={ROUTES.matches.page}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <MatchesIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name={ROUTES.chat.page}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <ChatIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name={ROUTES.search}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <SearchIcon focused={focused} />,
          }}
        />
        <Tabs.Screen
          name={ROUTES.settings.page}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => <SettingsIcon focused={focused} />,
          }}
        />
      </Tabs>
    </>
  );
}
