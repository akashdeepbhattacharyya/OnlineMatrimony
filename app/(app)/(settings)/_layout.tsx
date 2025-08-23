import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.settings.account_settings}
        options={{ title: "Account Settings", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.settings.notification_settings}
        options={{ title: "Notification Settings", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.settings.partner_preferences}
        options={{ title: "Partner Preferences", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.settings.subscription}
        options={{ title: "Subscription", headerShown: false }}
      />
    </Stack>
  );
}