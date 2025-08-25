import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Provider } from '@/components/Provider'
import * as SplashScreen from "expo-splash-screen";
import RootStack from './root-stack'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [robotoLoaded, robotoError] = useFonts({
    // Oswald fonts
    'Oswald-Bold': require('../assets/fonts/Oswald-Bold.ttf'),
    'Oswald-ExtraLight': require('../assets/fonts/Oswald-ExtraLight.ttf'),
    'Oswald-Light': require('../assets/fonts/Oswald-Light.ttf'),
    'Oswald-Medium': require('../assets/fonts/Oswald-Medium.ttf'),
    'Oswald-Regular': require('../assets/fonts/Oswald-Regular.ttf'),
    'Oswald-SemiBold': require('../assets/fonts/Oswald-SemiBold.ttf'),

    // Roboto fonts
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-ExtraBold': require('../assets/fonts/Roboto-ExtraBold.ttf'),
    'Roboto-ExtraLight': require('../assets/fonts/Roboto-ExtraLight.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-SemiBold': require('../assets/fonts/Roboto-SemiBold.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),

    // Roboto Condensed fonts
    'Roboto-Condensed-Bold': require('../assets/fonts/Roboto_Condensed-Bold.ttf'),
    'Roboto-Condensed-Regular': require('../assets/fonts/Roboto_Condensed-Regular.ttf'),
    'Roboto-Condensed-Light': require('../assets/fonts/Roboto_Condensed-Light.ttf'),
    'Roboto-Condensed-Medium': require('../assets/fonts/Roboto_Condensed-Medium.ttf'),
    'Roboto-Condensed-SemiBold': require('../assets/fonts/Roboto_Condensed-SemiBold.ttf'),
  });

  useEffect(() => {
    if (robotoLoaded || robotoError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [robotoLoaded, robotoError]);


  if (!robotoLoaded && !robotoError) {
    return null;
  }

  return (
    <Providers>
      <RootStack />
    </Providers>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};