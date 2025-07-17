import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootNavigator from './navigation/RootNavigator';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './theme/theme';
import { LoaderProvider } from './context/LoaderContext';
import { LoaderOverlay } from './components/ui/LoaderOverlay';
import { navigationRef } from './navigation/navigationRef';

const App = () => {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('Auth Token:', token);
      } catch (error) {
        console.error('App startup error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    prepareApp();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
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
            </NavigationContainer>
          </LoaderProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
