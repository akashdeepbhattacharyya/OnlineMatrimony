import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeTypes } from '@/resources/types';
import { type ViewProps, getToken } from 'tamagui';
import { Children } from './Children';

interface Props extends ViewProps {
  children: ReactNode;
  theme?: ThemeTypes;
}

export function SafeAreaScreen({ children, theme = 'dark', ...props }: Props) {
  const backgroundColor = {
    light: getToken('$color.white') as string,
    dark: getToken('$color.primary') as string,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColor[theme],
      }}
    >
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Children theme={theme} {...props}>
            {children}
          </Children>
        </KeyboardAvoidingView>
      ) : (
        <Children theme={theme} {...props}>
          {children}
        </Children>
      )}
    </SafeAreaView>
  );
}
