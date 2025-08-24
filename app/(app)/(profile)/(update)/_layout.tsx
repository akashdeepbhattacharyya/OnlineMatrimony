import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.profile.update.page}
        options={{ title: "Update Profile Details", headerShown: false }}
      />
    </Stack>
  );
}
