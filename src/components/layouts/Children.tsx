import { ThemeTypes } from '@/src/resources/types';
import { ReactNode } from 'react';
import { StatusBar } from 'react-native';
import { getToken, View, type ViewProps } from 'tamagui';

interface Props extends ViewProps {
  children: ReactNode;
  theme?: ThemeTypes;
}

export const Children = ({ children, theme = 'dark', ...props }: Props) => {
  const color: { [key: string]: 'dark-content' | 'light-content' } = {
    light: 'dark-content',
    neutral: 'dark-content',
    dark: 'light-content',
  };

  const backgroundColor = {
    light: getToken('$color.white') as string,
    neutral: getToken('$color.gray') as string,
    dark: getToken('$color.primary') as string,
  };

  return (
    <View theme={theme} flex={1} backgroundColor="$background" {...props}>
      <StatusBar
        barStyle={color[theme]}
        backgroundColor={backgroundColor[theme]}
      />
      {children}
    </View>
  );
};
