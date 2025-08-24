import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={ROUTES.login}
        options={{ title: "Log In", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.otp_validation}
        options={{ title: "Verify Mobile", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.profile_selection}
        options={{ title: "Profile Selection", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.signup}
        options={{ title: "Sign Up", headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.purchase_subscription}
        options={{ title: "Purchase Subscription", headerShown: false }}
      />
    </Stack>
  );
}
