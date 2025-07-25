import { createTamagui } from 'tamagui';
import { config as defaultConfig } from '@tamagui/config/v3';
import { tokens } from './tokens';
import themes from './themes';
import { fontConfig } from './font';
import animations from './animations';

const config = createTamagui({
  ...defaultConfig,
  fonts: fontConfig,

  tokens,
  themes,

  media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    short: { maxHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
  animations,
  shorthands: defaultConfig.shorthands,
  defaultProps: {
    Text: {
      color: 'white',
    },
  },
});

type AppConfig = typeof config;
declare module 'tamagui' {
  type TamaguiCustomConfig = AppConfig;
  // if you want types for group styling props, define them like so:
  interface TypeOverride {
    groupNames(): 'a' | 'b' | 'c';
  }
}

export default config;
