import { useColorScheme } from 'react-native'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { CurrentToast } from './CurrentToast'
import { AuthContextProvider } from '@/context/AuthContext';
import { LoaderProvider } from '@/context/LoaderContext';
import tamaguiConfig from '@/tamagui/tamagui.config';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/services/store/store';
import { LoaderOverlay } from './LoaderOverlay';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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
            <GestureHandlerRootView>
              <LoaderProvider>
                <LoaderOverlay />
                {children}
                <CurrentToast />
                <ToastViewport top="$8" left={0} right={0} />
              </LoaderProvider>
            </GestureHandlerRootView>
          </AuthContextProvider>
        </ReduxProvider>
      </ToastProvider>
    </TamaguiProvider>
  )
}
