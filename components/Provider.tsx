import { useColorScheme } from 'react-native'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { CurrentToast } from './CurrentToast'
import 'react-native-gesture-handler';
import React, { } from 'react';
import { AuthContextProvider } from '@/context/AuthContext';
import { LoaderProvider } from '@/context/LoaderContext';
import tamaguiConfig from '@/tamagui/tamagui.config';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/services/store/store';


export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      <ToastProvider
        swipeDirection="horizontal"
        duration={6000}
      >
        <ReduxProvider store={store}>
          <AuthContextProvider>
            <LoaderProvider>
              {/* <NavigationContainer
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
                </NavigationContainer> */}
              {children}
              <CurrentToast />
              <ToastViewport top="$8" left={0} right={0} />

            </LoaderProvider>
          </AuthContextProvider>
        </ReduxProvider>
      </ToastProvider>
    </TamaguiProvider>
  )
}
