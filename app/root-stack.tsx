import AuthGate from "@/components/navigation/AuthGate";
import { ROUTES } from "@/resources/routes";
import { Stack } from "expo-router";

const App = () => {
  return (
    <AuthGate>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleStyle: {
            color: "black",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.onboarding} options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.auth} options={{ headerShown: false }} />
        <Stack.Screen name={ROUTES.app} options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthGate>
  );
};

export default function RootStack() {
  return <App />;
}
