import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.settings.subscription.page}
        options={{ title: "Subscription", headerShown: false }}
      />
    </Stack>
  );
}