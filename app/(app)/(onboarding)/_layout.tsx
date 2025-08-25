import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name={ROUTES.onboarding.page} options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
