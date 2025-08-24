import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.settings.hide_profile.page}
        options={{ title: "Hide / Delete Profile", headerShown: false }}
      />
    </Stack>
  );
}