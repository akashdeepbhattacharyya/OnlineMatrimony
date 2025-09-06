import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.chat.chat_details}
        options={{ title: "Chat Details", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.chat.mutual_match_profile_details}
        options={{ title: "Profile Details", headerShown: false }}
      />
    </Stack>
  );
}