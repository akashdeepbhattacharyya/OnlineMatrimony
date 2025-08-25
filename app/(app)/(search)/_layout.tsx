import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.search.profile_details}
        options={{ title: "Chat Details", headerShown: false }}
      />
    </Stack>
  );
}