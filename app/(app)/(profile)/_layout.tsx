import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.profile.page}
        options={{ title: "Profile Details", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.profile.update.root}
        options={{ title: "Update Profile", headerShown: false }}
      />
    </Stack>
  );
}