import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import RootNavigator from './src/navigation/RootNavigator';
import { AuthContextProvider } from './src/context/AuthContext';
import { LoaderProvider } from './src/context/LoaderContext';
import { LoaderOverlay } from './src/components/ui/LoaderOverlay';
import { navigationRef } from './src/navigation/navigationRef';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui/tamagui.config';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App = () => {
  const colorScheme = useColorScheme();
  const [currentRoute, setCurrentRoute] = useState('');

  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    // Oswald fonts
    'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
    'Oswald-ExtraLight': require('./assets/fonts/Oswald-ExtraLight.ttf'),
    'Oswald-Light': require('./assets/fonts/Oswald-Light.ttf'),
    'Oswald-Medium': require('./assets/fonts/Oswald-Medium.ttf'),
    'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
    'Oswald-SemiBold': require('./assets/fonts/Oswald-SemiBold.ttf'),

    // Roboto fonts
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-ExtraBold': require('./assets/fonts/Roboto-ExtraBold.ttf'),
    'Roboto-ExtraLight': require('./assets/fonts/Roboto-ExtraLight.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-SemiBold': require('./assets/fonts/Roboto-SemiBold.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),

    // Roboto Condensed fonts
    'Roboto-Condensed-Bold': require('./assets/fonts/Roboto_Condensed-Bold.ttf'),
    'Roboto-Condensed-Regular': require('./assets/fonts/Roboto_Condensed-Regular.ttf'),
    'Roboto-Condensed-Light': require('./assets/fonts/Roboto_Condensed-Light.ttf'),
    'Roboto-Condensed-Medium': require('./assets/fonts/Roboto_Condensed-Medium.ttf'),
    'Roboto-Condensed-SemiBold': require('./assets/fonts/Roboto_Condensed-SemiBold.ttf'),
  });



  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>

        <AuthContextProvider>

          <TamaguiProvider config={tamaguiConfig}>

            <LoaderProvider>
              <NavigationContainer
                ref={navigationRef}
                onReady={() => {
                  const route = navigationRef.getCurrentRoute()?.name ?? '';
                  setCurrentRoute(route);
                }}
                onStateChange={() => {
                  const route = navigationRef.getCurrentRoute()?.name ?? '';
                  setCurrentRoute(route);
                }}
                theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
              >
                <RootNavigator currentRoute={currentRoute} />
                <LoaderOverlay />
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              </NavigationContainer>
            </LoaderProvider>
          </TamaguiProvider>

        </AuthContextProvider>
      </Provider>

    </SafeAreaProvider>
  );
};

export default App;