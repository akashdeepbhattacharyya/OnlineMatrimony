import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.matches.match_details}
        options={{ title: "Match Details", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.matches.sent_match_details}
        options={{ title: "Sent Match Details", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.matches.received_match_details}
        options={{ title: "Received Match Details", headerShown: false }}
      />
    </Stack>
  );
}
