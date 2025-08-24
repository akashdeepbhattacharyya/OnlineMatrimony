import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.matches.match_details}
        options={{ title: "Match Details", headerShown: false }}
      />
    </Stack>
  );
}
