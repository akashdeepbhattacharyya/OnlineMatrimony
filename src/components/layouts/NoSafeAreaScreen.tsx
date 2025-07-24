import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { type ViewProps, getToken } from 'tamagui';
import { Children } from './Children';
import { ThemeTypes } from '@/src/resources/types';

interface Props extends ViewProps {
  children: ReactNode;
  theme?: ThemeTypes;
}

export function NoSafeAreaScreen({
  children,
  theme = 'light',
  ...props
}: Props) {
  const backgroundColor = {
    light: getToken('$color.white') as string,
    neutral: getToken('$color.gray') as string,
    dark: getToken('$color.primary') as string,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: backgroundColor[theme] }}
    >
      <Children theme={theme} {...props}>
        {children}
      </Children>
    </KeyboardAvoidingView>
  );
}
