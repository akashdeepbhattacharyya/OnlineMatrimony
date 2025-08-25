import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.chat.root}
        options={{ title: "Chat", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.matches.root}
        options={{ title: "Matches", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.onboarding.root}
        options={{ title: "Onboarding", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.profile.root}
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.search.root}
        options={{ title: "Search", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.settings.root}
        options={{ title: "Settings", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.tabs}
        options={{ title: "Tabs", headerShown: false }}
      />
    </Stack>
  );
}
